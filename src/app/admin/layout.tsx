import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — FMS Dental',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      {/* Admin header */}
      <header className="border-b bg-white" style={{ borderColor: 'var(--color-border)' }}>
        <div className="container-fms h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-display)' }}>FMS</span>
            </div>
            <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              FMS Dental Admin
            </span>
          </div>
          <a href="/" className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            ← Back to site
          </a>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
