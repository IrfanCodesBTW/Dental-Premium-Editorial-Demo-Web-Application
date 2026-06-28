'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { CalendarCheck, Phone, ShieldCheck } from '@phosphor-icons/react';
import gsap from 'gsap';
import fmsData from '@/lib/fmsData';

export default function HeroSection() {
  const { contact_and_appointment_info } = fmsData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade and slide content up sequentially
      gsap.fromTo(
        '.hero-animate',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      // Subtly scale the video down or up on scroll
      gsap.to(videoRef.current, {
        scale: 1.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[95dvh] flex items-center justify-start overflow-hidden bg-black text-white"
    >
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 scale-100 will-change-transform"
        >
          <source src="/videos/Hero_Film.mp4" type="video/mp4" />
        </video>
        {/* Soft elegant vignette / gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-black/30" />
      </div>

      <div className="container-fms relative z-10 w-full">
        <div className="max-w-[700px] space-y-6">
          {/* Trust Badge */}
          <div className="hero-animate inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-[10px] font-semibold uppercase tracking-wider">
            <ShieldCheck size={14} weight="fill" className="text-[var(--color-accent)]" />
            <span>NABH Accredited · GCR TOP 10 Clinic Group</span>
          </div>

          {/* Headline */}
          <h1
            className="hero-animate text-4xl sm:text-5xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.035em' }}
          >
            Precisely Crafted <br />
            <span className="text-[var(--color-accent)] font-semibold">Dental Masterpieces</span>
          </h1>

          {/* Description */}
          <p className="hero-animate text-sm sm:text-base text-slate-300 leading-relaxed max-w-[48ch]">
            From dental implants and advanced smile makeovers to Invisalign — FMS Dental delivers world-class precision across 6 clinics in Hyderabad. Serving patients from 45+ countries.
          </p>

          {/* CTAs */}
          <div className="hero-animate flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/book" className="btn-accent flex items-center justify-center gap-2 group text-white">
              <CalendarCheck size={16} weight="fill" className="transition-transform duration-300 group-hover:scale-110" />
              <span>Schedule Consultation</span>
            </Link>
            <a
              href={`tel:${contact_and_appointment_info.primary_phone}`}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-xs tracking-wide transition-all duration-300 border border-white/20 hover:border-white text-white bg-white/5 hover:bg-white/10 select-none uppercase"
              aria-label={`Call FMS Dental at ${contact_and_appointment_info.primary_phone}`}
            >
              <Phone size={14} weight="fill" className="text-[var(--color-accent)]" />
              <span>{contact_and_appointment_info.primary_phone}</span>
            </a>
          </div>

          {/* Mini credentials badges */}
          <div className="hero-animate pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left max-w-[500px]">
            <div>
              <p className="font-mono text-xl font-bold text-[var(--color-accent)]">20+</p>
              <p className="text-[9px] uppercase font-semibold tracking-wider text-slate-400 mt-1">Years Clinical Excellence</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-[var(--color-accent)]">50K+</p>
              <p className="text-[9px] uppercase font-semibold tracking-wider text-slate-400 mt-1">Happy Patients</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-[var(--color-accent)]">4.9★</p>
              <p className="text-[9px] uppercase font-semibold tracking-wider text-slate-400 mt-1">Google Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
