import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Cockpit — FMS Dental',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] flex flex-col font-body">
      {/* Admin header */}
      <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-fms h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-display)' }}>FMS</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              FMS Admin Cockpit
            </span>
          </div>
          <a href="/" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-[var(--color-primary)] transition-colors">
            ← Exit Cockpit
          </a>
        </div>
      </header>
      <main className="flex-1 bg-[var(--color-bg-alt)]/50">{children}</main>
    </div>
  );
}
