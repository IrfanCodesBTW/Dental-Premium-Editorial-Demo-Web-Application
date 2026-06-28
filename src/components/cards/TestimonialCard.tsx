'use client';

import { motion } from 'framer-motion';
import { Star, Quotes } from '@phosphor-icons/react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card p-6 flex flex-col h-full bg-white">
      {/* Review quote icon and rating */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-[var(--color-primary-light)]">
          <Quotes size={32} weight="fill" style={{ opacity: 0.8 }} />
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={12} weight="fill" style={{ color: 'var(--color-gold)' }} />
          ))}
        </div>
      </div>

      {/* Review content body */}
      <blockquote className="text-xs leading-relaxed text-slate-600 flex-1 mb-6 italic">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>

      {/* Review patient metadata info */}
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[var(--color-border-strong)] bg-slate-100">
          <img
            src={`https://picsum.photos/seed/${testimonial.image_seed}/80/80`}
            alt={testimonial.patient_name}
            className="w-full h-full object-cover grayscale brightness-95"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--color-ink)] truncate" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
            {testimonial.patient_name}
          </p>
          <p className="text-[9px] text-slate-400 font-medium truncate mt-0.5">
            {testimonial.location} · {testimonial.treatment}
          </p>
        </div>
      </div>
    </div>
  );
}
