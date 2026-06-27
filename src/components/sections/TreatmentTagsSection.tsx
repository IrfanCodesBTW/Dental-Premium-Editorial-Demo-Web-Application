'use client';

import Link from 'next/link';
import fmsData from '@/lib/fmsData';

export default function TreatmentTagsSection() {
  const { treatment_tags } = fmsData.tagging_dimensions;

  // Duplicate tags list to create seamless infinite scrolling loop
  const doubleTags = [...treatment_tags, ...treatment_tags, ...treatment_tags, ...treatment_tags];

  return (
    <section className="py-6 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)] overflow-hidden relative">
      {/* Editorial side fades to blend marquee edge */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-bg-alt)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-bg-alt)] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-6 overflow-hidden">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] shrink-0 pl-6 text-slate-400 select-none">
          Specialties:
        </span>
        
        <div className="flex animate-marquee whitespace-nowrap gap-4">
          {doubleTags.map((tag, idx) => (
            <Link
              key={`${tag.id}-${idx}`}
              href={`/services?tag=${tag.id}`}
              className="pill shrink-0 text-[10px] py-1.5 px-4 tracking-wider uppercase font-semibold"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
