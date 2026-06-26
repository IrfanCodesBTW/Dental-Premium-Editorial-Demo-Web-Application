'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Trophy, Clock, Buildings, Users, Star } from '@phosphor-icons/react';

const stats = [
  { value: '20+', label: 'Years of Excellence', icon: Clock },
  { value: '50,000+', label: 'Happy Patients', icon: Users },
  { value: '6', label: 'Clinics in Hyderabad', icon: Buildings },
  { value: '15', label: 'Specialist Doctors', icon: Star },
];

const badges = [
  {
    icon: ShieldCheck,
    title: 'NABH Accredited',
    subtitle: 'Highest patient safety standards',
    color: 'var(--color-primary)',
  },
  {
    icon: Trophy,
    title: 'GCR Top 10',
    subtitle: 'Top 10 dental clinic in India',
    color: 'var(--color-gold)',
  },
  {
    icon: Star,
    title: '4.9/5 Rating',
    subtitle: 'Across 3,000+ reviews',
    color: 'var(--color-accent)',
  },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-3 justify-start">
      {badges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border bg-white"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ backgroundColor: `${badge.color}15` }}>
              <Icon size={16} weight="fill" style={{ color: badge.color }} />
            </div>
            <div>
              <p className="text-xs font-semibold leading-none mb-0.5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                {badge.title}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center justify-center py-8 px-4 text-center"
            style={{ backgroundColor: 'white' }}
          >
            <Icon size={20} weight="fill" className="mb-2" style={{ color: 'var(--color-primary)' }} />
            <p className="stat-number text-2xl lg:text-3xl">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-ink-muted)' }}>{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
