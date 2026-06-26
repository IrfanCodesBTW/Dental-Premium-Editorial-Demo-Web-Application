'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AppointmentWithPatient, AppointmentStatus } from '@/types';
import { getStatusColor } from '@/lib/helpers';
import fmsData from '@/lib/fmsData';
import { SignOut, FunnelSimple, ArrowClockwise, CalendarBlank, Buildings, CheckCircle } from '@phosphor-icons/react';

const STATUS_OPTIONS: { value: AppointmentStatus | ''; label: string }[] = [
  { value: '', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  new: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

export default function AdminAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<AppointmentWithPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | ''>('');
  const [clinicFilter, setClinicFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const { clinics_and_locations } = fmsData;

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace('/admin/login');
    });
  }, [router]);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    if (statusFilter) params.set('status', statusFilter);
    if (clinicFilter) params.set('clinic_id', clinicFilter);
    if (dateFrom) params.set('date_from', dateFrom);
    if (dateTo) params.set('date_to', dateTo);

    try {
      const res = await fetch(`/api/appointments?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        setError(data.error || 'Failed to load appointments');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, clinicFilter, dateFrom, dateTo]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id: string, status: AppointmentStatus) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  const getClinicName = (id: string) => clinics_and_locations.find((c) => c.id === id)?.area || id;
  const getServiceName = (id: string) => fmsData.services_and_treatments.find((s) => s.id === id)?.name || id;

  // Stats
  const stats = {
    total: appointments.length,
    new: appointments.filter((a) => a.status === 'new').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };

  return (
    <div className="container-fms py-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            Appointments
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
            {stats.total} total · {stats.new} new · {stats.confirmed} confirmed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchAppointments} className="btn-ghost text-sm" aria-label="Refresh appointments">
            <ArrowClockwise size={15} />
            Refresh
          </button>
          <button onClick={handleSignOut} className="btn-secondary text-sm">
            <SignOut size={15} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, color: 'var(--color-ink)' },
          { label: 'New', value: stats.new, color: 'var(--color-primary)' },
          { label: 'Confirmed', value: stats.confirmed, color: 'var(--color-success)' },
          { label: 'Completed', value: stats.completed, color: 'var(--color-ink-muted)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card p-4">
            <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color }}>
              {value}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FunnelSimple size={15} style={{ color: 'var(--color-ink-muted)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>Filters</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | '')}
            className="form-select text-sm"
            aria-label="Filter by status"
            id="status-filter"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select
            value={clinicFilter}
            onChange={(e) => setClinicFilter(e.target.value)}
            className="form-select text-sm"
            aria-label="Filter by clinic"
            id="admin-clinic-filter"
          >
            <option value="">All Clinics</option>
            {clinics_and_locations.map((c) => (
              <option key={c.id} value={c.id}>{c.area}</option>
            ))}
          </select>

          <div className="flex items-center gap-1.5">
            <CalendarBlank size={14} style={{ color: 'var(--color-ink-muted)' }} />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="form-input text-sm"
              aria-label="Date from"
              id="date-from"
            />
          </div>

          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="form-input text-sm"
            aria-label="Date to"
            id="date-to"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg mb-6 text-sm"
          style={{ backgroundColor: 'var(--color-error-light)', color: 'var(--color-error)' }}
          role="alert">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="card p-12 text-center">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
            style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="card p-12 text-center">
          <Buildings size={32} className="mx-auto mb-3" style={{ color: 'var(--color-ink-muted)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>No appointments found</p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-ink-muted)' }}>Try adjusting your filters</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Appointments table">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
                  {['Patient', 'Contact', 'Clinic', 'Treatment', 'Date', 'Time', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, i) => (
                  <tr key={appt.id}
                    style={{
                      borderBottom: i < appointments.length - 1 ? '1px solid var(--color-border)' : 'none',
                      backgroundColor: i % 2 === 0 ? 'white' : 'var(--color-bg)',
                    }}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-xs" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                        {appt.patient?.full_name || '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs" style={{ color: 'var(--color-ink-secondary)' }}>{appt.patient?.phone}</p>
                      {appt.patient?.email && (
                        <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>{appt.patient.email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs" style={{ color: 'var(--color-ink-secondary)' }}>{getClinicName(appt.clinic_id)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs" style={{ color: 'var(--color-ink-secondary)' }}>{getServiceName(appt.service_id)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs" style={{ color: 'var(--color-ink-secondary)' }}>
                        {new Date(appt.preferred_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs" style={{ color: 'var(--color-ink-secondary)' }}>{appt.preferred_time_slot}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge text-[10px] ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {STATUS_TRANSITIONS[appt.status].map((nextStatus) => (
                          <button
                            key={nextStatus}
                            onClick={() => updateStatus(appt.id, nextStatus)}
                            disabled={updating === appt.id}
                            className="text-[10px] font-semibold px-2 py-1 rounded-md border transition-colors disabled:opacity-50"
                            style={{
                              borderColor: nextStatus === 'cancelled' ? 'var(--color-error)' : 'var(--color-success)',
                              color: nextStatus === 'cancelled' ? 'var(--color-error)' : 'var(--color-success)',
                            }}
                            aria-label={`Mark as ${nextStatus}`}
                          >
                            {nextStatus === 'confirmed' && <CheckCircle size={10} className="inline mr-0.5" />}
                            {nextStatus}
                          </button>
                        ))}
                        {STATUS_TRANSITIONS[appt.status].length === 0 && (
                          <span className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
