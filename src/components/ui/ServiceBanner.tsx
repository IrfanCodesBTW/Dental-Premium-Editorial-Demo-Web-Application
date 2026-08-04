'use client';

import { useState } from 'react';

interface ServiceBannerProps {
  imageUrl?: string;
  name: string;
  category: string;
}

export default function ServiceBanner({ imageUrl, name, category }: ServiceBannerProps) {
  const [imageError, setImageError] = useState(!imageUrl);

  const categoryColors: Record<string, string> = {
    Implants: 'var(--color-primary)',
    Cosmetic: 'var(--color-accent)',
    Orthodontics: 'var(--color-gold)',
    Restorative: 'oklch(0.52 0.08 200)',
    Advanced: 'oklch(0.52 0.08 280)',
    Specialised: 'oklch(0.52 0.06 320)',
  };

  const color = categoryColors[category] || 'var(--color-primary)';

  return (
    <div className="rounded-3xl overflow-hidden shadow-sm border border-[var(--color-border)] aspect-[21/9] bg-slate-100 relative">
      {imageError ? (
        <div 
          className="w-full h-full flex items-center justify-center text-white select-none"
          style={{ 
            background: `linear-gradient(135deg, ${color} 0%, oklch(from ${color} calc(l - 0.15) c h) 100%)` 
          }}
        >
          <span className="text-7xl sm:text-8xl font-light tracking-wider font-serif uppercase opacity-85">
            {name.charAt(0)}
          </span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover grayscale brightness-95"
          loading="eager"
        />
      )}
    </div>
  );
}
