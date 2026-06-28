'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ImplantExperience() {
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

      // Step 1: Missing tooth to rotation
      tl.to('.implant-jaw', { rotate: -6, scale: 1.05, duration: 1 })
        .to('.step-1', { opacity: 0, y: -20, duration: 0.8 })
        
        // Step 2: Implant Appears & Inserts
        .fromTo('.step-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '<')
        .fromTo('.implant-screw', { opacity: 0, y: -100 }, { opacity: 1, y: 20, duration: 1.5, ease: 'power2.out' })
        .to('.step-2', { opacity: 0, y: -20, duration: 0.8 })

        // Step 3: Abutment Added
        .fromTo('.step-3', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '<')
        .fromTo('.implant-abutment', { opacity: 0, y: -80 }, { opacity: 1, y: 5, duration: 1.5, ease: 'power2.out' })
        .to('.step-3', { opacity: 0, y: -20, duration: 0.8 })

        // Step 4: Ceramic Crown Placed
        .fromTo('.step-4', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '<')
        .fromTo('.implant-crown', { opacity: 0, y: -80 }, { opacity: 1, y: -28, duration: 1.5, ease: 'power2.out' })
        .to('.step-4', { opacity: 0, y: -20, duration: 0.8 })

        // Step 5: Healthy Complete Smile
        .fromTo('.step-5', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '<')
        .to('.implant-glow', { opacity: 0.25, scale: 1.1, duration: 1.5, ease: 'sine.inOut' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[var(--color-bg-alt)] border-y border-[var(--color-border)]">
      <div ref={pinRef} className="sticky top-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden py-10">
        
        {/* Step Indicator Header */}
        <div className="absolute top-12 left-6 sm:left-12 lg:left-24 max-w-[320px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Scroll to Assemble
          </p>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight mt-1 text-[var(--color-ink)] font-display">
            Interactive Implant
          </h3>
          <p className="text-xs text-[var(--color-ink-muted)] mt-1">
            Observe the micro-engineering of dental replacement.
          </p>
        </div>

        {/* Narrative Description Side-Panel */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 lg:left-24 z-20 max-w-[340px] pointer-events-none">
          <div className="relative h-[120px] flex items-center">
            
            {/* Step 1 */}
            <div className="absolute step-1 space-y-2">
              <span className="font-mono text-xs text-[var(--color-gold)] font-bold">01 / MISSING TOOTH</span>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                Bone structure begins to resorb without constant stimulation. Preparing socket for anatomical implant.
              </p>
            </div>

            {/* Step 2 */}
            <div className="absolute step-2 space-y-2 opacity-0">
              <span className="font-mono text-xs text-[var(--color-gold)] font-bold">02 / IMPLANT INSERTION</span>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                A bio-compatible titanium thread is placed directly inside the jawbone, acting as a synthetic root.
              </p>
            </div>

            {/* Step 3 */}
            <div className="absolute step-3 space-y-2 opacity-0">
              <span className="font-mono text-xs text-[var(--color-gold)] font-bold">03 / ABUTMENT FIT</span>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                A titanium/gold-alloy connector (abutment) is fastened securely onto the implant core.
              </p>
            </div>

            {/* Step 4 */}
            <div className="absolute step-4 space-y-2 opacity-0">
              <span className="font-mono text-xs text-[var(--color-gold)] font-bold">04 / CROWN SEATING</span>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                An individually crafted ceramic crown is lowered and cemented onto the abutment post.
              </p>
            </div>

            {/* Step 5 */}
            <div className="absolute step-5 space-y-2 opacity-0">
              <span className="font-mono text-xs text-[var(--color-accent)] font-bold">05 / RESTORED HARMONY</span>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                The bite is fully restored. The crown matches the texture, color, and function of native dentition.
              </p>
            </div>

          </div>
        </div>

        {/* Dynamic Medical Visualizer (Center Canvas) */}
        <div className="relative w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] flex items-center justify-center bg-white rounded-[2rem] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-6">
          
          {/* Radial Glow Overlay */}
          <div className="absolute w-24 h-24 rounded-full bg-[var(--color-accent-light)] filter blur-2xl opacity-0 scale-75 implant-glow z-10" />

          {/* Assembly Group */}
          <div className="implant-jaw relative w-[240px] h-[280px] flex flex-col items-center justify-end origin-bottom transform-gpu">
            
            {/* Crown (Layer 4) */}
            <svg
              className="absolute implant-crown z-25 opacity-0 pointer-events-none filter drop-shadow-md"
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ top: '80px' }}
            >
              <path
                d="M15,40 Q15,10 50,10 Q85,10 85,40 C85,60 80,75 50,75 C20,75 15,60 15,40 Z"
                fill="url(#crownGradient)"
                stroke="oklch(0.9 0.01 80)"
                strokeWidth="1"
              />
              <path
                d="M30,35 Q50,45 70,35"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="crownGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#f7f5f2" />
                  <stop offset="100%" stopColor="#ded9d0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Abutment (Layer 3) */}
            <svg
              className="absolute implant-abutment z-20 opacity-0 pointer-events-none"
              width="36"
              height="40"
              viewBox="0 0 50 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ top: '135px' }}
            >
              <path
                d="M10,40 L15,10 L35,10 L40,40 L30,55 L20,55 Z"
                fill="url(#goldGradient)"
                stroke="oklch(0.68 0.05 85)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#dfca9b" />
                  <stop offset="60%" stopColor="#caa458" />
                  <stop offset="100%" stopColor="#9a7c39" />
                </linearGradient>
              </defs>
            </svg>

            {/* Screw Core (Layer 2) */}
            <svg
              className="absolute implant-screw z-15 opacity-0 pointer-events-none"
              width="30"
              height="65"
              viewBox="0 0 40 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ top: '160px' }}
            >
              <rect x="8" y="0" width="24" height="60" rx="4" fill="url(#titanium)" />
              {/* Thread ridges */}
              <line x1="5" y1="12" x2="35" y2="15" stroke="oklch(0.55 0.008 80)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="5" y1="22" x2="35" y2="25" stroke="oklch(0.55 0.008 80)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="5" y1="32" x2="35" y2="35" stroke="oklch(0.55 0.008 80)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="5" y1="42" x2="35" y2="45" stroke="oklch(0.55 0.008 80)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8" y1="52" x2="32" y2="55" stroke="oklch(0.55 0.008 80)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M8,60 L20,85 L32,60 Z" fill="url(#titanium)" />
              <defs>
                <linearGradient id="titanium" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8d9096" />
                  <stop offset="50%" stopColor="#cfd3da" />
                  <stop offset="100%" stopColor="#6e7075" />
                </linearGradient>
              </defs>
            </svg>

            {/* Jaw Bone & Surrounding Teeth (Layer 1 Base) */}
            <svg
              className="w-full h-full text-slate-100 z-10"
              viewBox="0 0 240 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Healthy Left Tooth */}
              <path
                d="M20,130 Q20,95 45,95 Q70,95 70,130 L75,170 C75,175 60,180 45,180 C30,180 20,175 20,170 Z"
                fill="url(#leftTooth)"
              />
              {/* Healthy Right Tooth */}
              <path
                d="M170,130 Q170,95 195,95 Q220,95 220,130 L220,170 C220,175 210,180 195,180 C180,180 170,175 170,170 Z"
                fill="url(#rightTooth)"
              />
              
              {/* Jawbone Structure */}
              <path
                d="M10,210 C10,210 50,212 90,212 C130,212 230,210 230,210 C230,230 220,270 120,270 C20,270 10,230 10,210 Z"
                fill="url(#boneGradient)"
              />

              {/* Gumline overlay */}
              <path
                d="M5,160 Q45,170 85,170 Q105,170 120,180 Q135,170 155,170 Q195,170 235,160 C235,170 230,212 120,212 C10,212 5,170 5,160 Z"
                fill="url(#gumGradient)"
              />

              <defs>
                <linearGradient id="leftTooth" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ebe7e0" />
                </linearGradient>
                <linearGradient id="rightTooth" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ebe7e0" />
                </linearGradient>
                <linearGradient id="boneGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eae7e0" />
                  <stop offset="100%" stopColor="#cfcabb" />
                </linearGradient>
                <linearGradient id="gumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5dbd9" />
                  <stop offset="40%" stopColor="#ecb8b3" />
                  <stop offset="100%" stopColor="#d3948e" />
                </linearGradient>
              </defs>
            </svg>

          </div>
        </div>

      </div>
    </div>
  );
}
