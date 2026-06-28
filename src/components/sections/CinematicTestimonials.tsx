'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import fmsData from '@/lib/fmsData';

export default function CinematicTestimonials() {
  const testimonials = fmsData.testimonials_and_reviews.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up auto-play cross-fade for a documentary feel
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    // Subtle content entrance animation when active index changes
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-text-content',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="section bg-[var(--color-bg-alt)] border-y border-[var(--color-border)]">
      <div className="container-fms">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Documentary style slow-panning image / mock video frame */}
          <div className="lg:col-span-6 relative rounded-[2rem] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-card)] aspect-video bg-black select-none pointer-events-none">
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/images/testimonial_patient.png"
                alt="Patient testimonial portrait"
                className="w-full h-full object-cover opacity-70 transition-transform duration-[10000ms] ease-out scale-102 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Muted documentary watermark */}
            <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8px] uppercase tracking-widest text-white/80 font-mono">
                Documentary Autoplay
              </span>
            </div>
          </div>

          {/* Right: Subtitles and Metadata */}
          <div className="lg:col-span-6 text-left space-y-6 lg:pl-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Patient Voices
            </p>
            
            <div className="h-[180px] flex flex-col justify-center">
              <div className="testimonial-text-content space-y-4">
                <blockquote className="text-base sm:text-lg text-[var(--color-ink)] font-light leading-relaxed">
                  &ldquo;{testimonials[activeIndex].review}&rdquo;
                </blockquote>
                
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-ink)] font-display">
                    {testimonials[activeIndex].patient_name}
                  </h4>
                  <p className="text-[10px] text-[var(--color-ink-muted)] uppercase tracking-wider mt-0.5">
                    {testimonials[activeIndex].location} · {testimonials[activeIndex].treatment}
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2 pt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: activeIndex === idx ? '24px' : '6px',
                    backgroundColor: activeIndex === idx ? 'var(--color-primary)' : 'var(--color-border-strong)',
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
