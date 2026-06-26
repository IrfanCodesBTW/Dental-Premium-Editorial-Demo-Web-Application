'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { List, X, Phone, CalendarCheck } from '@phosphor-icons/react';
import fmsData from '@/lib/fmsData';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/clinics', label: 'Clinics' },
  { href: '/doctors', label: 'Doctors' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isAdmin = pathname?.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-fms">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="FMS Dental Home">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 group-hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>FMS</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                  FMS Dental
                </span>
                <span className="text-[10px] font-medium tracking-wide" style={{ color: 'var(--color-ink-muted)' }}>
                  NABH Accredited
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link px-3 py-2 rounded-md ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${fmsData.contact_and_appointment_info.primary_phone}`}
                className="btn-ghost text-xs"
                aria-label="Call FMS Dental"
              >
                <Phone size={14} weight="fill" />
                {fmsData.contact_and_appointment_info.primary_phone}
              </a>
              <Link href="/book" className="btn-primary text-xs px-4 py-2">
                <CalendarCheck size={14} weight="fill" />
                Book Appointment
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md transition-colors"
              style={{ color: 'var(--color-ink-secondary)' }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-96 border-t border-[var(--color-border)]' : 'max-h-0'
          }`}
          style={{ backgroundColor: 'white' }}
        >
          <nav className="container-fms py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary-muted)]'
                    : 'text-[var(--color-ink-secondary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
              <a
                href={`tel:${fmsData.contact_and_appointment_info.primary_phone}`}
                className="btn-secondary text-sm w-full"
              >
                <Phone size={15} weight="fill" />
                Call Now
              </a>
              <Link href="/book" className="btn-primary text-sm w-full">
                <CalendarCheck size={15} weight="fill" />
                Book Appointment
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer for fixed nav */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
