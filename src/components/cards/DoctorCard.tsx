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
      className="card overflow-hidden flex flex-col h-full"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Doctor image */}
      <div className="flex items-center gap-4 p-5 pb-0">
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2" style={{ borderColor: 'var(--color-primary-light)' }}>
          <img
            src={`https://picsum.photos/seed/${doctor.image_seed}/150/150`}
            alt={doctor.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="font-semibold text-base leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            {doctor.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
            {doctor.designation}
          </p>
          <p className="text-xs font-medium mt-1" style={{ color: 'var(--color-primary)' }}>
            {doctor.experience_years} years experience
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {doctor.specialties.slice(0, 3).map((specialty) => (
            <span key={specialty} className="badge-primary text-[10px]">
              <Stethoscope size={9} />
              {specialty}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed flex-1 mb-3" style={{ color: 'var(--color-ink-muted)' }}>
          {doctor.bio.slice(0, 120)}...
        </p>

        {/* Qualifications */}
        <div className="flex items-start gap-1.5 mb-3">
          <GraduationCap size={13} weight="fill" className="shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
          <p className="text-xs" style={{ color: 'var(--color-ink-secondary)' }}>
            {doctor.qualifications[0]}
          </p>
        </div>

        {/* Clinics */}
        <div className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-ink-muted)' }}>
          Available at: <span className="font-medium" style={{ color: 'var(--color-ink)' }}>{clinicNames.join(', ')}</span>
        </div>
      </div>
    </motion.div>
  );
}
