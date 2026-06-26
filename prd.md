# FMS Dental — Zero-Cost Demo Web Application PRD

**Version:** 1.1 (Free-tier only)
**Author:** Irfan Basha Shaik
**Date:** June 2026
**Status:** Ready for development as a ₹0-cost demo

---

## 1. Executive Summary

We are building a full-stack demo web app for FMS Dental to showcase:

- Modern, high-conversion website UX
- Real appointment booking flows
- Basic admin management
- Optional AI assistant for booking

The app is designed to run entirely on free tiers / local tools so there is no recurring cost for development, testing, or showcasing the demo. This is not a production deployment; it is a portfolio + client pitch project.

---

## 2. Constraints

1. **₹0 monthly cost requirement** – Use only free tiers and local/self-hosted tools.
2. **Demo-scale traffic** – Expected usage: you + a few test users; no heavy load.
3. **No paid WhatsApp Business API or SMS** – Notifications limited to email, Telegram, or mock endpoints.
4. **AI usage on free/local options** – Use Gemini free tier or local Ollama/open-source models instead of paid OpenAI.
5. **No credit card requirement** – Prefer platforms where free tiers don’t need card details (Supabase, Vercel, etc.).

---

## 3. Tech Stack (Free-Friendly)

| Layer | Technology | Cost Notes |
| --- | --- | --- |
| Frontend | Next.js 14 + TypeScript | Free |
| Styling | Tailwind CSS + Framer Motion | Free |
| Backend/DB | Supabase Postgres | Free tier: hobby projects with 500MB DB and generous limits |
| ORM | Prisma | Free |
| Auth | Supabase Auth | Free tier (up to demo-scale users) |
| Queue/Jobs | Simple in-DB scheduled jobs or cron-like logic | No Redis/BullMQ needed for demo |
| AI (optional) | Gemini 1.5 Flash via Google AI Studio OR local Ollama | Generous free tier/local, no cost |
| Email | Basic SMTP (e.g., Gmail) OR mocked | Free |
| Chat/Notifications | Telegram bot or in-app notifications | Free |
| Deployment | Vercel (frontend), Supabase (backend) | Both have permanent free hobby plans |

For this demo, we avoid Twilio, SendGrid, paid WhatsApp, and paid OpenAI entirely.

---

## 4. Scope

### Must-Haves

- Public website:
  - Home, Services, Service Detail, Clinics, Doctors, Booking
- Working appointment booking form:
  - Stores data in Supabase; simple conflict prevention at demo scale
- Basic admin dashboard:
  - View appointments, update statuses
- Simple confirmation:
  - Success screen + optional email/Telegram notification
- Optional AI assistant:
  - Uses free Gemini or local LLM to guide patients, but calls real backend APIs

### Nice-to-Haves

- Basic reminder emails (no complex job queues)
- Simple analytics (count of appointments per service/clinic)

---

## 5. Architecture (Simplified for Free Tier)

We keep the architecture simple and free-tier friendly:

```text
CLIENT (Website + Booking Form + Optional AI Chat)
           ↓
Next.js API Routes (App Router)
           ↓
Supabase (Postgres + Auth)
           ↓
Basic SMTP / Telegram Bot (free) or mock notification layer
```

Key simplifications:

- No Redis or BullMQ; reminders (if any) are handled via simple scheduled logic or manual triggers.
- AI uses free-tier Gemini or local Ollama; no paid OpenAI.

---

## 6. Data Model (Demo-Scale)

We use a minimal schema focused on appointments and patients.

```prisma
model Patient {
  id         String   @id @default(uuid())
  full_name  String
  phone      String
  email      String?
  created_at DateTime @default(now())
  appointments Appointment[]
}

model Appointment {
  id                  String   @id @default(uuid())
  patient_id          String
  patient             Patient  @relation(fields: [patient_id], references: [id])
  clinic_id           String   // from fmsData.clinics_and_locations.id
  service_id          String   // from fmsData.services_and_treatments.id
  preferred_date      Date
  preferred_time_slot String
  status              String   @default("new") // new | confirmed | completed | cancelled
  source              String   @default("website")
  notes               String?
  created_at          DateTime @default(now())
  updated_at          DateTime @updatedAt

  @@index([clinic_id, preferred_date, preferred_time_slot])
}

model Profile {
  id         String   @id     // Supabase Auth user id
  role       String   // admin | staff
  branch_id  String?  // Optional: restrict admin to branch
}
```

Conflict prevention (demo-level):

