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
    Restorative: 'oklch(0.52 0.14 200)',
    Advanced: 'oklch(0.52 0.14 280)',
    Specialised: 'oklch(0.52 0.12 320)',
  };

  const color = categoryColors[service.category] || 'var(--color-primary)';

  return (
    <motion.div
      className="card overflow-hidden group h-full flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image area */}
      <div
        className="h-44 relative overflow-hidden"
        style={{ backgroundColor: `${color}10` }}
      >
        <img
          src={`https://picsum.photos/seed/${service.image_keyword}/600/350`}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${color}20)` }} />
        <span
          className="absolute top-3 left-3 badge text-white text-[10px] font-semibold"
          style={{ backgroundColor: color }}
        >
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
          {service.name}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-ink-muted)' }}>
          {service.short_description}
        </p>

        {/* Ideal for bullets */}
        <ul className="space-y-1 mb-4">
          {service.ideal_for.slice(0, 2).map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--color-ink-secondary)' }}>
              <CheckCircle size={12} weight="fill" className="shrink-0 mt-0.5" style={{ color: color }} />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={`/services/${service.id}`}
          className="btn-secondary text-xs w-full justify-between mt-auto"
          aria-label={`View details for ${service.name}`}
        >
          View Details
          <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}
