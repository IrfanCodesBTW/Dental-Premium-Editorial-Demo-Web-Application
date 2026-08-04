'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const steps = [
  {
    label: 'Entrance & Façade',
    description: 'Calm architectural lines set in warm morning sunlight.',
    transform: 'scale(1) translate(0px, 0px)',
  },
  {
    label: 'Reception & Lounge',
    description: 'Ivory stone counters, soft ambient acoustics, and walnut partitions.',
    transform: 'scale(1.1) translate(-30px, -15px)',
  },
  {
    label: 'Consultation Room',
    description: 'Muted discussion suites equipped with high-contrast diagnostic screens.',
    transform: 'scale(1.15) translate(20px, 10px)',
  },
  {
    label: 'Advanced Treatment Room',
    description: 'Micro-precision machinery and ergonomic design supporting total comfort.',
    transform: 'scale(1.2) translate(-10px, -25px)',
  },
];

export default function ClinicWalkthrough() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

      // Step-by-step camera glide on the single source graphic + metadata fades
      steps.forEach((step, idx) => {
        if (idx === 0) return;
        
        // Glide the camera coordinate
        tl.to('.walkthrough-canvas', {
          transform: step.transform,
          duration: 2,
          ease: 'power1.inOut',
        })
        // Fade the description layers
        .to(`.walkthrough-desc-${idx - 1}`, { opacity: 0, y: -20, duration: 1 }, '<')
        .fromTo(`.walkthrough-desc-${idx}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, '<0.5');
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[var(--color-bg)]">
      <div ref={pinRef} className="sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        
        {/* Fullscreen Architectural Viewer Frame */}
        <div className="absolute inset-0 w-full h-full">
          <div className="walkthrough-canvas w-full h-full transition-transform duration-300 will-change-transform transform-gpu">
            <img
              src="/images/clinic_walkthrough.png"
              alt="Luxury Dental Clinic Architectural Walkthrough"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle editorial overlays and shades */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>

        {/* Floating Controls / Description Box */}
        <div className="absolute bottom-20 left-6 sm:left-12 lg:left-24 z-20 w-[calc(100vw-3rem)] sm:w-[380px] bg-black/35 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/5 shadow-xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Architectural Walkthrough
          </span>
          
          <div className="relative h-[120px] mt-2">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex flex-col justify-start space-y-1.5 transition-opacity ${
                  idx === 0 ? 'walkthrough-desc-0' : `walkthrough-desc-${idx} opacity-0`
                }`}
              >
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-display">
                  {step.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
