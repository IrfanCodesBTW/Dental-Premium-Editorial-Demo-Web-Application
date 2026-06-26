'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, CheckCircle, WarningCircle, SpinnerGap, User, Phone, Envelope, Buildings, Stethoscope, Calendar, Clock, ChatText } from '@phosphor-icons/react';
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

  // Update branch from URL params
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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.full_name.trim() || formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Please enter your full name';
    }
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.preferred_branch) {
      newErrors.preferred_branch = 'Please select a clinic';
    }
    if (!formData.treatment_interest) {
      newErrors.treatment_interest = 'Please select a treatment';
    }
    if (!formData.preferred_date) {
      newErrors.preferred_date = 'Please select your preferred date';
    }
    if (!formData.time_slot) {
      newErrors.time_slot = 'Please select a time slot';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (!validate()) return;

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
      setResult({ success: false, error: 'Network error. Please try again or call us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  const { clinics_and_locations, services_and_treatments, contact_and_appointment_info } = fmsData;

  // ─── Success State ──────────────────────────────────────────
  if (result?.success && result.appointment) {
    const clinic = clinics_and_locations.find((c) => c.id === result.appointment!.clinic_id);
    const service = services_and_treatments.find((s) => s.id === result.appointment!.service_id);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center py-8"
      >
        <div className="flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-success-light)' }}>
            <CheckCircle size={36} weight="fill" style={{ color: 'var(--color-success)' }} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
          Appointment Requested!
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--color-ink-muted)', maxWidth: '40ch', margin: '0 auto 2rem' }}>
          We&apos;ll confirm your appointment shortly. Our team will call you to confirm the booking.
        </p>

        {/* Summary card */}
        <div className="card text-left p-6 max-w-md mx-auto">
          <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            Booking Summary
          </h3>
          <dl className="space-y-3">
            {[
              { label: 'Patient', value: formData.full_name },
              { label: 'Clinic', value: clinic?.branch_name || '' },
              { label: 'Treatment', value: service?.name || '' },
              { label: 'Date', value: new Date(formData.preferred_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
              { label: 'Time', value: contact_and_appointment_info.time_slots.find((s) => s.value === formData.time_slot)?.label || formData.time_slot },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4">
                <dt className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{label}</dt>
                <dd className="text-xs font-medium text-right" style={{ color: 'var(--color-ink)', maxWidth: '60%' }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setResult(null); setFormData({ full_name: '', phone: '', email: '', preferred_branch: '', treatment_interest: '', preferred_date: '', time_slot: '', message: '' }); }}
            className="btn-secondary text-sm"
          >
            Book Another
          </button>
          <a href={`tel:${contact_and_appointment_info.primary_phone}`} className="btn-primary text-sm">
            Call to Confirm
          </a>
        </div>
      </motion.div>
    );
  }

  // ─── Form ───────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Appointment booking form">
      {/* Error banner */}
      <AnimatePresence>
        {result?.error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-3 p-4 rounded-lg mb-6"
            style={{ backgroundColor: 'var(--color-error-light)', color: 'var(--color-error)' }}
            role="alert"
          >
            <WarningCircle size={18} weight="fill" className="shrink-0 mt-0.5" />
            <p className="text-sm">{result.error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label htmlFor="full_name" className="form-label">
            <span className="flex items-center gap-1.5">
              <User size={13} style={{ color: 'var(--color-primary)' }} />
              Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
            </span>
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
          {errors.full_name && <p id="full_name-error" className="form-error" role="alert">{errors.full_name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="form-label">
            <span className="flex items-center gap-1.5">
              <Phone size={13} style={{ color: 'var(--color-primary)' }} />
              Phone Number <span style={{ color: 'var(--color-error)' }}>*</span>
            </span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98480 12345"
            className="form-input"
            aria-required="true"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            autoComplete="tel"
          />
          {errors.phone && <p id="phone-error" className="form-error" role="alert">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">
            <span className="flex items-center gap-1.5">
              <Envelope size={13} style={{ color: 'var(--color-primary)' }} />
              Email Address
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="form-input"
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && <p id="email-error" className="form-error" role="alert">{errors.email}</p>}
        </div>

        {/* Preferred Branch */}
        <div>
          <label htmlFor="preferred_branch" className="form-label">
            <span className="flex items-center gap-1.5">
              <Buildings size={13} style={{ color: 'var(--color-primary)' }} />
              Preferred Clinic <span style={{ color: 'var(--color-error)' }}>*</span>
            </span>
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
          {errors.preferred_branch && <p id="branch-error" className="form-error" role="alert">{errors.preferred_branch}</p>}
        </div>

        {/* Treatment Interest */}
        <div>
          <label htmlFor="treatment_interest" className="form-label">
            <span className="flex items-center gap-1.5">
              <Stethoscope size={13} style={{ color: 'var(--color-primary)' }} />
              Treatment Interest <span style={{ color: 'var(--color-error)' }}>*</span>
            </span>
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
          {errors.treatment_interest && <p id="service-error" className="form-error" role="alert">{errors.treatment_interest}</p>}
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="preferred_date" className="form-label">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} style={{ color: 'var(--color-primary)' }} />
              Preferred Date <span style={{ color: 'var(--color-error)' }}>*</span>
            </span>
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
          {errors.preferred_date && <p id="date-error" className="form-error" role="alert">{errors.preferred_date}</p>}
        </div>

        {/* Time Slot */}
        <div>
          <label htmlFor="time_slot" className="form-label">
            <span className="flex items-center gap-1.5">
              <Clock size={13} style={{ color: 'var(--color-primary)' }} />
              Time Slot <span style={{ color: 'var(--color-error)' }}>*</span>
            </span>
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
            <option value="">Select a time</option>
            {contact_and_appointment_info.time_slots.map((slot) => (
              <option key={slot.id} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
          {errors.time_slot && <p id="time-error" className="form-error" role="alert">{errors.time_slot}</p>}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="form-label">
            <span className="flex items-center gap-1.5">
              <ChatText size={13} style={{ color: 'var(--color-primary)' }} />
              Additional Notes
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any specific concerns, medical history, or questions for the doctor..."
            rows={3}
            className="form-input resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          id="submit-appointment-btn"
        >
          {submitting ? (
            <>
              <SpinnerGap size={18} className="animate-spin" />
              Checking availability...
            </>
          ) : (
            <>
              <CalendarCheck size={18} weight="fill" />
              Request Appointment
            </>
          )}
        </button>
        <p className="text-center text-xs mt-3" style={{ color: 'var(--color-ink-muted)' }}>
          We&apos;ll call you within 2 hours to confirm. No payment required.
        </p>
      </div>
    </form>
  );
}
