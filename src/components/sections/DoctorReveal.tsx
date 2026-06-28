'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const doctors = [
  {
    name: 'Dr. Pradeep Sharma',
    designation: 'Chief Implantologist & Oral Surgeon',
    experience: '22 Years of Artistry',
    quote: '“Form follows function, but a smile is where art matches science.”',
    image: '/images/dr_pradeep.png',
  },
  {
    name: 'Dr. Kavitha Reddy',
    designation: 'Senior Cosmetic & Aesthetic Dentist',
    experience: '16 Years of Refinement',
    quote: '“A smile design is not just cosmetic; it is an architectural restoration of confidence.”',
    image: '/images/dr_kavitha.png',
  },
  {
    name: 'Dr. Anjali Mehta',
    designation: 'Consultant Orthodontist',
    experience: '14 Years of Precision',
    quote: '“Precision alignment unlocks the natural symmetry of the human face.”',
    image: '/images/dr_anjali.png',
  },
];

export default function DoctorReveal() {
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

      // Initially zoom the first portrait slowly
      gsap.to('.doc-img-1', {
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '33% top',
          scrub: true,
        },
      });

      // Transition to Doctor 2 (Fade panel + blur portrait)
      tl.to('.doc-panel-1', { opacity: 0, duration: 1.5, ease: 'sine.inOut' })
        .to('.doc-img-1', { filter: 'blur(12px)', duration: 1.2 }, '<')
        .fromTo('.doc-panel-2', { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, '<')
        .fromTo('.doc-img-2', { filter: 'blur(12px)' }, { filter: 'blur(0px)', scale: 1.1, duration: 2.5, ease: 'sine.out' }, '<')
        
        // Transition to Doctor 3
        .to('.doc-panel-2', { opacity: 0, duration: 1.5, ease: 'sine.inOut' })
        .to('.doc-img-2', { filter: 'blur(12px)', duration: 1.2 }, '<')
        .fromTo('.doc-panel-3', { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, '<')
        .fromTo('.doc-img-3', { filter: 'blur(12px)' }, { filter: 'blur(0px)', scale: 1.1, duration: 2.5, ease: 'sine.out' }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[var(--color-bg)]">
      <div ref={pinRef} className="sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        
        {/* Doctor 1 */}
        <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 px-6 sm:px-12 lg:px-24 doc-panel-1">
          <div className="w-[280px] sm:w-[360px] aspect-[3/4] rounded-[20px] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-card)]">
            <img
              src={doctors[0].image}
              alt={doctors[0].name}
              className="w-full h-full object-cover doc-img-1 scale-100 will-change-transform"
            />
          </div>
          <div className="max-w-[400px] text-left space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {doctors[0].experience}
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-ink)] font-display">
              {doctors[0].name}
            </h2>
            <p className="text-xs uppercase font-medium tracking-wider text-[var(--color-accent)]">
              {doctors[0].designation}
            </p>
            <blockquote className="text-base sm:text-lg italic text-[var(--color-ink-secondary)] leading-relaxed pt-2">
              {doctors[0].quote}
            </blockquote>
          </div>
        </div>

        {/* Doctor 2 */}
        <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 px-6 sm:px-12 lg:px-24 doc-panel-2 opacity-0 pointer-events-none md:pointer-events-auto">
          <div className="w-[280px] sm:w-[360px] aspect-[3/4] rounded-[20px] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-card)]">
            <img
              src={doctors[1].image}
              alt={doctors[1].name}
              className="w-full h-full object-cover doc-img-2 scale-100 will-change-transform"
            />
          </div>
          <div className="max-w-[400px] text-left space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {doctors[1].experience}
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-ink)] font-display">
              {doctors[1].name}
            </h2>
            <p className="text-xs uppercase font-medium tracking-wider text-[var(--color-accent)]">
              {doctors[1].designation}
            </p>
            <blockquote className="text-base sm:text-lg italic text-[var(--color-ink-secondary)] leading-relaxed pt-2">
              {doctors[1].quote}
            </blockquote>
          </div>
        </div>

        {/* Doctor 3 */}
        <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 px-6 sm:px-12 lg:px-24 doc-panel-3 opacity-0 pointer-events-none md:pointer-events-auto">
          <div className="w-[280px] sm:w-[360px] aspect-[3/4] rounded-[20px] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-card)]">
            <img
              src={doctors[2].image}
              alt={doctors[2].name}
              className="w-full h-full object-cover doc-img-3 scale-100 will-change-transform"
            />
          </div>
          <div className="max-w-[400px] text-left space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {doctors[2].experience}
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-ink)] font-display">
              {doctors[2].name}
            </h2>
            <p className="text-xs uppercase font-medium tracking-wider text-[var(--color-accent)]">
              {doctors[2].designation}
            </p>
            <blockquote className="text-base sm:text-lg italic text-[var(--color-ink-secondary)] leading-relaxed pt-2">
              {doctors[2].quote}
            </blockquote>
          </div>
        </div>

      </div>
    </div>
  );
}
