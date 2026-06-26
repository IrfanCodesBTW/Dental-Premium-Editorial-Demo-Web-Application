'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import fmsData from '@/lib/fmsData';
import ClinicCard from '@/components/cards/ClinicCard';

export default function ClinicsPage() {
  const [cityFilter, setCityFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');

  const { clinics_and_locations, tagging_dimensions } = fmsData;

  const filtered = useMemo(() => {
    return clinics_and_locations.filter((c) => {
      const matchesCity = !cityFilter || c.city === cityFilter;
      const matchesArea = !areaFilter || c.area.toLowerCase().includes(areaFilter.toLowerCase());
      return matchesCity && matchesArea;
    });
  }, [clinics_and_locations, cityFilter, areaFilter]);

  return (
    <div className="container-fms py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="section-label">Branch Directory</p>
        <h1 className="section-title">Our Clinics</h1>
        <p className="section-subtitle">
          6 fully-equipped, NABH-accredited dental clinics across Hyderabad — all offering the same world-class standard of care.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setAreaFilter('')}
          className={`pill text-xs ${!areaFilter ? 'active' : ''}`}
        >
          All Areas
        </button>
        {tagging_dimensions.city_tags.map((area) => (
          <button
            key={area}
            onClick={() => setAreaFilter(areaFilter === area ? '' : area)}
            className={`pill text-xs ${areaFilter === area ? 'active' : ''}`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((clinic, i) => (
          <motion.div
            key={clinic.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ClinicCard clinic={clinic} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>No clinics found</p>
          <button onClick={() => { setCityFilter(''); setAreaFilter(''); }} className="btn-secondary text-sm mt-2">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
