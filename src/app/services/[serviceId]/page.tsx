import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, CalendarCheck, CurrencyInr, Cpu, UserCircle } from '@phosphor-icons/react/dist/ssr';
import fmsData from '@/lib/fmsData';
import DoctorCard from '@/components/cards/DoctorCard';

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
    <div className="container-fms py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
        <Link href="/services" className="flex items-center gap-1.5 btn-ghost text-xs px-2">
          <ArrowLeft size={13} />
          All Services
        </Link>
        <span style={{ color: 'var(--color-border-strong)' }}>/</span>
        <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{service.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ─── Main Content ──────────────────────────────── */}
        <div className="lg:col-span-2 space-y-10">
          {/* Hero image + header */}
          <div>
            <div className="rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '16/7' }}>
              <img
                src={`https://picsum.photos/seed/${service.image_keyword}/1200/525`}
                alt={service.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <span className="badge-primary text-xs mb-3">{service.category}</span>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.03em' }}>
              {service.name}
            </h1>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
              {service.short_description}
            </p>
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              Overview
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)', maxWidth: '65ch' }}>
              {service.detailed_description}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              Key Benefits
            </h2>
            <ul className="space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle size={18} weight="fill" className="shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-ink-secondary)' }}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              Ideal For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.ideal_for.map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--color-primary-muted)' }}>
                  <CheckCircle size={15} weight="fill" className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-ink)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Technology */}
          {relatedTech.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                <span className="flex items-center gap-2"><Cpu size={18} style={{ color: 'var(--color-accent)' }} /> Technology We Use</span>
              </h2>
              <div className="space-y-3">
                {relatedTech.map((tech) => (
                  <div key={tech.id} className="card p-4">
                    <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                      {tech.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: 'var(--color-ink-muted)' }}>{tech.description}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>✓ {tech.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Doctors */}
          {relatedDoctors.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                <span className="flex items-center gap-2"><UserCircle size={18} style={{ color: 'var(--color-primary)' }} /> Our Specialists</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── Sidebar ──────────────────────────────────── */}
        <div className="space-y-5">
          {/* Book CTA */}
          <div className="card p-6 sticky top-20">
            <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              Book This Treatment
            </h3>
            <p className="text-xs mb-5" style={{ color: 'var(--color-ink-muted)' }}>
              Schedule a consultation with our specialists. First consultation is complimentary.
            </p>
            <Link
              href={`/book?service=${service.id}`}
              className="btn-primary w-full justify-center mb-3 text-sm"
              id={`book-${service.id}`}
            >
              <CalendarCheck size={16} weight="fill" />
              Book Appointment
            </Link>
            <a
              href={`tel:${fmsData.contact_and_appointment_info.primary_phone}`}
              className="btn-secondary w-full justify-center text-sm"
            >
              Call Us Now
            </a>
          </div>

          {/* Pricing insight */}
          {pricing && (
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                <CurrencyInr size={15} style={{ color: 'var(--color-gold)' }} />
                Pricing Insight
              </h3>
              <div className="space-y-3 mb-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-muted)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-primary)' }}>At FMS Dental (India)</p>
                  <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    {pricing.india_range}
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-ink-muted)' }}>Globally (USA/UK)</p>
                  <p className="text-base font-semibold line-through" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-muted)' }}>
                    {pricing.global_range}
                  </p>
                </div>
              </div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-success)' }}>
                {pricing.savings_note}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>
                * {pricing.disclaimer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
