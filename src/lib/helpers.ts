import { AppointmentStatus } from '@/types';

/**
 * Format a date string to a readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a time slot value to a readable label
 */
export function formatTimeSlot(value: string): string {
  const [hours, minutes] = value.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Get status badge color classes
 */
export function getStatusColor(status: AppointmentStatus): string {
  switch (status) {
    case 'new':
      return 'bg-blue-50 text-blue-700 ring-1 ring-blue-200';
    case 'confirmed':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'completed':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
    case 'cancelled':
      return 'bg-red-50 text-red-600 ring-1 ring-red-200';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

/**
 * Get today's date as YYYY-MM-DD string (min date for booking)
 */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get minimum booking date (tomorrow)
 */
export function getMinBookingDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

/**
 * Get max booking date (90 days from today)
 */
export function getMaxBookingDate(): string {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  return maxDate.toISOString().split('T')[0];
}

/**
 * Validate phone number (basic Indian format)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned) || /^\d{10,12}$/.test(cleaned);
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
