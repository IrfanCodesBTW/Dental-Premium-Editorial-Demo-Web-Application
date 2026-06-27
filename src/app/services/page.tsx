'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import fmsData from '@/lib/fmsData';
import ServiceCard from '@/components/cards/ServiceCard';

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

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get('tag') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState(initialTag);

  const { services_and_treatments, tagging_dimensions } = fmsData;

  const filtered = useMemo(() => {
    return services_and_treatments.filter((s) => {
      const matchesTag = !activeTag || s.tags.includes(activeTag);
      const matchesSearch = !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [services_and_treatments, activeTag, searchQuery]);

  return (
    <div className="container-fms py-16 lg:py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="section-label">Treatments & Procedures</p>
        <h1 className="section-title">Dental Services at FMS</h1>
        <p className="section-subtitle">
          Browse our comprehensive range of dental treatments — all performed by internationally-trained specialists.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-11 pr-10 py-3"
            aria-label="Search dental treatments"
            id="service-search"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors" 
              aria-label="Clear search"
            >
              <X size={14} className="text-slate-400" />
            </button>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setActiveTag('')}
            className={`pill text-[10px] py-1.5 px-4 font-semibold tracking-wider ${!activeTag ? 'active' : ''}`}
          >
            All
          </button>
          {tagging_dimensions.treatment_tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(activeTag === tag.id ? '' : tag.id)}
              className={`pill text-[10px] py-1.5 px-4 font-semibold tracking-wider ${activeTag === tag.id ? 'active' : ''}`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs font-mono uppercase tracking-wider mb-6 text-slate-400">
        {filtered.length} treatment{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          key={activeTag + searchQuery} // Remount and animate when filters change
        >
          {filtered.map((service) => (
            <motion.div
              key={service.id}
              variants={gridItemVariants}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-alt)]/25">
          <p className="text-lg font-medium mb-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>No treatments found</p>
          <p className="text-xs text-slate-500 mb-6">
            Try adjusting your search or clearing the filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveTag(''); }}
            className="btn-secondary text-[10px] py-3 px-5 tracking-widest uppercase font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="container-fms py-16 text-center text-xs font-mono text-slate-400 uppercase tracking-widest">Loading treatments...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
