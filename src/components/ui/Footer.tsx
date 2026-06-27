import Link from 'next/link';
import { Phone, Envelope, MapPin, ArrowRight, ShieldCheck, Trophy, Star } from '@phosphor-icons/react/dist/ssr';
import fmsData from '@/lib/fmsData';

export default function Footer() {
  const { contact_and_appointment_info, clinics_and_locations } = fmsData;

  return (
    <footer className="bg-[oklch(0.12_0.005_170)] text-white/90 border-t border-white/5">
      {/* Main footer */}
      <div className="container-fms py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Column (Asymmetric Width: 5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-display)' }}>FMS</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                FMS Dental
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-[38ch]">
              Hyderabad&apos;s leading NABH-accredited dental group with over 20 years of clinical excellence. Specialized in international dental tourism, implants, and digital smile design.
            </p>
            
            {/* Accreditation details */}
            <div className="space-y-3.5 pt-4">
              <div className="flex items-center gap-2.5 text-xs text-emerald-400">
                <ShieldCheck size={16} weight="fill" />
                <span className="font-medium tracking-wide uppercase">NABH Accredited Clinic Group</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[var(--color-gold)]">
                <Trophy size={16} weight="fill" />
                <span className="font-medium tracking-wide uppercase">GCR Top 10 in India</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-sky-400">
                <Star size={16} weight="fill" />
                <span className="font-medium tracking-wide uppercase">4.9/5 Rated (3,000+ Patient Reviews)</span>
              </div>
            </div>
          </div>

          {/* Treatments Column (Asymmetric Width: 2 cols) */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] mb-6 text-slate-300" style={{ fontFamily: 'var(--font-display)' }}>
              Treatments
            </h3>
            <ul className="space-y-3">
              {['Dental Implants', 'Smile Makeover', 'Invisalign', 'Root Canal', 'Teeth Whitening', 'Dental Veneers'].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-xs tracking-wide text-slate-400 transition-colors duration-300 hover:text-white flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={10} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-emerald-400" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinics Column (Asymmetric Width: 2 cols) */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] mb-6 text-slate-300" style={{ fontFamily: 'var(--font-display)' }}>
              Clinics
            </h3>
            <ul className="space-y-3">
              {clinics_and_locations.map((clinic) => (
                <li key={clinic.id}>
                  <Link
                    href="/clinics"
                    className="text-xs tracking-wide text-slate-400 transition-colors duration-300 hover:text-white flex items-center gap-1.5 group"
                  >
                    <MapPin size={10} className="shrink-0 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    {clinic.area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Booking Column (Asymmetric Width: 3 cols) */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300" style={{ fontFamily: 'var(--font-display)' }}>
              Consultation
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`tel:${contact_and_appointment_info.primary_phone}`}
                  className="flex items-center gap-2.5 text-xs text-slate-400 transition-colors duration-300 hover:text-white group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
                    <Phone size={12} weight="fill" className="text-emerald-400" />
                  </div>
                  {contact_and_appointment_info.primary_phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact_and_appointment_info.email}`}
                  className="flex items-center gap-2.5 text-xs text-slate-400 transition-colors duration-300 hover:text-white group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
                    <Envelope size={12} weight="fill" className="text-emerald-400" />
                  </div>
                  {contact_and_appointment_info.email}
                </a>
              </li>
              <li className="text-[10px] text-slate-500 font-mono pl-9">
                Booking Hours: {contact_and_appointment_info.booking_hours}
              </li>
            </ul>
            <div className="pt-2">
              <Link href="/book" className="btn-primary w-full text-center text-[10px] tracking-widest py-3">
                Request Booking
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container-fms py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-500 font-mono text-center sm:text-left">
            © {new Date().getFullYear()} FMS Dental. Crafted for high-value portfolio demonstration.
          </p>
          <div className="flex items-center gap-6 text-[10px] text-slate-500 font-mono">
            <Link href="/admin/login" className="hover:text-white transition-colors">Portal Access</Link>
            <span>·</span>
            <span className="text-emerald-500">Live Demo Status: Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
