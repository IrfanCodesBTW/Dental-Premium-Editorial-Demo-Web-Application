'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import TestimonialCard from '@/components/cards/TestimonialCard';
import fmsData from '@/lib/fmsData';

const VISIBLE = 3;

export default function TestimonialsSection() {
  const testimonials = fmsData.testimonials_and_reviews;
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start + VISIBLE < testimonials.length;

  const visible = testimonials.slice(start, start + VISIBLE);

  return (
    <section className="section">
      <div className="container-fms">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label">Patient Stories</p>
            <h2 className="section-title">Real Results, Real Smiles</h2>
            <p className="section-subtitle">
              Hear from patients across India and internationally who chose FMS Dental for their care.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setStart((s) => Math.max(0, s - VISIBLE))}
              disabled={!canPrev}
              className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors disabled:opacity-40"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-secondary)' }}
              aria-label="Previous testimonials"
            >
              <CaretLeft size={16} />
            </button>
            <button
              onClick={() => setStart((s) => Math.min(testimonials.length - VISIBLE, s + VISIBLE))}
              disabled={!canNext}
              className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors disabled:opacity-40"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-secondary)' }}
              aria-label="Next testimonials"
            >
              <CaretRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {visible.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <TestimonialCard testimonial={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / VISIBLE) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i * VISIBLE)}
              className="rounded-full transition-all"
              style={{
                width: start / VISIBLE === i ? '20px' : '6px',
                height: '6px',
                backgroundColor: start / VISIBLE === i ? 'var(--color-primary)' : 'var(--color-border-strong)',
              }}
              aria-label={`Go to testimonials page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
