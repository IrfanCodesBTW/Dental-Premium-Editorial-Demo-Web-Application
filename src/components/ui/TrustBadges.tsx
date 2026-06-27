'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Trophy, Clock, Buildings, Users, Star } from '@phosphor-icons/react';

const stats = [
  { value: '20+', label: 'Years of Clinical Excellence', icon: Clock },
  { value: '50K+', label: 'International Patients Served', icon: Users },
  { value: '06', label: 'State-of-the-Art Clinics', icon: Buildings },
  { value: '4.9★', label: 'Google Verified Rating', icon: Star },
];

const badges = [
  {
    icon: ShieldCheck,
    title: 'NABH Accredited',
    subtitle: 'Highest Patient Safety Standard',
    color: 'var(--color-primary)',
  },
  {
    icon: Trophy,
    title: 'GCR Top 10',
    subtitle: 'Top 10 Dental Clinic in India',
    color: 'var(--color-gold)',
  },
  {
    icon: Star,
    title: '4.9/5 Google Rating',
    subtitle: 'Across 3,000+ Verified Reviews',
    color: 'var(--color-accent)',
  },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {badges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl border bg-white shadow-sm"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0"
              style={{ backgroundColor: `${badge.color}10` }}>
              <Icon size={15} weight="fill" style={{ color: badge.color }} />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-wide uppercase leading-none mb-1 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
                {badge.title}
              </p>
              <p className="text-[10px] text-slate-500 leading-none">
                {badge.subtitle}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="relative border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-fms py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)]">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col items-center lg:items-start text-center lg:text-left ${
                  i > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={16} weight="fill" className="text-[var(--color-primary)]" />
                  
                  {/* Breathing Pulse for live data */}
                  {i === 2 && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <p className="stat-number text-3xl sm:text-4xl font-bold leading-none text-[var(--color-ink)]">{stat.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-2">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
