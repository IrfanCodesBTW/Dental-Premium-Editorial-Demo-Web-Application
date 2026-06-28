'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const categoryColors: Record<string, string> = {
    Implants: 'var(--color-primary)',
    Cosmetic: 'var(--color-accent)',
    Orthodontics: 'var(--color-gold)',
    Restorative: 'oklch(0.52 0.08 200)',
    Advanced: 'oklch(0.52 0.08 280)',
    Specialised: 'oklch(0.52 0.06 320)',
  };

  const color = categoryColors[service.category] || 'var(--color-primary)';

  return (
    <div className="card group h-full flex flex-col bg-white">
      {/* Image container with Spruce gradient overlap */}
      <div
        className="h-48 relative overflow-hidden"
        style={{ backgroundColor: `${color}08` }}
      >
        <img
          src={`https://picsum.photos/seed/${service.image_keyword}/600/350`}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-105"
          loading="lazy"
        />
        {/* Soft luxury linear shade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/50 via-[var(--color-ink)]/10 to-transparent pointer-events-none" />
        
        {/* Desaturated category badge */}
        <span
          className="absolute top-4 left-4 badge text-white text-[9px] font-semibold tracking-wider uppercase py-1 px-3 rounded-full"
          style={{ backgroundColor: color }}
        >
          {service.category}
        </span>
      </div>

      {/* Card body content */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {service.name}
          </h3>
          <p className="text-xs leading-relaxed text-slate-500 line-clamp-3">
            {service.short_description}
          </p>
        </div>

        {/* Benefits bullets list */}
        <ul className="space-y-1.5 pt-2 border-t border-[var(--color-border)]">
          {service.ideal_for.slice(0, 2).map((item) => (
            <li key={item} className="flex items-start gap-2 text-[10px] text-slate-600 font-medium">
              <CheckCircle size={13} weight="fill" className="shrink-0 mt-0.5" style={{ color: color }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Action button at bottom */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/services/${service.id}`}
            className="btn-secondary text-[10px] font-bold tracking-widest uppercase py-3 px-5 w-full justify-between items-center group-hover:border-[var(--color-primary)] transition-all duration-300"
            aria-label={`View details for ${service.name}`}
          >
            <span>View Details</span>
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
