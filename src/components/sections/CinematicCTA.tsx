'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CalendarCheck } from '@phosphor-icons/react';
import gsap from 'gsap';

export default function CinematicCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pull back the camera on scroll
      gsap.fromTo(
        imgRef.current,
        { scale: 1.15 },
        {
          scale: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );

      // Fade overlay into brand color at the end of the scroll
      gsap.to('.cta-overlay', {
        backgroundColor: 'rgba(43, 46, 38, 0.95)', // Matches our --color-primary walnut color opacity
        scrollTrigger: {
          trigger: containerRef.current,
          start: '50% bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Fade in content
      gsap.fromTo(
        '.cta-content-fade',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[90dvh] flex items-center justify-center overflow-hidden bg-black text-white py-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img
          ref={imgRef}
          src="/images/sunset_exit.png"
          alt="Family smiling confidently under sunset exit"
          className="w-full h-full object-cover scale-115 will-change-transform"
        />
        {/* Dynamic color overlay */}
        <div className="absolute inset-0 bg-black/45 cta-overlay transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[650px] text-center px-6 space-y-8">
        
        {/* Animated Brand Logo Mark */}
        <div className="cta-content-fade flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
              FMS
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            className="cta-content-fade text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
          >
            Ready for your <br />
            <span className="text-[var(--color-gold)] font-medium">best smile?</span>
          </h2>
          <p className="cta-content-fade text-xs sm:text-sm text-slate-300 max-w-[44ch] mx-auto leading-relaxed">
            Coordinate with our chief specialists and begin planning your dental transformation with digital precision today.
          </p>
        </div>

        {/* Action Button */}
        <div className="cta-content-fade pt-2">
          <Link
            href="/book"
            className="btn-accent inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-[0_10px_25px_rgba(66,82,66,0.3)] hover:-translate-y-0.5"
          >
            <CalendarCheck size={16} weight="fill" />
            <span>Book Your Consultation</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
