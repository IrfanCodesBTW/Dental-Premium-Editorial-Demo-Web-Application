'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck, Phone, ShieldCheck, Trophy, Sparkle } from '@phosphor-icons/react';
import fmsData from '@/lib/fmsData';

export default function HeroSection() {
  const { contact_and_appointment_info } = fmsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 16 },
    },
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96, x: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  return (
    <section
      className="relative overflow-hidden flex items-center bg-[var(--color-bg)] border-b border-[var(--color-border)]"
      style={{ minHeight: 'min(92dvh, 850px)' }}
    >
      {/* Editorial Light Leak Background */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: 'radial-gradient(circle 800px at 70% 30%, oklch(0.35 0.065 170 / 0.05) 0%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="container-fms py-16 lg:py-24 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* ─── Left Column (Asymmetric Width: 7 cols) ─────────── */}
          <motion.div
            className="lg:col-span-7 text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Trust Kicker */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold uppercase tracking-wider"
            >
              <ShieldCheck size={14} weight="fill" className="text-emerald-600" />
              <span>NABH Accredited · GCR TOP 10 Clinic Group</span>
            </motion.div>

            {/* Cinematic Typography H1 */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[4.2rem] font-medium leading-[1.05] tracking-tight text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}
            >
              Precisely Crafted <br />
              <span className="text-[var(--color-primary)] font-semibold">Dental Masterpieces</span>
            </motion.h1>

            {/* Restrained Paragraph Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base text-slate-600 leading-relaxed max-w-[48ch]"
            >
              From dental implants and advanced smile makeovers to Invisalign — FMS Dental delivers world-class precision across 6 clinics in Hyderabad. Serving patients from 45+ countries.
            </motion.p>

            {/* Interactive CTAs with spring response */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Link href="/book" className="btn-primary flex items-center justify-center gap-2 group">
                <CalendarCheck size={16} weight="fill" className="transition-transform duration-300 group-hover:scale-110" />
                <span>Schedule Consultation</span>
              </Link>
              <a
                href={`tel:${contact_and_appointment_info.primary_phone}`}
                className="btn-secondary flex items-center justify-center gap-2"
                aria-label={`Call FMS Dental at ${contact_and_appointment_info.primary_phone}`}
              >
                <Phone size={14} weight="fill" className="text-[var(--color-accent)]" />
                <span>{contact_and_appointment_info.primary_phone}</span>
              </a>
            </motion.div>

            {/* Quick credentials badges inline */}
            <motion.div 
              variants={itemVariants}
              className="pt-8 border-t border-[var(--color-border)] grid grid-cols-3 gap-6 text-left"
            >
              <div>
                <p className="font-mono text-xl font-bold text-[var(--color-primary)]">20+</p>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mt-1">Years Clinical Excellence</p>
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-[var(--color-primary)]">50K+</p>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mt-1">Happy Patients</p>
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-[var(--color-primary)]">4.9★</p>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mt-1">Google Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right Column (Asymmetric Width: 5 cols) ────────── */}
          <motion.div
            className="lg:col-span-5 relative"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Visual Panel Composition (Frosted glass border offset frame) */}
            <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)]">
              {/* Refraction edge gradient wrapper */}
              <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-slate-100">
                <img
                  src="https://picsum.photos/seed/dental-clinic-modern-interior/600/750"
                  alt="FMS Dental Clinic Precision Environment"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.008_170)]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating material badge 1: Top Right */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-white/50 px-4 py-3 flex items-center gap-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-yellow-500/10 text-yellow-600">
                  <Trophy size={14} weight="fill" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-800 leading-none">Top 10 India</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">GCR Clinical Rating</p>
                </div>
              </motion.div>

              {/* Floating material badge 2: Bottom Left */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="absolute -bottom-4 -left-6 bg-white/95 backdrop-blur-md rounded-2xl border border-white/50 px-4 py-3 flex items-center gap-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                  <Sparkle size={14} weight="fill" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-800 leading-none">ISO Certified</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">International Quality</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
