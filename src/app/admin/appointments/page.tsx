'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AppointmentWithPatient, AppointmentStatus } from '@/types';
import { getStatusColor } from '@/lib/helpers';
import fmsData from '@/lib/fmsData';
import { SignOut, FunnelSimple, ArrowClockwise, CalendarBlank, Buildings, CheckCircle, Warning, SpinnerGap } from '@phosphor-icons/react';

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
      setError('Network error. Failed to retrieve dataset.');
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

  // Statistics
  const stats = {
    total: appointments.length,
    new: appointments.filter((a) => a.status === 'new').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };

  return (
    <div className="container-fms py-10 space-y-8 select-none">
      {/* Page Header Cockpit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-xl font-semibold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Clinical Registry
          </h1>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 font-mono">
            <span>{stats.total} logged</span>
            <span>·</span>
            <span className="text-[var(--color-primary)]">{stats.new} pending</span>
            <span>·</span>
            <span className="text-emerald-500">{stats.confirmed} active</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchAppointments} 
            className="btn-secondary text-[9px] font-bold tracking-wider py-2.5 px-4 flex items-center gap-1.5 hover:bg-slate-50"
            aria-label="Sync registry data"
          >
            <ArrowClockwise size={12} />
            <span>Sync</span>
          </button>
          <button 
            onClick={handleSignOut} 
            className="btn-primary text-[9px] font-bold tracking-wider py-2.5 px-4 flex items-center gap-1.5"
          >
            <SignOut size={12} />
            <span>Lock Console</span>
          </button>
        </div>
      </div>

      {/* Cockpit Numerical Stats Row (Desaturated, no boxes) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
        {[
          { label: 'Total Enquiries', value: stats.total, color: 'text-slate-700' },
          { label: 'Pending Review', value: stats.new, color: 'text-[var(--color-primary)]' },
          { label: 'Confirmed Slots', value: stats.confirmed, color: 'text-emerald-600' },
          { label: 'Completed Care', value: stats.completed, color: 'text-slate-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="border-l border-[var(--color-border)] pl-4 py-1.5">
            <p className={`text-2xl font-bold font-mono ${color} leading-none`}>
              {value}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-2">{label}</p>
          </div>
        ))}
      </div>

      {/* Advanced Filter Panel */}
      <div className="card p-5 border border-[var(--color-border)] bg-white">
        <div className="flex items-center gap-2 mb-4">
          <FunnelSimple size={15} className="text-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink)]">Query Filters</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | '')}
            className="form-select text-xs font-semibold tracking-wide uppercase py-3.5 pl-4 pr-10"
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
            className="form-select text-xs font-semibold tracking-wide uppercase py-3.5 pl-4 pr-10"
            aria-label="Filter by clinic"
            id="admin-clinic-filter"
          >
            <option value="">All Clinics</option>
            {clinics_and_locations.map((c) => (
              <option key={c.id} value={c.id}>{c.area}</option>
            ))}
          </select>

          <div className="relative">
            <CalendarBlank size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="form-input text-xs pl-11 py-3.5 font-semibold uppercase tracking-wide"
              aria-label="Start date filter"
              id="date-from"
            />
          </div>

          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="form-input text-xs py-3.5 font-semibold uppercase tracking-wide"
            aria-label="End date filter"
            id="date-to"
          />
        </div>
      </div>

      {/* Error Output banner */}
      {error && (
        <div className="p-4 rounded-xl text-xs font-semibold uppercase tracking-wide bg-red-50 text-red-700 border border-red-100 flex items-center gap-2" role="alert">
          <Warning size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Data Table Grid */}
      {loading ? (
        <div className="card py-20 text-center border border-[var(--color-border)]">
          <SpinnerGap size={24} className="animate-spin text-[var(--color-primary)] mx-auto mb-3" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Syncing registry dataset...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="card py-20 text-center border border-[var(--color-border)] space-y-2">
          <Buildings size={28} className="mx-auto text-slate-300" />
          <p className="text-xs font-semibold text-[var(--color-ink)]">No Registry Rows Located</p>
          <p className="text-[9px] uppercase tracking-wider text-slate-400">Adjust the filters above</p>
        </div>
      ) : (
        <div className="card border border-[var(--color-border)] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left" aria-label="Appointments Table Console">
              <thead>
                <tr className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
                  {['Patient Name', 'Contact Info', 'Clinic Branch', 'Treatment Needed', 'Date Requested', 'Preferred Slot', 'Current Status', 'Status Updates'].map((h) => (
                    <th key={h} className="px-5 py-4 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-xs">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Patient Name */}
                    <td className="px-5 py-4 font-semibold text-[var(--color-ink)]">
                      {appt.patient?.full_name || '—'}
                    </td>
                    
                    {/* Contact details */}
                    <td className="px-5 py-4 font-mono text-slate-500 leading-snug">
                      <div>{appt.patient?.phone}</div>
                      {appt.patient?.email && (
                        <div className="text-[9px] text-slate-400 lowercase">{appt.patient.email}</div>
                      )}
                    </td>
                    
                    {/* Clinic Branch */}
                    <td className="px-5 py-4 text-slate-600 font-medium">
                      {getClinicName(appt.clinic_id)}
                    </td>
                    
                    {/* Treatment */}
                    <td className="px-5 py-4 text-slate-600 font-medium">
                      {getServiceName(appt.service_id)}
                    </td>
                    
                    {/* Date */}
                    <td className="px-5 py-4 font-mono text-slate-500">
                      {new Date(appt.preferred_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    
                    {/* Time Slot */}
                    <td className="px-5 py-4 font-mono text-slate-500">
                      {appt.preferred_time_slot}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <span className={`badge text-[9px] tracking-widest uppercase font-bold py-1 px-3 ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    
                    {/* Action Transitions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {STATUS_TRANSITIONS[appt.status].map((nextStatus) => (
                          <button
                            key={nextStatus}
                            onClick={() => updateStatus(appt.id, nextStatus)}
                            disabled={updating === appt.id}
                            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full border transition-all duration-300 disabled:opacity-50"
                            style={{
                              borderColor: nextStatus === 'cancelled' ? 'var(--color-error)' : 'var(--color-success)',
                              color: nextStatus === 'cancelled' ? 'var(--color-error)' : 'var(--color-success)',
                            }}
                            aria-label={`Mark as ${nextStatus}`}
                          >
                            {nextStatus === 'confirmed' && <CheckCircle size={10} className="inline mr-1" />}
                            <span>{nextStatus}</span>
                          </button>
                        ))}
                        {STATUS_TRANSITIONS[appt.status].length === 0 && (
                          <span className="text-[10px] font-mono text-slate-400">—</span>
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
