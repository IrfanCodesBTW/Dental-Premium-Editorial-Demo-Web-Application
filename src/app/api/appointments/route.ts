import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServiceClient } from '@/lib/supabase';
import { BookingFormData } from '@/types';

/**
 * POST /api/appointments
 * Creates a new Patient (or finds existing) and inserts an Appointment.
 * Performs conflict check before inserting.
 */
export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json();

    // Basic server-side validation
    if (!body.full_name || !body.phone || !body.preferred_branch || !body.treatment_interest || !body.preferred_date || !body.time_slot) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // ── Step 1: Conflict Check ────────────────────────────────
    // Check if the same clinic/date/slot is already booked (non-cancelled)
    const { data: conflicting, error: conflictError } = await supabase
      .from('appointments')
      .select('id')
      .eq('clinic_id', body.preferred_branch)
      .eq('preferred_date', body.preferred_date)
      .eq('preferred_time_slot', body.time_slot)
      .neq('status', 'cancelled')
      .limit(1);

    if (conflictError) {
      console.error('Conflict check error:', conflictError);
      return NextResponse.json(
        { success: false, error: 'Could not check availability. Please try again.' },
        { status: 500 }
      );
    }

    if (conflicting && conflicting.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'This time slot is already booked at the selected clinic. Please choose a different date or time.',
        },
        { status: 409 }
      );
    }

    // ── Step 2: Create or find Patient ───────────────────────
    // Try to find existing patient by phone
    let patientId: string;

    const { data: existingPatients } = await supabase
      .from('patients')
      .select('id')
      .eq('phone', body.phone.trim())
      .limit(1);

    if (existingPatients && existingPatients.length > 0) {
      patientId = existingPatients[0].id;
    } else {
      // Create new patient
      const { data: newPatient, error: patientError } = await supabase
        .from('patients')
        .insert({
          full_name: body.full_name.trim(),
          phone: body.phone.trim(),
          email: body.email?.trim() || null,
        })
        .select('id')
        .single();

      if (patientError || !newPatient) {
        console.error('Patient insert error:', patientError);
        return NextResponse.json(
          { success: false, error: 'Could not create patient record. Please try again.' },
          { status: 500 }
        );
      }

      patientId = newPatient.id;
    }

    // ── Step 3: Insert Appointment ────────────────────────────
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        patient_id: patientId,
        clinic_id: body.preferred_branch,
        service_id: body.treatment_interest,
        preferred_date: body.preferred_date,
        preferred_time_slot: body.time_slot,
        status: 'new',
        source: 'website',
        notes: body.message?.trim() || null,
      })
      .select('*, patient:patients(*)')
      .single();

    if (appointmentError || !appointment) {
      console.error('Appointment insert error:', appointmentError);
      return NextResponse.json(
        { success: false, error: 'Could not book appointment. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please call us directly.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/appointments
 * Returns all appointments (admin only — requires Supabase session).
 * Supports query params: status, clinic_id, date_from, date_to
 */
export async function GET(request: NextRequest) {
  // In a full implementation, we'd verify the Supabase JWT here.
  // For demo purposes, we use the service client which bypasses RLS.
  const serviceClient = createServiceClient();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const clinic_id = searchParams.get('clinic_id');
  const date_from = searchParams.get('date_from');
  const date_to = searchParams.get('date_to');

  let query = serviceClient
    .from('appointments')
    .select('*, patient:patients(full_name, phone, email)')
    .order('preferred_date', { ascending: false })
    .order('preferred_time_slot', { ascending: true });

  if (status) query = query.eq('status', status);
  if (clinic_id) query = query.eq('clinic_id', clinic_id);
  if (date_from) query = query.gte('preferred_date', date_from);
  if (date_to) query = query.lte('preferred_date', date_to);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, appointments: data });
}
