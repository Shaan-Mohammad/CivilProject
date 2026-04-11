# CivilDraft Pro

A premium, production-grade Next.js 14 platform designed exclusively for Civil Engineers, Draftsmen, and Architects. It incorporates an end-to-end CRM for lead management, a structural project portfolio, and deep quoting pipelines.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite natively (Prisma ORM mapped, fully PostgreSQL ready).
- **Styling**: Tailwind CSS + Shadcn/ui + Framer Motion.
- **Authentication**: NextAuth.js (v5)
- **Validation**: Zod + React Hook Form

---

## 💻 Getting Started locally

### 1. Requirements
Ensure you have **Node.js 18+** installed along with npm. You also need a standard environment.

### 2. Environment Setup
Copy the configuration wrapper and generate your authentication hash:

```bash
cp .env.example .env
openssl rand -base64 32 # Copy to NEXTAUTH_SECRET inside .env
```

### 3. Database Initialization
Instantiate the SQLite database, map your schema natively, and run the comprehensive seed file holding the demo architectural properties to give life to your UI.

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Running the Development Server
Install dependencies and spin up your local tunnel.

```bash
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000)

**Admin Access**
- Email: `admin@civildraftpro.com`
- Password: `Admin@123456`

---

## 📦 File Structures & Patterns

- **`/app/(public)`**: Contains the native React Server Components holding the publicly indexed SEO landing pages.
- **`/app/admin`**: Deeply guarded router holding the CRM and CMS modules (Leads, Projects, Testimonials).
- **`/actions`**: NextJS 14 Server Actions defining direct data manipulation avoiding large explicit `/api` JSON contracts.

## 🚢 Preparing for Production (Vercel / NextJS)

If you plan to map this over to Vercel, Railway, or AWS:
1. Swap the Prisma provider from `sqlite` to `postgresql` in `schema.prisma`.
2. Connect your production `DATABASE_URL`.
3. Re-run `npx prisma db push`.
4. Run `npm run build` locally to run standard TS compilations guaranteeing type validity.
