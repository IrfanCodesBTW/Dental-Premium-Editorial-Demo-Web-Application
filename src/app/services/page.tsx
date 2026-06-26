'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import fmsData from '@/lib/fmsData';
import ServiceCard from '@/components/cards/ServiceCard';

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
    <div className="container-fms py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="section-label">Treatments & Procedures</p>
        <h1 className="section-title">Dental Services at FMS</h1>
        <p className="section-subtitle">
          Browse our comprehensive range of dental treatments — all performed by internationally-trained specialists.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
          <input
            type="search"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-9 pr-4"
            aria-label="Search dental treatments"
            id="service-search"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Clear search">
              <X size={14} style={{ color: 'var(--color-ink-muted)' }} />
            </button>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag('')}
            className={`pill text-xs ${!activeTag ? 'active' : ''}`}
          >
            All
          </button>
          {tagging_dimensions.treatment_tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(activeTag === tag.id ? '' : tag.id)}
              className={`pill text-xs ${activeTag === tag.id ? 'active' : ''}`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm mb-6" style={{ color: 'var(--color-ink-muted)' }}>
        {filtered.length} treatment{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>No treatments found</p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-ink-muted)' }}>
            Try adjusting your search or clearing the filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveTag(''); }}
            className="btn-secondary text-sm"
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
    <Suspense fallback={<div className="container-fms py-12"><p style={{ color: 'var(--color-ink-muted)' }}>Loading treatments...</p></div>}>
      <ServicesContent />
    </Suspense>
  );
}
