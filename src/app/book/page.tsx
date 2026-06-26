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
  { icon: ShieldCheck, text: 'NABH-accredited clinics' },
  { icon: Clock, text: 'Confirmation within 2 hours' },
  { icon: Phone, text: 'Free first consultation' },
  { icon: CalendarCheck, text: 'Flexible scheduling' },
];

export default function BookPage() {
  const { contact_and_appointment_info } = fmsData;

  return (
    <div className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container-fms">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ─── Left sidebar ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="section-label">Online Booking</p>
              <h1 className="text-3xl font-semibold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}>
                Book Your Appointment
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                Fill in your details and we&apos;ll call you within 2 hours to confirm your appointment. No payment required to book.
              </p>
            </div>

            {/* Perks */}
            <div className="space-y-3">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-primary-muted)' }}>
                    <Icon size={15} weight="fill" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--color-ink-secondary)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Contact alternative */}
            <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'white' }}>
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                Prefer to call?
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--color-ink-muted)' }}>
                Our team is available {contact_and_appointment_info.booking_hours}
              </p>
              <a
                href={`tel:${contact_and_appointment_info.primary_phone}`}
                className="btn-secondary text-sm w-full justify-center"
              >
                <Phone size={14} weight="fill" />
                {contact_and_appointment_info.primary_phone}
              </a>
            </div>
          </div>

          {/* ─── Form ───────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              <Suspense fallback={<div className="py-8 text-center text-sm" style={{ color: 'var(--color-ink-muted)' }}>Loading form...</div>}>
                <AppointmentForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
