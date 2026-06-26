'use client';

import { motion } from 'framer-motion';
import { Star, Quotes } from '@phosphor-icons/react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      className="card p-6 flex flex-col h-full"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Quote icon + stars */}
      <div className="flex items-center justify-between mb-4">
        <Quotes size={28} weight="fill" style={{ color: 'var(--color-primary-light)' }} />
        <div className="flex items-center gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={13} weight="fill" style={{ color: 'var(--color-gold)' }} />
          ))}
        </div>
      </div>

      {/* Review text */}
      <blockquote className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--color-ink-secondary)' }}>
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>

      {/* Patient info */}
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img
            src={`https://picsum.photos/seed/${testimonial.image_seed}/80/80`}
            alt={testimonial.patient_name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            {testimonial.patient_name}
          </p>
          <p className="text-[11px] truncate" style={{ color: 'var(--color-ink-muted)' }}>
            {testimonial.location} · {testimonial.treatment}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
