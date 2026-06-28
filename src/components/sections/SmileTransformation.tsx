'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SmileTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: pinRef.current,
          pinSpacer: false as any,
          onUpdate: (self) => {
            // self.progress goes from 0 to 1
            // Map progress to translate from 100% (before only) to 0% (after only)
            const percentage = (1 - self.progress) * 100;
            if (sliderRef.current) {
              sliderRef.current.style.setProperty('--split-pos', `${percentage}%`);
            }
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-black">
      <div ref={pinRef} className="sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        
        {/* Floating Headers */}
        <div className="absolute top-12 left-6 sm:left-12 lg:left-24 z-30 max-w-[340px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Aesthetic Shift
          </p>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight mt-1 text-white font-display">
            Smile Makeover
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Scroll to reveal the restorative transition.
          </p>
        </div>

        {/* Labels left/right */}
        <div className="absolute bottom-12 left-12 z-30 font-mono text-[10px] text-white/50 tracking-widest uppercase">
          Before Treatment
        </div>
        <div className="absolute bottom-12 right-12 z-30 font-mono text-[10px] text-[var(--color-gold)] tracking-widest uppercase">
          After Makeover
        </div>

        {/* Before/After Split Viewer Container */}
        <div
          ref={sliderRef}
          className="relative w-full max-w-[900px] aspect-[16/9] rounded-[18px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          style={{ '--split-pos': '100%' } as React.CSSProperties}
        >
          {/* Base: Before Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/images/before.png"
              alt="Before treatment dental smile discolored"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Overlay: After Image (clipped from left based on split-pos) */}
          <div
            className="absolute inset-0 w-full h-full z-20"
            style={{
              clipPath: 'polygon(var(--split-pos) 0%, 100% 0%, 100% 100%, var(--split-pos) 100%)',
              willChange: 'clip-path',
            }}
          >
            <img
              src="/images/after.png"
              alt="After treatment perfect white smile aligned"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* Sliding Divider Bar */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] bg-[var(--color-gold)] z-25 shadow-[0_0_10px_rgba(218,202,155,0.8)] pointer-events-none"
            style={{
              left: 'var(--split-pos)',
              transform: 'translateX(-50%)',
              willChange: 'left',
            }}
          >
            {/* Elegant glass knob in middle of divider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
