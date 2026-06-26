'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Envelope, Lock, SpinnerGap, WarningCircle, ShieldCheck } from '@phosphor-icons/react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message || 'Login failed. Please check your credentials.');
      setLoading(false);
      return;
    }

    router.replace('/admin/appointments');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="card w-full max-w-md p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-4"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            <ShieldCheck size={22} weight="fill" color="white" />
          </div>
          <h1 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            Admin Login
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-ink-muted)' }}>
            FMS Dental Dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg mb-5 text-sm"
            style={{ backgroundColor: 'var(--color-error-light)', color: 'var(--color-error)' }}
            role="alert">
            <WarningCircle size={16} weight="fill" className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="form-label">
                <span className="flex items-center gap-1.5">
                  <Envelope size={13} style={{ color: 'var(--color-primary)' }} />
                  Email Address
                </span>
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fmsdental.com"
                className="form-input"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="form-label">
                <span className="flex items-center gap-1.5">
                  <Lock size={13} style={{ color: 'var(--color-primary)' }} />
                  Password
                </span>
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="btn-primary w-full justify-center mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            id="admin-login-btn"
          >
            {loading ? (
              <>
                <SpinnerGap size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <p className="text-xs text-center mt-4" style={{ color: 'var(--color-ink-muted)' }}>
          Admin access only. Contact FMS IT for credentials.
        </p>
      </motion.div>
    </div>
  );
}
