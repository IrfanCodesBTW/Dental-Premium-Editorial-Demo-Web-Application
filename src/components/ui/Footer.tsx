import Link from 'next/link';
import { Phone, Envelope, MapPin, ArrowRight, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import fmsData from '@/lib/fmsData';

export default function Footer() {
  const { contact_and_appointment_info, clinics_and_locations } = fmsData;

  return (
    <footer style={{ backgroundColor: 'var(--color-ink)', color: 'white' }}>
      {/* Main footer */}
      <div className="container-fms py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>FMS</span>
              </div>
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                FMS Dental
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'oklch(0.75 0.01 240)' }}>
              Hyderabad&apos;s leading NABH-accredited dental group with over 20 years of excellence in dental care across 6 clinics.
            </p>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'oklch(0.65 0.08 170)' }}>
              <ShieldCheck size={14} weight="fill" />
              <span>NABH Accredited | GCR Top 10</span>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'oklch(0.75 0.01 240)', fontFamily: 'var(--font-display)' }}>
              Treatments
            </h3>
            <ul className="space-y-2">
              {['Dental Implants', 'Smile Makeover', 'Invisalign', 'Root Canal', 'Teeth Whitening', 'Veneers'].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm transition-colors duration-150 hover:text-white flex items-center gap-1.5 group"
                    style={{ color: 'oklch(0.65 0.008 240)' }}
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinics column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'oklch(0.75 0.01 240)', fontFamily: 'var(--font-display)' }}>
              Our Clinics
            </h3>
            <ul className="space-y-2">
              {clinics_and_locations.map((clinic) => (
                <li key={clinic.id}>
                  <Link
                    href="/clinics"
                    className="text-sm transition-colors duration-150 hover:text-white flex items-center gap-1.5 group"
                    style={{ color: 'oklch(0.65 0.008 240)' }}
                  >
                    <MapPin size={11} className="shrink-0 opacity-70" />
                    {clinic.area}
                    {clinic.special_focus && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'oklch(0.42 0.16 240 / 0.4)', color: 'oklch(0.8 0.1 240)' }}>
                        {clinic.special_focus.split(' ')[0]}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'oklch(0.75 0.01 240)', fontFamily: 'var(--font-display)' }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contact_and_appointment_info.primary_phone}`}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white group"
                  style={{ color: 'oklch(0.65 0.008 240)' }}
                >
                  <Phone size={13} weight="fill" className="shrink-0" style={{ color: 'var(--color-accent)' }} />
                  {contact_and_appointment_info.primary_phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact_and_appointment_info.email}`}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                  style={{ color: 'oklch(0.65 0.008 240)' }}
                >
                  <Envelope size={13} weight="fill" className="shrink-0" style={{ color: 'var(--color-accent)' }} />
                  {contact_and_appointment_info.email}
                </a>
              </li>
              <li className="text-xs pt-2" style={{ color: 'oklch(0.55 0.006 240)' }}>
                {contact_and_appointment_info.booking_hours}
              </li>
            </ul>
            <div className="mt-5">
              <Link href="/book" className="btn-accent text-xs px-4 py-2 w-full justify-center">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'oklch(0.28 0.01 240)' }}>
        <div className="container-fms py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'oklch(0.50 0.005 240)' }}>
            © {new Date().getFullYear()} FMS Dental. All rights reserved. Demo project — not a live service.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'oklch(0.50 0.005 240)' }}>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
