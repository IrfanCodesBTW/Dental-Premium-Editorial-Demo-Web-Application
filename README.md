# 🦷 FMS Dental — Premium Editorial Demo Web Application

A highly polished, full-stack demonstration web application built for **FMS Dental** (Hyderabad's premier dental clinic group). This project showcases modern, high-conversion healthcare UI/UX, database-driven appointment booking with real-time conflict checking, and a secure administrative dashboard—all engineered to operate on permanent **₹0/month free-tier infrastructure**.

---

## 📖 Table of Contents
1. [✨ Key Features](#-key-features)
2. [🎨 Editorial Design Philosophy](#-editorial-design-philosophy)
3. [🛠️ Tech Stack](#-tech-stack)
4. [📐 Architecture & Data Flow](#-architecture--data-flow)
5. [🗄️ Database Schema & RLS Policies](#%EF%B8%8F-database-schema--rls-policies)
6. [📁 Project Structure](#-project-structure)
7. [🚀 Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Step 1: Database Setup](#step-1-database-setup)
   - [Step 2: Environment Configuration](#step-2-environment-configuration)
   - [Step 3: Run Locally](#step-3-run-locally)
   - [Step 4: Create Admin Profile](#step-4-create-admin-profile)
8. [🔌 API Reference](#-api-reference)
9. [🌐 Deployment](#-deployment)

---

## ✨ Key Features

- **Luxury Editorial UI/UX**: Inspired by Apple, Aesop, and Scandinavian minimalism. Avoids standard clinical website cliches in favor of generous whitespace, sophisticated typography (Inter/SF Pro Display), and smooth motion.
- **Smart Appointment Booking**: Client-side form with validations (valid Indian mobile number, minimum date restrictions, 90-day maximum lookup, and dynamic doctor availability).
- **Backend Conflict Check**: Automated double-booking prevention checking availability for `clinic_id + preferred_date + preferred_time_slot` combinations at the database layer.
- **Admin Dashboard**: Secured via Supabase Authentication. Allows clinic staff to review all booking requests, filter them by date, status, or branch, and change booking status (`new`, `confirmed`, `completed`, `cancelled`).
- **Zero Running Costs**: Configured to run entirely on free-tier services: Vercel (frontend), Supabase (PostgreSQL, Auth, RLS), and Gmail SMTP or Telegram bot integration for automated notification.

---

## 🎨 Editorial Design Philosophy

Following the rules set out in `DESIGN.md`, the visual system rejects typical saturated blue corporate layouts for a premium, editorial aesthetic:
- **Curated Color Palette**: Warm Off-White (`#FAFAF8`) background, jet-black typography (`#151515`) for high contrast readability, and a Soft Medical Blue (`#46C6E8`) accent.
- **Asymmetry & Spacing**: Large headlines, 180px section gaps on desktop, and off-center text compositions creating the look and feel of a high-end magazine.
- **Soft Technology**: Rounded elements (buttons at `999px`, cards at `28px`, inputs at `18px`), combined with glassmorphic cards (`backdrop-filter: blur(20px)`) and soft ambient shadows (`0 30px 80px rgba(0,0,0,.08)`).
- **Authentic Imagery**: Minimal stock feel; placeholders and designs are designed to feel natural, warm, and highly professional.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Supabase Auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (micro-interactions and section transitions)
- **Icons**: [@phosphor-icons/react](https://phosphoricons.com/) (crisp, modern icon set)

---

## 📐 Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────┐
│                        CLIENT                          │
│  (Next.js App: Home, Services, Clinics, Booking Form)  │
└──────────────────────────┬─────────────────────────────┘
                           │ POST / GET / PATCH
                           ▼
┌────────────────────────────────────────────────────────┐
│               NEXT.JS ROUTE HANDLERS                   │
│        (API layer: /api/appointments/[id])             │
└──────────────────────────┬─────────────────────────────┘
                           │ Supabase Client / Service Role
                           ▼
┌────────────────────────────────────────────────────────┐
│                     SUPABASE DB                        │
│          (PostgreSQL Tables: RLS Enabled)              │
│       ┌───────────┐ ┌──────────────┐ ┌──────────┐      │
│       │ patients  │ │ appointments │ │ profiles │      │
│       └───────────┘ └──────────────┘ └──────────┘      │
└────────────────────────────────────────────────────────┘
```

1. **Anonymous booking requests** hit the `POST /api/appointments` route handler.
2. The handler checks for preexisting appointments for that slot. If clear, it creates/references the **Patient** and inserts the **Appointment** row.
3. **Admin users** log in via Supabase Auth and load the `/admin/appointments` page, calling `GET /api/appointments` through a secure session to bypass RLS for administrative access.

---

## 🗄️ Database Schema & RLS Policies

Database tables and permissions are defined in `supabase/schema.sql`.

### 1. Database Schema
- **`patients`**: Keeps contact details for users (`full_name`, `phone`, `email`). Phone number acts as a unique lookup identifier.
- **`appointments`**: References patients, storing `clinic_id`, `service_id` (mapping to static `fmsData.ts` items), `preferred_date`, `preferred_time_slot`, `status` (enum: `new`, `confirmed`, `completed`, `cancelled`), and custom notes.
- **`profiles`**: Stores user role (`admin` or `staff`) mapped directly to Supabase Auth's user UUID.

### 2. Row Level Security (RLS)
The database enforces strict RLS policies to protect client records while allowing anonymous booking:
- **Public Insert**: Anonymous users can insert records into both `patients` and `appointments` to enable self-booking.
- **Public Read (Conflict Check)**: Anyone can read appointments (only returning date, time, and clinic identifiers; hides patient PII) to check for conflicting bookings.
- **Admin Read/Write**: Full CRUD permissions on `patients` and `appointments` are granted only to users authenticated via Supabase Auth who have a matching record in the `profiles` table with the role `admin` or `staff`.

---

## 📁 Project Structure

```text
fms-dental/
├── supabase/
│   └── schema.sql                # Database schema, triggers, and RLS policies
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── appointments/     # Protected admin dashboard list
│   │   │   ├── layout.tsx        # Admin session checking layout
│   │   │   └── login/            # Admin login screen
│   │   ├── api/
│   │   │   └── appointments/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts   # PATCH: Update status (Admin)
│   │   │       └── route.ts       # POST: Book, GET: Filter list (Admin)
│   │   ├── book/                 # Booking page routing
│   │   ├── clinics/              # Clinic directory and individual detail view
│   │   ├── doctors/              # Doctor details and specialty filter views
│   │   ├── services/             # Treatments listing and India vs global pricing
│   │   ├── globals.css           # Global custom variables and Tailwind utilities
│   │   ├── layout.tsx            # Main HTML layout, nav & footer wrapper
│   │   └── page.tsx              # Home landing page with trust sections
│   ├── components/
│   │   ├── AppointmentForm.tsx   # Interactive booking state form
│   │   ├── cards/                # Shared cards (Clinic, Doctor, Service, Testimonial)
│   │   ├── sections/             # Modular landing elements (Hero, Testimonials)
│   │   └── ui/                   # Global components (Navbar, Footer, TrustBadges)
│   ├── lib/
│   │   ├── fmsData.ts            # Local static database (clinics, doctors, treatments)
│   │   ├── helpers.ts            # Shared helpers (date formatting, validators)
│   │   └── supabase.ts           # Client-side & admin-side Supabase client creators
│   └── types/
│       └── index.ts              # Global TypeScript interface definitions
├── .env.local.example            # Mock variables template
├── tailwind.config.ts            # Tailwind custom design parameters
└── package.json                  # Dependencies configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A free account at [Supabase](https://supabase.com)

### Step 1: Database Setup
1. Create a new project in your **Supabase Dashboard**.
2. Navigate to the **SQL Editor** tab from the left sidebar.
3. Click **New Query**, copy the contents of `supabase/schema.sql`, paste it, and click **Run**.
4. This will create the `patients`, `appointments`, and `profiles` tables, setup trigger actions for `updated_at`, and bind Row Level Security (RLS) policies.

### Step 2: Environment Configuration
1. In the root of the `fms-dental` project, copy `.env.local.example` to create a local environment file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` and configure your API details:
   - **`NEXT_PUBLIC_SUPABASE_URL`**: Find this under Supabase Settings → API → Project URL.
   - **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Find this under Supabase Settings → API → `anon` public key.
   - **`SUPABASE_SERVICE_ROLE_KEY`**: Find this under Supabase Settings → API → `service_role` secret key. *(Never expose this key in public client files!)*

### Step 3: Run Locally
Install the node packages and start the Next.js development server:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to test the client-side experience.

### Step 4: Create Admin Profile
To access the admin dashboard (`/admin/appointments`):
1. Go to your **Supabase Dashboard** → **Authentication** → **Users** → **Invite User** (or sign up a test user).
2. Note the **User UID** created for the user.
3. Open the **SQL Editor** in Supabase and run the following command to elevate that user to an administrator:
   ```sql
   INSERT INTO profiles (id, role)
   VALUES ('YOUR-USER-UUID-HERE', 'admin');
   ```
4. Now, visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) on your local site, log in with the user's credentials, and you will be redirected to the secure admin appointments dashboard.

---

## 🔌 API Reference

### 1. Book Appointment
- **Endpoint**: `POST /api/appointments`
- **Access**: Public anonymous
- **Payload**:
  ```json
  {
    "full_name": "Dr. Sarah Paul",
    "phone": "9848022338",
    "email": "sarah.paul@example.com",
    "preferred_branch": "jubilee-hills",
    "treatment_interest": "dental-implants",
    "preferred_date": "2026-07-15",
    "time_slot": "10:30",
    "message": "Prefer morning slots."
  }
  ```
- **Responses**:
  - `201 Created` on successful slot booking.
  - `409 Conflict` if the slot is already taken.
  - `400 Bad Request` if payload parameters are missing or invalid.

### 2. List Appointments (Admin only)
- **Endpoint**: `GET /api/appointments`
- **Access**: Restricted to authenticated Admin/Staff
- **Query Parameters**:
  - `status` (optional): Filter by `new | confirmed | completed | cancelled`
  - `clinic_id` (optional): Filter by clinic branch name (e.g. `jubilee-hills`)
  - `date_from`/`date_to` (optional): Format `YYYY-MM-DD` to restrict lookup ranges.
- **Response**:
  - `200 OK` with a JSON list of matching appointment records, including joined patient details.

### 3. Update Appointment Status (Admin only)
- **Endpoint**: `PATCH /api/appointments/[id]`
- **Access**: Restricted to authenticated Admin/Staff
- **Payload**:
  ```json
  {
    "status": "confirmed"
  }
  ```
- **Response**:
  - `200 OK` on successful update.
  - `400 Bad Request` for invalid statuses.
  - `404 Not Found` if the appointment ID does not exist.

---

## 🌐 Deployment

This application is ready for free-tier cloud deployment:

1. **Database**: Supabase automatically hosts your database on their free tier. Make sure to keep the project active (Supabase pauses databases after 1 week of inactivity on free plans).
2. **Frontend Host**: Link your GitHub repository to [Vercel](https://vercel.com). Vercel will automatically detect Next.js settings. Add your `.env.local` environment variables inside the Vercel Project Settings during import, and hit **Deploy**.

