'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TechnologyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of header and words
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(
        '.tech-word-1',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        '.tech-word-2',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.tech-word-3',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

      // Slow pan/zoom on background image as we scroll past
      gsap.fromTo(imgRef.current, 
        { scale: 1.05, x: 0 },
        {
          scale: 1.15,
          x: -15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-32 sm:py-40 bg-black overflow-hidden flex items-center justify-center">
      {/* Background Image Panel */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img
          ref={imgRef}
          src="/images/tech_showcase.png"
          alt="Microscope lens reflections technology"
          className="w-full h-full object-cover opacity-40 will-change-transform"
        />
        {/* Deep dark gradient vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Fullscreen Overlay Typography */}
      <div ref={contentRef} className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-4 max-w-[800px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Digital Atelier
          </p>
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight flex flex-col sm:flex-row items-center justify-center gap-x-4 leading-none"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em' }}
          >
            <span className="tech-word-1 opacity-0">Technology</span>
            <span className="tech-word-2 opacity-0 font-serif italic text-[var(--color-gold)] font-light">meets</span>
            <span className="tech-word-3 opacity-0 font-medium">craftsmanship.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-[42ch] mx-auto pt-4 leading-relaxed font-light">
            We coordinate clinical diagnostic equipment with human-centered aesthetics to construct unmatched dental transformations.
          </p>
        </div>
      </div>
    </div>
  );
}
