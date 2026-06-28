'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const scenes = [
  {
    title: 'Digital Precision',
    subtitle: 'Every scanning detail captured in full 3D, down to 0.1 microns.',
    image: '/images/scanner.png',
  },
  {
    title: 'World-Class Technology',
    subtitle: 'Brushed steel dental instruments configured to your unique anatomy.',
    image: '/images/tools.png',
  },
  {
    title: 'Natural Results',
    subtitle: 'Healthy, radiant smiles designed to harmonize with your facial structure.',
    image: '/images/smile.png',
  },
];

export default function DigitalPrecision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: pinRef.current,
          pinSpacer: false as any,
        },
      });

      // Scene 2 reveal
      tl.to('.precision-panel-2', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 2,
        ease: 'power2.inOut',
      })
      .fromTo(
        '.precision-text-2',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
        '<0.5'
      )
      .to('.precision-text-1', { opacity: 0, y: -40, duration: 1 }, '<')

      // Scene 3 reveal
      .to('.precision-panel-3', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 2,
        ease: 'power2.inOut',
      })
      .fromTo(
        '.precision-text-3',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
        '<0.5'
      )
      .to('.precision-text-2', { opacity: 0, y: -40, duration: 1 }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      <div ref={pinRef} className="sticky top-0 w-full h-[100dvh] overflow-hidden">
        
        {/* Scene 1 (Base Panel) */}
        <div className="absolute inset-0 w-full h-full bg-slate-900">
          <img
            src={scenes[0].image}
            alt={scenes[0].title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute bottom-20 left-6 sm:left-12 lg:left-24 z-25 max-w-[500px] precision-text-1">
            <span className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.18em]">
              Scene One
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium text-white tracking-tight mt-2 font-display">
              {scenes[0].title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-3">
              {scenes[0].subtitle}
            </p>
          </div>
        </div>

        {/* Scene 2 (Middle Panel, Clip-path animated) */}
        <div
          className="absolute inset-0 w-full h-full bg-stone-900 precision-panel-2 z-20"
          style={{ clipPath: 'inset(100% 0% 0% 0%)', willChange: 'clip-path' }}
        >
          <img
            src={scenes[1].image}
            alt={scenes[1].title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute bottom-20 left-6 sm:left-12 lg:left-24 z-25 max-w-[500px] precision-text-2 opacity-0">
            <span className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.18em]">
              Scene Two
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium text-white tracking-tight mt-2 font-display">
              {scenes[1].title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-3">
              {scenes[1].subtitle}
            </p>
          </div>
        </div>

        {/* Scene 3 (Top Panel, Clip-path animated) */}
        <div
          className="absolute inset-0 w-full h-full bg-neutral-900 precision-panel-3 z-30"
          style={{ clipPath: 'inset(100% 0% 0% 0%)', willChange: 'clip-path' }}
        >
          <img
            src={scenes[2].image}
            alt={scenes[2].title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute bottom-20 left-6 sm:left-12 lg:left-24 z-25 max-w-[500px] precision-text-3 opacity-0">
            <span className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.18em]">
              Scene Three
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium text-white tracking-tight mt-2 font-display">
              {scenes[2].title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-3">
              {scenes[2].subtitle}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
