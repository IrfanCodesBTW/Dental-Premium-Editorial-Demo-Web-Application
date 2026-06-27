'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Stethoscope } from '@phosphor-icons/react';
import { Doctor } from '@/types';
import fmsData from '@/lib/fmsData';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const clinicNames = doctor.clinic_ids.map((id) => {
    const clinic = fmsData.clinics_and_locations.find((c) => c.id === id);
    return clinic?.area || id;
  });

  return (
    <motion.div
      className="card flex flex-col h-full border border-[var(--color-border)] hover:border-slate-300 bg-white"
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
    >
      {/* Doctor profile card header */}
      <div className="flex items-center gap-4 p-6 pb-4 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]/30">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[var(--color-border-strong)] bg-slate-100">
          <img
            src={`https://picsum.photos/seed/${doctor.image_seed}/150/150`}
            alt={doctor.name}
            className="w-full h-full object-cover grayscale brightness-95 contrast-105 transition-all duration-500 hover:grayscale-0"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm leading-tight text-[var(--color-ink)] truncate" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {doctor.name}
          </h3>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-1 truncate">
            {doctor.designation}
          </p>
          <p className="text-[10px] font-semibold text-[var(--color-primary)] mt-1.5 font-mono">
            {doctor.experience_years} Years Experience
          </p>
        </div>
      </div>

      {/* Card body content */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        {/* Specialties list */}
        <div className="flex flex-wrap gap-1.5">
          {doctor.specialties.slice(0, 3).map((specialty) => (
            <span key={specialty} className="badge-primary text-[9px] py-0.5 px-2.5 rounded-full flex items-center gap-1 font-semibold tracking-wider uppercase">
              <Stethoscope size={10} className="shrink-0" />
              {specialty}
            </span>
          ))}
        </div>

        {/* Biography excerpt */}
        <p className="text-xs leading-relaxed text-slate-500 flex-1 line-clamp-3">
          {doctor.bio}
        </p>

        {/* Primary Qualification */}
        <div className="flex items-start gap-2 pt-2 text-[10px] font-medium text-slate-600">
          <GraduationCap size={15} weight="fill" className="shrink-0 text-slate-400 mt-0.5" />
          <span>{doctor.qualifications[0]}</span>
        </div>

        {/* Location Availability List */}
        <div className="text-[10px] px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 text-slate-500 mt-2">
          Available at:{' '}
          <span className="font-semibold text-[var(--color-ink)]">
            {clinicNames.join(', ')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
