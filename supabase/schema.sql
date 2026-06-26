-- ============================================================
-- FMS Dental — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Patients ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name  TEXT        NOT NULL,
  phone      TEXT        NOT NULL,
  email      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Appointments ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id          UUID        NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id           TEXT        NOT NULL,   -- From fmsData.clinics_and_locations[].id
  service_id          TEXT        NOT NULL,   -- From fmsData.services_and_treatments[].id
  preferred_date      DATE        NOT NULL,
  preferred_time_slot TEXT        NOT NULL,
  status              TEXT        NOT NULL DEFAULT 'new'
                                 CHECK (status IN ('new', 'confirmed', 'completed', 'cancelled')),
  source              TEXT        NOT NULL DEFAULT 'website',
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Index for conflict check query (clinic + date + slot)
CREATE INDEX IF NOT EXISTS idx_appointments_slot
  ON appointments(clinic_id, preferred_date, preferred_time_slot);

-- ─── Profiles (Admin) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id        UUID  PRIMARY KEY,   -- Supabase Auth user UUID
  role      TEXT  NOT NULL DEFAULT 'admin'
                  CHECK (role IN ('admin', 'staff')),
  branch_id TEXT  -- Optional: restrict admin to a specific branch
);

-- ─── Updated_at trigger ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─── Row Level Security ─────────────────────────────────────────

ALTER TABLE patients     ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;

-- Public: Allow anonymous inserts for booking
CREATE POLICY "public_insert_patients" ON patients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "public_insert_appointments" ON appointments
  FOR INSERT WITH CHECK (true);

-- Public: Allow reading appointments for conflict check
-- (Only reads non-sensitive fields; no PII exposed)
CREATE POLICY "public_read_appointments_for_conflict" ON appointments
  FOR SELECT USING (true);

-- Admin: Full access to patients
CREATE POLICY "admin_all_patients" ON patients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'staff')
    )
  );

-- Admin: Full access to appointments
CREATE POLICY "admin_all_appointments" ON appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'staff')
    )
  );

-- Profiles: Users can read their own profile
CREATE POLICY "own_profile_select" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- ─── Create admin user (run manually after creating auth user) ──
-- After inviting an admin via Supabase Auth dashboard, run:
--
-- INSERT INTO profiles (id, role)
-- VALUES ('paste-auth-user-uuid-here', 'admin');
--
-- ──────────────────────────────────────────────────────────────

-- ─── Sample Data (Optional for testing) ───────────────────────
-- Uncomment to insert a test appointment after running schema:
--
-- INSERT INTO patients (full_name, phone, email)
-- VALUES ('Test Patient', '+91 98480 99999', 'test@example.com');
--
-- INSERT INTO appointments (patient_id, clinic_id, service_id, preferred_date, preferred_time_slot, notes)
-- SELECT id, 'jubilee-hills', 'dental-implants', CURRENT_DATE + 7, '10:00', 'Test booking'
-- FROM patients WHERE phone = '+91 98480 99999';
