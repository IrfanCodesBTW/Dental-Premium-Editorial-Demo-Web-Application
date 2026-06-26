'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import fmsData from '@/lib/fmsData';
import DoctorCard from '@/components/cards/DoctorCard';

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
    <div className="container-fms py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="section-label">Our Specialists</p>
        <h1 className="section-title">Meet the Doctors</h1>
        <p className="section-subtitle">
          Internationally-trained dental specialists with decades of combined experience. Each brings a commitment to precision, care, and patient comfort.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Specialty filter pills */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSpecialtyFilter('')} className={`pill text-xs ${!specialtyFilter ? 'active' : ''}`}>
            All Specialties
          </button>
          {tagging_dimensions.specialty_tags.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSpecialtyFilter(specialtyFilter === specialty ? '' : specialty)}
              className={`pill text-xs ${specialtyFilter === specialty ? 'active' : ''}`}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* Clinic filter */}
        <select
          value={clinicFilter}
          onChange={(e) => setClinicFilter(e.target.value)}
          className="form-select max-w-xs text-sm"
          aria-label="Filter by clinic"
          id="clinic-filter"
        >
          <option value="">All Clinics</option>
          {clinics_and_locations.map((c) => (
            <option key={c.id} value={c.id}>{c.area}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doctor, i) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <DoctorCard doctor={doctor} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>No doctors found</p>
          <button onClick={() => { setSpecialtyFilter(''); setClinicFilter(''); }} className="btn-secondary text-sm mt-2">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
