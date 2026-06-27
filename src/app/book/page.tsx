import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CalendarCheck, ShieldCheck, Clock, Phone } from '@phosphor-icons/react/dist/ssr';
import AppointmentForm from '@/components/AppointmentForm';
import fmsData from '@/lib/fmsData';

export const metadata: Metadata = {
  title: 'Book Appointment — FMS Dental Hyderabad',
  description: 'Book a dental appointment at FMS Dental — choose your preferred clinic, treatment, and time slot. NABH-accredited care across 6 Hyderabad locations.',
};

const perks = [
  { icon: ShieldCheck, text: 'NABH-Accredited Diagnostic Standards' },
  { icon: Clock, text: 'Confirmation Scheduled within 2 Hours' },
  { icon: Phone, text: 'Complimentary First Clinical Consultation' },
  { icon: CalendarCheck, text: 'Flexible Patient Re-scheduling Options' },
];

export default function BookPage() {
  const { contact_and_appointment_info } = fmsData;

  return (
    <div className="section bg-[var(--color-bg-alt)] min-h-[90dvh]">
      <div className="container-fms">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ─── Left Sidebar Content (Asymmetric Width: 5 cols) ─── */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="space-y-4">
              <p className="section-label">Online Intake</p>
              <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-ink)] animate-fade-in"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}>
                Book Your Consultation
              </h1>
              <p className="text-sm leading-relaxed text-slate-500 max-w-[42ch]">
                Fill in your details to reserve a diagnostic slot. Our administrative desk will reach out within 2 hours to confirm your details. No advance payment required.
              </p>
            </div>

            {/* Premium Perks List */}
            <div className="space-y-4 pt-6 border-t border-[var(--color-border)]">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-primary-muted)' }}>
                    <Icon size={14} weight="fill" className="text-[var(--color-primary)]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{text}</span>
                </div>
              ))}
            </div>

            {/* Call Direct Alternative */}
            <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Need Immediate Booking?
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Our frontdesk is available {contact_and_appointment_info.booking_hours}
                </p>
              </div>
              <a
                href={`tel:${contact_and_appointment_info.primary_phone}`}
                className="btn-secondary text-[10px] w-full justify-center tracking-widest font-semibold uppercase py-3.5"
              >
                <Phone size={14} weight="fill" />
                <span>Call {contact_and_appointment_info.primary_phone}</span>
              </a>
            </div>
          </div>

          {/* ─── Right Form Wizard Column (Asymmetric Width: 7 cols) ─── */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-10 border border-[var(--color-border)] bg-white">
              <Suspense fallback={<div className="py-12 text-center text-xs font-mono text-slate-400 uppercase tracking-widest">Initialising form...</div>}>
                <AppointmentForm />
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
