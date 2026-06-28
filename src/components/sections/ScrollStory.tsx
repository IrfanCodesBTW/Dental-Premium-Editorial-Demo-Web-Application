'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: '.story-pin',
          pinSpacer: false as any, // Using Lenis + custom layout pin spacer
        },
      });

      // Timeline sequences
      tl.to(text1Ref.current, { opacity: 0, y: -30, duration: 1.5, ease: 'sine.inOut' })
        
        .fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: 'sine.inOut' })
        .to(text2Ref.current, { opacity: 0, y: -30, duration: 1.5, ease: 'sine.inOut', delay: 0.5 })

        .fromTo(text3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: 'sine.inOut' })
        .to(videoRef.current, { opacity: 0.5, scale: 1.06, duration: 2.5, ease: 'sine.inOut' }, '<')
        .to(text3Ref.current, { opacity: 0, y: -30, duration: 1.5, ease: 'sine.inOut', delay: 0.5 })

        .fromTo(text4Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2.0, ease: 'sine.inOut' })
        .to(videoRef.current, { opacity: 0.8, scale: 1.12, duration: 3.0, ease: 'sine.inOut' }, '<');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <div className="story-pin sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Microscope Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-15 scale-100 will-change-transform"
          >
            <source src="/videos/Smile_and_dental_microscope.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        {/* Story Text Frames */}
        <div className="relative z-10 w-full max-w-[800px] text-center px-6">
          <div className="relative h-[250px] flex items-center justify-center">
            
            {/* Frame 1 */}
            <div
              ref={text1Ref}
              className="absolute text-4xl sm:text-5xl lg:text-6xl font-light text-white/90 tracking-wide"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              Every smile
            </div>

            {/* Frame 2 */}
            <div
              ref={text2Ref}
              className="absolute text-4xl sm:text-5xl lg:text-6xl font-light text-white/90 tracking-wide opacity-0"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              starts with
            </div>

            {/* Frame 3 */}
            <div
              ref={text3Ref}
              className="absolute text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--color-gold)] tracking-wide opacity-0"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              confidence.
            </div>

            {/* Frame 4 */}
            <div
              ref={text4Ref}
              className="absolute text-3xl sm:text-4xl lg:text-5xl font-light text-white/90 tracking-wide leading-snug opacity-0 max-w-[22ch]"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
            >
              Confidence <br />
              starts with <span className="text-[var(--color-accent)] font-semibold">precision.</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
