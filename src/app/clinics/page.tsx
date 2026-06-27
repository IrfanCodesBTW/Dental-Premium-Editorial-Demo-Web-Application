'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import fmsData from '@/lib/fmsData';
import ClinicCard from '@/components/cards/ClinicCard';

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

export default function ClinicsPage() {
  const [areaFilter, setAreaFilter] = useState('');

  const { clinics_and_locations, tagging_dimensions } = fmsData;

  const filtered = useMemo(() => {
    return clinics_and_locations.filter((c) => {
      const matchesArea = !areaFilter || c.area.toLowerCase().includes(areaFilter.toLowerCase());
      return matchesArea;
    });
  }, [clinics_and_locations, areaFilter]);

  return (
    <div className="container-fms py-16 lg:py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="section-label">Branch Directory</p>
        <h1 className="section-title">Our Clinics</h1>
        <p className="section-subtitle">
          6 fully-equipped, NABH-accredited dental clinics across Hyderabad — all offering the same world-class standard of care.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setAreaFilter('')}
          className={`pill text-[10px] py-1.5 px-4 font-semibold tracking-wider ${!areaFilter ? 'active' : ''}`}
        >
          All Areas
        </button>
        {tagging_dimensions.city_tags.map((area) => (
          <button
            key={area}
            onClick={() => setAreaFilter(areaFilter === area ? '' : area)}
            className={`pill text-[10px] py-1.5 px-4 font-semibold tracking-wider ${areaFilter === area ? 'active' : ''}`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          key={areaFilter} // Re-animate on filter change
        >
          {filtered.map((clinic) => (
            <motion.div
              key={clinic.id}
              variants={gridItemVariants}
            >
              <ClinicCard clinic={clinic} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-alt)]/25">
          <p className="text-lg font-medium mb-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>No clinics found</p>
          <button onClick={() => setAreaFilter('')} className="btn-secondary text-[10px] py-3 px-5 tracking-widest uppercase font-semibold mt-2">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
