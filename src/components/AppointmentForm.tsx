'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarCheck, CheckCircle, WarningCircle, SpinnerGap, 
  User, Phone, Envelope, Buildings, Stethoscope, Calendar, Clock, ChatText, ArrowLeft, ArrowRight 
} from '@phosphor-icons/react';
import fmsData from '@/lib/fmsData';
import { BookingFormData, BookingResponse } from '@/types';
import { getMinBookingDate, getMaxBookingDate, isValidPhone, isValidEmail } from '@/lib/helpers';

interface FormErrors {
  full_name?: string;
  phone?: string;
  email?: string;
  preferred_branch?: string;
  treatment_interest?: string;
  preferred_date?: string;
  time_slot?: string;
}

interface AppointmentFormProps {
  prefillClinicId?: string;
  prefillServiceId?: string;
}

export default function AppointmentForm({ prefillClinicId, prefillServiceId }: AppointmentFormProps) {
  const searchParams = useSearchParams();

  // Multi-step state: 1 = Patient info, 2 = Branch/Treatment, 3 = Date/Time/Notes
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward

  const [formData, setFormData] = useState<BookingFormData>({
    full_name: '',
    phone: '',
    email: '',
    preferred_branch: prefillClinicId || searchParams.get('clinic') || '',
    treatment_interest: prefillServiceId || searchParams.get('service') || '',
    preferred_date: '',
    time_slot: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResponse | null>(null);

  // Prefill check from query parameters
  useEffect(() => {
    const clinic = searchParams.get('clinic');
    const service = searchParams.get('service');
    if (clinic || service) {
      setFormData((prev) => ({
        ...prev,
        preferred_branch: clinic || prev.preferred_branch,
        treatment_interest: service || prev.treatment_interest,
      }));
    }
  }, [searchParams]);

  // Step-specific validation
  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (currentStep === 1) {
      if (!formData.full_name.trim()) {
        newErrors.full_name = 'Full name is required';
      } else if (formData.full_name.trim().length < 2) {
        newErrors.full_name = 'Name must be at least 2 characters';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit number';
      }
      
      if (formData.email && !isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (currentStep === 2) {
      if (!formData.preferred_branch) {
        newErrors.preferred_branch = 'Preferred clinic is required';
      }
      if (!formData.treatment_interest) {
        newErrors.treatment_interest = 'Treatment selection is required';
      }
    }

    if (currentStep === 3) {
      if (!formData.preferred_date) {
        newErrors.preferred_date = 'Preferred date is required';
      }
      if (!formData.time_slot) {
        newErrors.time_slot = 'Time slot is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: BookingResponse = await response.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: 'Network error. Please verify connection and retry.' });
    } finally {
      setSubmitting(false);
    }
  };

  const { clinics_and_locations, services_and_treatments, contact_and_appointment_info } = fmsData;

  // ─── Success Confirmation Display ───────────────────────────
  if (result?.success && result.appointment) {
    const clinic = clinics_and_locations.find((c) => c.id === result.appointment!.clinic_id);
    const service = services_and_treatments.find((s) => s.id === result.appointment!.service_id);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="text-center py-6 space-y-6"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-600">
            <CheckCircle size={36} weight="fill" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
            Consultation Request Sent
          </h2>
          <p className="text-xs text-slate-500 max-w-[34ch] mx-auto leading-relaxed">
            Your intake details are logged. An administrative officer will phone you to confirm availability.
          </p>
        </div>

        {/* Detailed Summary Receipt */}
        <div className="card text-left p-6 max-w-sm mx-auto border border-[var(--color-border)] bg-[var(--color-bg-alt)]/20 space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Booking Overview
          </h3>
          <dl className="space-y-2.5">
            {[
              { label: 'Patient Name', value: formData.full_name },
              { label: 'Clinic Branch', value: clinic?.area || '' },
              { label: 'Specialty Review', value: service?.name || '' },
              { label: 'Date Requested', value: new Date(formData.preferred_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
              { label: 'Preferred Slot', value: contact_and_appointment_info.time_slots.find((s) => s.value === formData.time_slot)?.label || formData.time_slot },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4 text-xs">
                <dt className="text-slate-400 font-medium">{label}</dt>
                <dd className="font-semibold text-slate-700 text-right max-w-[60%] truncate">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => {
              setResult(null);
              setStep(1);
              setFormData({ full_name: '', phone: '', email: '', preferred_branch: '', treatment_interest: '', preferred_date: '', time_slot: '', message: '' });
            }}
            className="btn-secondary text-[10px] py-3.5 px-6 font-semibold uppercase tracking-wider"
          >
            Book Another
          </button>
          <a href={`tel:${contact_and_appointment_info.primary_phone}`} className="btn-primary text-[10px] py-3.5 px-6 font-semibold uppercase tracking-wider">
            Call to Confirm
          </a>
        </div>
      </motion.div>
    );
  }

  // Slide spring variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 30 : -30,
      opacity: 0,
    }),
  };

  const stepsLabel = [
    'Patient Coordinates',
    'Clinical Selection',
    'Diagnostic Schedule'
  ];

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Appointment booking wizard">
      {/* Onboarding Step Progress Tracker */}
      <div className="mb-8 space-y-3 select-none">
        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
          <span>Step {step} of 3</span>
          <span>{stepsLabel[step - 1]}</span>
        </div>
        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--color-primary)] rounded-full" 
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Error Announcement */}
      <AnimatePresence>
        {result?.error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-3 p-4 rounded-xl mb-6 bg-red-50 text-red-700 border border-red-100"
            role="alert"
          >
            <WarningCircle size={18} weight="fill" className="shrink-0 mt-0.5" />
            <p className="text-xs font-semibold uppercase tracking-wide">{result.error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* ─── STEP 1: PATIENT INFO ──────────────────────── */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="full_name" className="form-label flex items-center gap-1.5">
                    <User size={13} className="text-[var(--color-primary)]" />
                    <span>Full Name <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="e.g. Arjun Mehrotra"
                    className="form-input"
                    aria-required="true"
                    aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                    autoComplete="name"
                  />
                  {errors.full_name && <p id="full_name-error" className="form-error" role="alert"><WarningCircle size={12} /> {errors.full_name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="form-label flex items-center gap-1.5">
                      <Phone size={13} className="text-[var(--color-primary)]" />
                      <span>Phone Number <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9848012345"
                      className="form-input"
                      aria-required="true"
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      autoComplete="tel"
                    />
                    {errors.phone && <p id="phone-error" className="form-error" role="alert"><WarningCircle size={12} /> {errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="form-label flex items-center gap-1.5">
                      <Envelope size={13} className="text-[var(--color-primary)]" />
                      <span>Email Address</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. your@email.com"
                      className="form-input"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      autoComplete="email"
                    />
                    {errors.email && <p id="email-error" className="form-error" role="alert"><WarningCircle size={12} /> {errors.email}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 2: BRANCH & TREATMENT ────────────────── */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="preferred_branch" className="form-label flex items-center gap-1.5">
                    <Buildings size={13} className="text-[var(--color-primary)]" />
                    <span>Preferred Clinic Branch <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    id="preferred_branch"
                    name="preferred_branch"
                    value={formData.preferred_branch}
                    onChange={handleChange}
                    className="form-select"
                    aria-required="true"
                    aria-describedby={errors.preferred_branch ? 'branch-error' : undefined}
                  >
                    <option value="">Select a clinic</option>
                    {clinics_and_locations.map((clinic) => (
                      <option key={clinic.id} value={clinic.id}>
                        {clinic.area} {clinic.special_focus ? `— ${clinic.special_focus}` : ''}
                      </option>
                    ))}
                  </select>
                  {errors.preferred_branch && <p id="branch-error" className="form-error" role="alert"><WarningCircle size={12} /> {errors.preferred_branch}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="treatment_interest" className="form-label flex items-center gap-1.5">
                    <Stethoscope size={13} className="text-[var(--color-primary)]" />
                    <span>Specialty / Treatment Needed <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    id="treatment_interest"
                    name="treatment_interest"
                    value={formData.treatment_interest}
                    onChange={handleChange}
                    className="form-select"
                    aria-required="true"
                    aria-describedby={errors.treatment_interest ? 'service-error' : undefined}
                  >
                    <option value="">Select a treatment</option>
                    {services_and_treatments.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} ({service.category})
                      </option>
                    ))}
                  </select>
                  {errors.treatment_interest && <p id="service-error" className="form-error" role="alert"><WarningCircle size={12} /> {errors.treatment_interest}</p>}
                </div>
              </div>
            )}

            {/* ─── STEP 3: SCHEDULE & NOTES ─────────────────── */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="preferred_date" className="form-label flex items-center gap-1.5">
                      <Calendar size={13} className="text-[var(--color-primary)]" />
                      <span>Preferred Date <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      id="preferred_date"
                      name="preferred_date"
                      type="date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      min={getMinBookingDate()}
                      max={getMaxBookingDate()}
                      className="form-input"
                      aria-required="true"
                      aria-describedby={errors.preferred_date ? 'date-error' : undefined}
                    />
                    {errors.preferred_date && <p id="date-error" className="form-error" role="alert"><WarningCircle size={12} /> {errors.preferred_date}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="time_slot" className="form-label flex items-center gap-1.5">
                      <Clock size={13} className="text-[var(--color-primary)]" />
                      <span>Preferred Time Slot <span className="text-red-500">*</span></span>
                    </label>
                    <select
                      id="time_slot"
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={handleChange}
                      className="form-select"
                      aria-required="true"
                      aria-describedby={errors.time_slot ? 'time-error' : undefined}
                    >
                      <option value="">Select a slot</option>
                      {contact_and_appointment_info.time_slots.map((slot) => (
                        <option key={slot.id} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                    {errors.time_slot && <p id="time-error" className="form-error" role="alert"><WarningCircle size={12} /> {errors.time_slot}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="form-label flex items-center gap-1.5">
                    <ChatText size={13} className="text-[var(--color-primary)]" />
                    <span>Additional Medical Notes</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe specific symptoms, previous treatments, or request a doctor..."
                    rows={3}
                    className="form-input resize-none"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── CONTROLS WIDGET ───────────────────────────────────── */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-[var(--color-border)] select-none">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="btn-secondary flex-1 py-3.5 text-[10px] tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
        )}
        
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary flex-1 py-3.5 text-[10px] tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5"
          >
            <span>Continue</span>
            <ArrowRight size={13} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex-grow py-3.5 text-[10px] tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
            id="submit-appointment-btn"
          >
            {submitting ? (
              <>
                <SpinnerGap size={14} className="animate-spin" />
                <span>Checking Slot Availability...</span>
              </>
            ) : (
              <>
                <CalendarCheck size={14} weight="fill" />
                <span>Request Booking</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
