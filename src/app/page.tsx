import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ScrollStory from '@/components/sections/ScrollStory';
import DigitalPrecision from '@/components/sections/DigitalPrecision';
import ImplantExperience from '@/components/sections/ImplantExperience';
import SmileTransformation from '@/components/sections/SmileTransformation';
import DoctorReveal from '@/components/sections/DoctorReveal';
import TechnologyShowcase from '@/components/sections/TechnologyShowcase';
import ClinicWalkthrough from '@/components/sections/ClinicWalkthrough';
import CinematicTestimonials from '@/components/sections/CinematicTestimonials';
import CinematicCTA from '@/components/sections/CinematicCTA';

export const metadata: Metadata = {
  title: 'FMS Dental — World-Class Dental Implants & Smile Makeovers in Hyderabad',
  description:
    'FMS Dental: Hyderabad\'s top NABH-accredited dental group with 6 clinics. Expert dental implants, smile makeovers, Invisalign & full mouth rehabilitation. Book online.',
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-[var(--color-bg)]">
      {/* Section 01: Hero video loop */}
      <HeroSection />

      {/* Section 02: Pinned GSAP Scroll Story */}
      <ScrollStory />

      {/* Section 03: Digital Precision showcase */}
      <DigitalPrecision />

      {/* Section 04: Pinned Scroll-controlled Implant Experience */}
      <ImplantExperience />

      {/* Section 05: Before/After Smile Transformation Split View */}
      <SmileTransformation />

      {/* Section 06: Vogue-style Doctor Reveal */}
      <DoctorReveal />

      {/* Section 07: Dark Fullscreen Technology Showcase */}
      <TechnologyShowcase />

      {/* Section 08: Luxury Clinic Walkthrough */}
      <ClinicWalkthrough />

      {/* Section 09: Cinematic Testimonial reel */}
      <CinematicTestimonials />

      {/* Section 10: Warm Sunset Final CTA */}
      <CinematicCTA />
    </div>
  );
}
