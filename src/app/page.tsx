import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CalendarCheck } from '@phosphor-icons/react/dist/ssr';
import fmsData from '@/lib/fmsData';
import { StatsRow } from '@/components/ui/TrustBadges';
import ServiceCard from '@/components/cards/ServiceCard';
import ClinicCard from '@/components/cards/ClinicCard';
import HeroSection from '@/components/sections/HeroSection';
import TreatmentTagsSection from '@/components/sections/TreatmentTagsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export const metadata: Metadata = {
  title: 'FMS Dental — World-Class Dental Implants & Smile Makeovers in Hyderabad',
  description:
    'FMS Dental: Hyderabad\'s top NABH-accredited dental group with 6 clinics. Expert dental implants, smile makeovers, Invisalign & full mouth rehabilitation. Book online.',
};

const featuredServices = fmsData.services_and_treatments.slice(0, 6);
const featuredClinics = fmsData.clinics_and_locations.slice(0, 3);

export default function HomePage() {
  const { contact_and_appointment_info } = fmsData;

  return (
    <div className="overflow-x-hidden">
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── Stats Strip ─────────────────────────────────────────── */}
      <StatsRow />

      {/* ─── Treatment Tags ───────────────────────────────────────── */}
      <TreatmentTagsSection />

      {/* ─── Featured Treatments ─────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="container-fms">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="section-label">Our Treatments</p>
              <h2 className="section-title">World-Class Dental Care</h2>
              <p className="section-subtitle">
                From single-tooth implants to complete smile transformations — every procedure is planned with digital precision.
              </p>
            </div>
            <Link href="/services" className="btn-secondary text-sm shrink-0">
              All Treatments
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust + CTA Band ─────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container-fms text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'oklch(0.75 0.1 240)' }}>
            Why Choose FMS Dental
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', maxWidth: '20ch', margin: '0 auto 1rem' }}>
            Trusted by 50,000+ Patients Across India & the World
          </h2>
          <p className="text-sm mb-8 mx-auto" style={{ color: 'oklch(0.82 0.05 240)', maxWidth: '55ch' }}>
            NABH-accredited. ISO-certified. Recognised as a Top 10 dental clinic in India by the Global Clinic Rating. Our doctors train internationally and bring world standards to Hyderabad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book" className="btn-accent">
              <CalendarCheck size={18} weight="fill" />
              Book Appointment
            </Link>
            <a href={`tel:${contact_and_appointment_info.primary_phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-white/30 text-white transition-colors hover:bg-white/10"
              style={{ fontFamily: 'var(--font-display)' }}>
              <Phone size={15} weight="fill" />
              {contact_and_appointment_info.primary_phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ─── Locations Teaser ─────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="container-fms">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="section-label">Our Locations</p>
              <h2 className="section-title">6 Clinics Across Hyderabad</h2>
              <p className="section-subtitle">
                Convenient locations across the city — all with the same NABH-accredited quality.
              </p>
            </div>
            <Link href="/clinics" className="btn-secondary text-sm shrink-0">
              All Clinics
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mobile sticky CTA ───────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t bg-white py-3 px-4 flex gap-2"
        style={{ borderColor: 'var(--color-border)', boxShadow: '0 -2px 12px oklch(0 0 0 / 0.08)' }}>
        <a href={`tel:${contact_and_appointment_info.primary_phone}`} className="btn-secondary flex-1 text-sm justify-center">
          <Phone size={15} weight="fill" />
          Call Now
        </a>
        <Link href="/book" className="btn-primary flex-1 text-sm justify-center">
          <CalendarCheck size={15} weight="fill" />
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
