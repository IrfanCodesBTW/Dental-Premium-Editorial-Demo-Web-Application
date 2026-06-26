'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, CalendarCheck, Tag } from '@phosphor-icons/react';
import { Clinic } from '@/types';

interface ClinicCardProps {
  clinic: Clinic;
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <motion.div
      className="card p-5 flex flex-col gap-4 h-full"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            {clinic.branch_name.replace('FMS Dental — ', '')}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
            {clinic.city}
          </p>
        </div>
        {clinic.special_focus && (
          <span className="badge-primary text-[10px] shrink-0 flex items-center gap-1">
            <Tag size={9} />
            {clinic.special_focus}
          </span>
        )}
      </div>

      {/* Address */}
      <div className="flex items-start gap-2">
        <MapPin size={14} weight="fill" className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
        <div>
          <p className="text-sm leading-snug" style={{ color: 'var(--color-ink-secondary)' }}>
            {clinic.address}
          </p>
          {clinic.landmarks.length > 0 && (
            <p className="text-xs mt-1" style={{ color: 'var(--color-ink-muted)' }}>
              Near: {clinic.landmarks[0]}
            </p>
          )}
        </div>
      </div>

      {/* Phone numbers */}
      <div className="flex flex-col gap-1">
        {clinic.phone_numbers.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--color-ink-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ink-secondary)')}
          >
            <Phone size={13} weight="fill" style={{ color: 'var(--color-accent)' }} />
            {phone}
          </a>
        ))}
      </div>

      {/* Hours */}
      <p className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>
        {clinic.hours}
      </p>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <a
          href={`tel:${clinic.phone_numbers[0]}`}
          className="btn-secondary text-xs flex-1 justify-center"
          aria-label={`Call ${clinic.branch_name}`}
        >
          <Phone size={13} weight="fill" />
          Call
        </a>
        <Link
          href={`/book?clinic=${clinic.id}`}
          className="btn-primary text-xs flex-1 justify-center"
          aria-label={`Book at ${clinic.branch_name}`}
        >
          <CalendarCheck size={13} weight="fill" />
          Book Here
        </Link>
      </div>
    </motion.div>
  );
}
