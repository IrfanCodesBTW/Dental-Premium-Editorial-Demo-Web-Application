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
    <div className="card p-6 flex flex-col gap-5 h-full">
      {/* Clinic branch heading */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-sm leading-tight text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {clinic.branch_name.replace('FMS Dental — ', '')}
          </h3>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
            {clinic.city}
          </p>
        </div>
        {clinic.special_focus && (
          <span className="badge-primary text-[9px] py-1 px-3 rounded-full flex items-center gap-1 font-semibold tracking-wider uppercase shrink-0">
            <Tag size={10} />
            {clinic.special_focus}
          </span>
        )}
      </div>

      {/* Address Block */}
      <div className="flex items-start gap-2.5 pt-3 border-t border-[var(--color-border)]">
        <MapPin size={16} weight="fill" className="shrink-0 text-[var(--color-primary)] mt-0.5" />
        <div className="min-w-0">
          <p className="text-xs leading-relaxed text-slate-600">
            {clinic.address}
          </p>
          {clinic.landmarks.length > 0 && (
            <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
              Landmark: {clinic.landmarks[0]}
            </p>
          )}
        </div>
      </div>

      {/* Contact details */}
      <div className="flex flex-col gap-2 pt-2">
        {clinic.phone_numbers.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone}`}
            className="flex items-center gap-2.5 text-xs text-slate-500 hover:text-[var(--color-primary)] transition-colors group"
          >
            <Phone size={13} weight="fill" className="text-slate-400 group-hover:text-[var(--color-accent)] transition-colors" />
            <span className="font-medium tracking-wide">{phone}</span>
          </a>
        ))}
      </div>

      {/* Timings */}
      <div className="text-[10px] px-3.5 py-2 rounded-xl bg-[var(--color-primary-muted)] text-[var(--color-primary)] font-semibold tracking-wide border border-[var(--color-primary-light)]">
        Hours: {clinic.hours}
      </div>

      {/* Actions footer */}
      <div className="flex gap-2.5 mt-auto pt-4 border-t border-[var(--color-border)]">
        <a
          href={`tel:${clinic.phone_numbers[0]}`}
          className="btn-secondary text-[9px] font-bold tracking-wider py-3 px-4 flex-1 justify-center"
          aria-label={`Call ${clinic.branch_name}`}
        >
          <Phone size={12} weight="fill" />
          <span>Call</span>
        </a>
        <Link
          href={`/book?clinic=${clinic.id}`}
          className="btn-primary text-[9px] font-bold tracking-wider py-3 px-4 flex-1 justify-center"
          aria-label={`Book at ${clinic.branch_name}`}
        >
          <CalendarCheck size={12} weight="fill" />
          <span>Book Here</span>
        </Link>
      </div>
    </div>
  );
}
