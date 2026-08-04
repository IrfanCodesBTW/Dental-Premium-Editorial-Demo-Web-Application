import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, CalendarCheck, CurrencyInr, Cpu, UserCircle } from '@phosphor-icons/react/dist/ssr';
import fmsData from '@/lib/fmsData';
import DoctorCard from '@/components/cards/DoctorCard';
import ServiceBanner from '@/components/ui/ServiceBanner';

interface Props {
  params: { serviceId: string };
}

export async function generateStaticParams() {
  return fmsData.services_and_treatments.map((s) => ({ serviceId: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = fmsData.services_and_treatments.find((s) => s.id === params.serviceId);
  if (!service) return { title: 'Treatment Not Found' };
  return {
    title: `${service.name} in Hyderabad`,
    description: service.short_description,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = fmsData.services_and_treatments.find((s) => s.id === params.serviceId);
  if (!service) notFound();

  const relatedDoctors = fmsData.doctors_and_specialists.filter((d) =>
    service.related_doctor_ids.includes(d.id)
  );
  const relatedTech = fmsData.technology_and_facilities.filter((t) =>
    service.related_technology_ids.includes(t.id)
  );
  const pricing = service.pricing_insight_id
    ? fmsData.pricing_insights.find((p) => p.id === service.pricing_insight_id)
    : null;

  return (
    <div className="container-fms py-16 lg:py-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest mb-10" aria-label="Breadcrumb">
        <Link href="/services" className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors">
          <ArrowLeft size={12} />
          <span>All Services</span>
        </Link>
        <span style={{ color: 'var(--color-border-strong)' }}>/</span>
        <span className="text-slate-400 select-none">{service.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* ─── Main Content Column (Asymmetric Width: 8 cols) ─── */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Main Visual Banner */}
          <div className="space-y-6">
            <ServiceBanner imageUrl={service.image_url} name={service.name} category={service.category} />

            <div className="space-y-4">
              <span className="badge-primary text-[9px] py-1 px-3 rounded-full font-semibold tracking-wider uppercase inline-block">
                {service.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}>
                {service.name}
              </h1>
              <p className="text-base leading-relaxed text-slate-600">
                {service.short_description}
              </p>
            </div>
          </div>

          {/* Detailed Treatment Overview */}
          <div className="pt-6 border-t border-[var(--color-border)]">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] mb-4 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              Clinical Overview
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 max-w-[65ch]">
              {service.detailed_description}
            </p>
          </div>

          {/* Benefits Bullet Grid */}
          <div className="pt-6 border-t border-[var(--color-border)]">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] mb-6 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              Treatment Benefits
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle size={18} weight="fill" className="shrink-0 mt-0.5 text-emerald-500" />
                  <span className="text-xs font-medium text-slate-600 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Onboarding Fit Criteria */}
          <div className="pt-6 border-t border-[var(--color-border)]">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] mb-6 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              Ideal Candidacy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.ideal_for.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/30">
                  <CheckCircle size={15} weight="fill" className="shrink-0 mt-0.5 text-[var(--color-primary)]" />
                  <span className="text-xs font-medium text-slate-600 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Technology Spotlight */}
          {relatedTech.length > 0 && (
            <div className="pt-6 border-t border-[var(--color-border)]">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] mb-6 text-[var(--color-ink)] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                <Cpu size={16} className="text-[var(--color-accent)]" />
                <span>Advanced Clinical Technology</span>
              </h2>
              <div className="space-y-4">
                {relatedTech.map((tech) => (
                  <div key={tech.id} className="card p-5 hover:border-[var(--color-primary)]">
                    <h3 className="font-semibold text-xs mb-1 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
                      {tech.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">{tech.description}</p>
                    <p className="text-[10px] font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                      ✓ Clinical Benefit: {tech.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Specialists */}
          {relatedDoctors.length > 0 && (
            <div className="pt-6 border-t border-[var(--color-border)]">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] mb-6 text-[var(--color-ink)] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                <UserCircle size={16} className="text-[var(--color-primary)]" />
                <span>Specialists Associated</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── Sidebar Column (Asymmetric Width: 4 cols) ─────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Booking Request Card */}
          <div className="card p-6 border border-[var(--color-border)] bg-white sticky top-24">
            <h3 className="font-semibold text-sm mb-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              Consultation Intake
            </h3>
            <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">
              Schedule your digital diagnostic assessment. Your first clinical review is complimentary.
            </p>
            <div className="space-y-3">
              <Link
                href={`/book?service=${service.id}`}
                className="btn-primary w-full justify-center text-[10px] py-3.5 tracking-wider font-semibold uppercase"
                id={`book-${service.id}`}
              >
                <CalendarCheck size={14} weight="fill" />
                <span>Request Appointment</span>
              </Link>
              <a
                href={`tel:${fmsData.contact_and_appointment_info.primary_phone}`}
                className="btn-secondary w-full justify-center text-[10px] py-3.5 tracking-wider font-semibold uppercase"
              >
                <span>Call Clinic Directly</span>
              </a>
            </div>
          </div>

          {/* Dynamic Comparative Pricing Chart */}
          {pricing && (
            <div className="card p-6 border border-[var(--color-border)] bg-white">
              <h3 className="font-semibold text-xs mb-4 flex items-center gap-2 text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)' }}>
                <CurrencyInr size={14} className="text-[var(--color-gold)]" />
                <span>Comparative Pricing</span>
              </h3>
              
              <div className="space-y-5">
                {/* India Price Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wider">FMS Dental (India)</span>
                    <span className="text-xs font-bold text-[var(--color-primary)] font-mono">{pricing.india_range}</span>
                  </div>
                  <div className="h-3 w-full bg-[var(--color-primary-muted)] rounded-full overflow-hidden border border-[var(--color-primary-light)]">
                    <div className="h-full bg-[var(--color-primary)] rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>

                {/* Global Price Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Western Cost (US/UK)</span>
                    <span className="text-xs font-bold text-slate-500 font-mono line-through">{pricing.global_range}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Arbitrage Savings */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-semibold text-center uppercase tracking-wider">
                  {pricing.savings_note}
                </div>

                <p className="text-[9px] text-slate-400 leading-snug">
                  * {pricing.disclaimer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
