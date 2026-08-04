'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the main text block
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtle video scale-up on scroll
      gsap.fromTo(
        videoRef.current,
        { scale: 1.0, opacity: 0.15 },
        {
          scale: 1.1,
          opacity: 0.25,
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
    <div ref={containerRef} className="relative w-full py-32 sm:py-44 bg-black overflow-hidden flex items-center justify-center">
      {/* Background Microscope Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover will-change-transform"
        >
          <source src="/videos/Smile_and_dental_microscope.mp4" type="video/mp4" />
        </video>
        {/* Elegant vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Narrative Story Block */}
      <div ref={textRef} className="relative z-10 w-full max-w-[850px] text-center px-6 space-y-6">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light text-white/95 tracking-wide leading-tight"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          Every smile starts with <span className="text-[var(--color-gold)] font-medium font-serif italic">confidence.</span>
        </h2>
        <p className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-300 tracking-wide leading-snug max-w-[28ch] mx-auto">
          And confidence starts with <span className="text-[var(--color-accent)] font-semibold">precision.</span>
        </p>
      </div>
    </div>
  );
}
