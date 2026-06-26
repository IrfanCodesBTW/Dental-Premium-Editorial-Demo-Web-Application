'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck, Phone, ShieldCheck } from '@phosphor-icons/react';
import { TrustBadges } from '@/components/ui/TrustBadges';
import fmsData from '@/lib/fmsData';

export default function HeroSection() {
  const { contact_and_appointment_info } = fmsData;

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'min(100dvh, 740px)', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 40%, oklch(0.42 0.16 240 / 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-fms relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">

          {/* ─── Left: Content ──────────────────────────────────── */}
          <div>
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-5"
            >
              <ShieldCheck size={14} weight="fill" style={{ color: 'var(--color-accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--color-accent)' }}>
                NABH Accredited · GCR Top 10 in India
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.035em', maxWidth: '14ch' }}
            >
              World-Class Dental Care in{' '}
              <span style={{ color: 'var(--color-primary)' }}>Hyderabad</span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--color-ink-secondary)', maxWidth: '48ch' }}
            >
              From dental implants and smile makeovers to Invisalign and full mouth rehabilitation — FMS Dental brings global-standard care across 6 clinics. Trusted by patients from 45+ countries.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link href="/book" className="btn-primary">
                <CalendarCheck size={18} weight="fill" />
                Book Appointment
              </Link>
              <a
                href={`tel:${contact_and_appointment_info.primary_phone}`}
                className="btn-secondary"
                aria-label={`Call FMS Dental at ${contact_and_appointment_info.primary_phone}`}
              >
                <Phone size={16} weight="fill" />
                {contact_and_appointment_info.primary_phone}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TrustBadges />
            </motion.div>
          </div>

          {/* ─── Right: Hero Image ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/3', boxShadow: 'var(--shadow-card-hover)' }}>
              <img
                src="https://picsum.photos/seed/dental-clinic-modern/800/600"
                alt="FMS Dental — Modern clinic interior"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--color-primary) / 0.05, transparent 60%)' }} />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-4 -left-6 card px-5 py-4 flex items-center gap-3"
              style={{ minWidth: '180px' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-primary-muted)' }}>
                <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)', lineHeight: 1 }}>20+</span>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>Years of Excellence</p>
                <p className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>Since 2004</p>
              </div>
            </motion.div>

            {/* Top floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 card px-4 py-3 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-accent-light)' }}>
                <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>4.9</span>
              </div>
              <div>
                <p className="text-[11px] font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>Patient Rating</p>
                <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>3,000+ reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
