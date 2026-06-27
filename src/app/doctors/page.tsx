'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import fmsData from '@/lib/fmsData';
import DoctorCard from '@/components/cards/DoctorCard';

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const gridItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 16 },
  },
} as const;

export default function DoctorsPage() {
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [clinicFilter, setClinicFilter] = useState('');

  const { doctors_and_specialists, clinics_and_locations, tagging_dimensions } = fmsData;

  const filtered = useMemo(() => {
    return doctors_and_specialists.filter((d) => {
      const matchesSpecialty = !specialtyFilter || d.specialties.some((s) =>
        s.toLowerCase().includes(specialtyFilter.toLowerCase())
      );
      const matchesClinic = !clinicFilter || d.clinic_ids.includes(clinicFilter);
      return matchesSpecialty && matchesClinic;
    });
  }, [doctors_and_specialists, specialtyFilter, clinicFilter]);

  return (
    <div className="container-fms py-16 lg:py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="section-label">Our Specialists</p>
        <h1 className="section-title">Meet the Doctors</h1>
        <p className="section-subtitle">
          Internationally-trained dental specialists with decades of combined experience. Each brings a commitment to precision, care, and patient comfort.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center">
        {/* Specialty filter pills */}
        <div className="flex flex-wrap gap-2 flex-1">
          <button 
            onClick={() => setSpecialtyFilter('')} 
            className={`pill text-[10px] py-1.5 px-4 font-semibold tracking-wider ${!specialtyFilter ? 'active' : ''}`}
          >
            All Specialties
          </button>
          {tagging_dimensions.specialty_tags.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSpecialtyFilter(specialtyFilter === specialty ? '' : specialty)}
              className={`pill text-[10px] py-1.5 px-4 font-semibold tracking-wider ${specialtyFilter === specialty ? 'active' : ''}`}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* Clinic filter dropdown */}
        <div className="w-full lg:w-64">
          <select
            value={clinicFilter}
            onChange={(e) => setClinicFilter(e.target.value)}
            className="form-select text-xs font-semibold tracking-wider uppercase py-3.5 pl-4 pr-10"
            aria-label="Filter by clinic"
            id="clinic-filter"
          >
            <option value="">All Clinics</option>
            {clinics_and_locations.map((c) => (
              <option key={c.id} value={c.id}>{c.area}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs font-mono uppercase tracking-wider mb-6 text-slate-400">
        {filtered.length} specialist{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          key={specialtyFilter + clinicFilter} // Re-animate on filter change
        >
          {filtered.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={gridItemVariants}
            >
              <DoctorCard doctor={doctor} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-alt)]/25">
          <p className="text-lg font-medium mb-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>No doctors found</p>
          <button 
            onClick={() => { setSpecialtyFilter(''); setClinicFilter(''); }} 
            className="btn-secondary text-[10px] py-3 px-5 tracking-widest uppercase font-semibold mt-2"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
