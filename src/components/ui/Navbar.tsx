'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { List, X, Phone, CalendarCheck } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)] ${
          scrolled
            ? 'top-4 mx-auto w-[90%] max-w-[900px] rounded-full border border-white/50 bg-white/80 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] px-4 h-14'
            : 'top-0 w-full bg-white/60 backdrop-blur-sm border-b border-transparent px-0 h-16'
        }`}
      >
        <div className="container-fms h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="FMS Dental Home">
            <motion.div 
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
              style={{ backgroundColor: 'var(--color-primary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-display)' }}>FMS</span>
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                FMS Dental
              </span>
              <span className="text-[9px] font-medium tracking-wider" style={{ color: 'var(--color-ink-muted)' }}>
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
                className={`nav-link px-3.5 py-1.5 text-xs tracking-wider transition-all duration-300 ${
                  pathname === link.href ? 'active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${fmsData.contact_and_appointment_info.primary_phone}`}
              className="btn-ghost text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1.5"
              aria-label="Call FMS Dental"
            >
              <Phone size={12} weight="fill" style={{ color: 'var(--color-accent)' }} />
              {fmsData.contact_and_appointment_info.primary_phone}
            </a>
            <Link href="/book" className="btn-primary text-[10px] tracking-wider px-5 py-2.5">
              <CalendarCheck size={12} weight="fill" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
            style={{ color: 'var(--color-ink-secondary)' }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t absolute top-[100%] left-0 right-0 rounded-2xl shadow-xl z-40 bg-white"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <nav className="px-6 py-5 flex flex-col gap-1.5" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      pathname === link.href
                        ? 'text-[var(--color-primary)] bg-[var(--color-primary-muted)]'
                        : 'text-[var(--color-ink-secondary)] hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex flex-col gap-2">
                  <a
                    href={`tel:${fmsData.contact_and_appointment_info.primary_phone}`}
                    className="btn-secondary text-xs w-full py-3"
                  >
                    <Phone size={13} weight="fill" />
                    Call Now
                  </a>
                  <Link href="/book" className="btn-primary text-xs w-full py-3">
                    <CalendarCheck size={13} weight="fill" />
                    Book Appointment
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent layout overlap */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
