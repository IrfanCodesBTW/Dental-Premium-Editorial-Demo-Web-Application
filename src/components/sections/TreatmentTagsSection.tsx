'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import fmsData from '@/lib/fmsData';

export default function TreatmentTagsSection() {
  const [active, setActive] = useState<string | null>(null);
  const { treatment_tags } = fmsData.tagging_dimensions;

  return (
    <section className="py-10 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="container-fms">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--color-ink-muted)' }}>
            Browse by:
          </span>
          {treatment_tags.map((tag, i) => (
            <motion.div
              key={tag.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                href={`/services?tag=${tag.id}`}
                onClick={() => setActive(tag.id)}
                className={`pill shrink-0 ${active === tag.id ? 'active' : ''}`}
              >
                {tag.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