- Before inserting an appointment, check if a row exists for the same `clinic_id + preferred_date + preferred_time_slot` with `status` not equal to `cancelled`.
- If such a row exists, return an error and ask the user to choose another slot.

This is sufficient for demo traffic and can later be upgraded to full transaction-based slot locking for production.

---

## 7. Features

### 7.1 Public Website

Pages:

- `/` — Home
  - Hero with FMS brand, headline, CTAs
  - Trust badges (NABH, GCR rating, years of experience)
  - Stats strip (years, specialists, branches, awards)
  - Featured treatments (e.g., Implants, Smile Design, Invisalign)
  - Testimonials slider
  - Locations teaser (Jubilee Hills, other branches)

- `/services` — Treatment listing
  - Filter by category/tag (implants, cosmetic, orthodontics, root canal, TMJ, etc.)
  - Cards with name, category, short description, “View Details”

- `/services/[serviceId]` — Treatment detail
  - Overview, benefits, ideal_for, related technology and doctors
  - Pricing insight card (India vs global) from static data
  - “Book This Treatment” CTA

- `/clinics` — Branch directory
  - Cards for each clinic with area, address, landmarks, phone
  - “Call” and “Book at this clinic” buttons

- `/doctors` — Specialist directory
  - Cards with name, designation, specialties, experience

- `/book` — Booking page
  - Form fields: name, phone, email, preferred_branch, treatment_interest, preferred_date, time_slot, message
  - Validation, loading, success state

### 7.2 Booking Flow

- User submits form on `/book` or via hero CTA.
- Backend:
  - Creates or links a `Patient` row.
  - Checks for conflicts.
  - Inserts `Appointment` row on success.
- UI:
  - Shows success summary (branch, treatment, date, time).

Optional notifications:

- Send an email via basic SMTP (Gmail/Outlook) configured locally in dev.
- Or send a Telegram message using a free bot.

### 7.3 Admin Dashboard

- Protected routes using Supabase Auth.
- `/admin/login` — email/password sign-in.
- `/admin/appointments` — table of appointments:
  - Columns: patient, phone, clinic, service, date, time, status.
  - Filters by branch, status, date range.
  - Actions: mark as confirmed, completed, cancelled.

No advanced graphs are required for the demo; simple counts and filters are enough.

### 7.4 Optional AI Assistant

If included, the AI assistant must use free/local models:

- Gemini free tier via Google AI Studio, or
- Local LLM via Ollama.

Capabilities:

- Help patient choose a treatment and branch.
- Call backend APIs for:
  - `list_services`
  - `list_clinics`
  - `create_appointment`

The AI agent cannot invent slots; it only displays what backend returns.

---

## 8. Notifications & Reminders

Because this is a free demo:

- Immediate confirmation:
  - Success screen is mandatory.
  - Email/Telegram confirmation is optional but nice for realism.

- Reminders:
  - Can be omitted or implemented with a simple scheduled function/script that runs once per day to send emails for next-day appointments.
  - No Redis/BullMQ or complex queuing is required.

---

## 9. Deployment Plan (Free)

- **Supabase** — Use the free plan for Postgres + Auth.
  - One project for this demo is within free limits.

- **Vercel** — Deploy the Next.js app on the free hobby plan.
  - Perfect for portfolio and client demos.

- **AI (if used)** — Use Gemini’s free developer tier or local Ollama.

No paid infra, no ongoing subscription costs.

---

## 10. Phased Build Plan

Phase 1 — Setup & Data Wiring
- Initialize Next.js + Tailwind + Supabase client.
- Import FMS JSON (`fmsData`) and render content on Home, Services, Clinics, Doctors pages.

Phase 2 — Booking Flow
- Implement `/book` page with full form and validation.
- Wire form to Supabase (`Patient` + `Appointment` inserts).
- Add basic conflict check.

Phase 3 — Admin Dashboard
- Implement Supabase Auth.
- Build `/admin/login` and `/admin/appointments` table with filters and status updates.

Phase 4 — Notifications (Optional)
- Add basic SMTP or Telegram confirmation after booking.

Phase 5 — AI Assistant (Optional)
- Integrate Gemini or local LLM.
- Add chat widget that calls backend functions for listing services/clinics and creating appointments.

---

## 11. Out-of-Scope (For Demo)

- Production-grade concurrency control with SELECT FOR UPDATE.
- Complex reminder queues with Redis/BullMQ.
- Paid SMS/WhatsApp integration via Twilio.
- Enterprise analytics and reporting.

These can be proposed later as production upgrades once the client is interested.
