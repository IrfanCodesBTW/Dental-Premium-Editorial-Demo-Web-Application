// ============================================================
// FMS Dental — TypeScript Interfaces
// ============================================================

// ─── FMS Data Types ────────────────────────────────────────

export interface Service {
  id: string;
  name: string;
  category: string;
  tags: string[];
  short_description: string;
  detailed_description: string;
  benefits: string[];
  ideal_for: string[];
  related_technology_ids: string[];
  related_doctor_ids: string[];
  pricing_insight_id?: string;
  image_keyword: string;
}

export interface Clinic {
  id: string;
  branch_name: string;
  city: string;
  area: string;
  address: string;
  landmarks: string[];
  phone_numbers: string[];
  email?: string;
  hours: string;
  special_focus?: string;
  map_url?: string;
}

export interface Doctor {
  id: string;
  name: string;
  designation: string;
  specialties: string[];
  experience_years: number;
  clinic_ids: string[];
  bio: string;
  image_seed: string;
  qualifications: string[];
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  benefit: string;
}

export interface Award {
  id: string;
  name: string;
  year: string;
  issuer: string;
  description: string;
}

export interface Testimonial {
  id: string;
  patient_name: string;
  location: string;
  treatment: string;
  rating: number;
  review: string;
  date: string;
  image_seed: string;
}

export interface PricingInsight {
  id: string;
  service_id: string;
  treatment_name: string;
  india_range: string;
  global_range: string;
  savings_note: string;
  disclaimer: string;
}

export interface ContactInfo {
  primary_phone: string;
  secondary_phone: string;
  email: string;
  whatsapp?: string;
  booking_hours: string;
  time_slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  label: string;
  value: string;
}

export interface TaggingDimensions {
  treatment_tags: TreatmentTag[];
  specialty_tags: string[];
  city_tags: string[];
}

export interface TreatmentTag {
  id: string;
  label: string;
  icon: string;
}

export interface FMSData {
  services_and_treatments: Service[];
  clinics_and_locations: Clinic[];
  doctors_and_specialists: Doctor[];
  technology_and_facilities: Technology[];
  awards_and_recognitions: Award[];
  testimonials_and_reviews: Testimonial[];
  pricing_insights: PricingInsight[];
  contact_and_appointment_info: ContactInfo;
  tagging_dimensions: TaggingDimensions;
}

// ─── Database Types ─────────────────────────────────────────

export interface Patient {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  created_at: string;
}

export type AppointmentStatus = 'new' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patient_id: string;
  patient?: Patient;
  clinic_id: string;
  service_id: string;
  preferred_date: string;
  preferred_time_slot: string;
  status: AppointmentStatus;
  source: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  role: 'admin' | 'staff';
  branch_id?: string;
}

// ─── Form Types ─────────────────────────────────────────────

export interface BookingFormData {
  full_name: string;
  phone: string;
  email: string;
  preferred_branch: string;
  treatment_interest: string;
  preferred_date: string;
  time_slot: string;
  message: string;
}

export interface BookingResponse {
  success: boolean;
  appointment?: Appointment;
  error?: string;
}

// ─── API Types ───────────────────────────────────────────────

export interface AppointmentWithPatient extends Appointment {
  patient: Patient;
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  clinic_id?: string;
  date_from?: string;
  date_to?: string;
}
