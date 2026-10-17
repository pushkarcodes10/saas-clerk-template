# SaaS Clerk Starter Template

A modern, production-ready SaaS starter kit built on Next.js 16, Clerk Authentication, PostgreSQL, and Prisma ORM, featuring TodoMaster as a reference application.

---

## Overview for Non-Technical Readers

This project is a complete foundation for building subscription-based web applications. 

Instead of spending weeks setting up user accounts, login security, subscription tiers, and databases from scratch, this template provides all of those essential business systems ready to use out of the box. 

To demonstrate how it works in the real world, the template includes a live task management product called TodoMaster. Users can create an account, organize tasks, experience plan limits on the free tier, and upgrade to a premium subscription through a dedicated checkout flow. An included administrative dashboard allows site owners to monitor user signups, track activity, and manage member subscriptions.

---

## Overview for Technical Readers

This repository is an opinionated full-stack Next.js 16 (App Router) template engineered for scalable multi-tenant SaaS products.

Core architectural highlights:
- **Authentication & RBAC:** Clerk v7 integration with server-side session resolution and Edge Middleware (`src/proxy.ts`) enforcing role-based redirects (`/admin/dashboard` for administrators, `/dashboard` for standard users).
- **Resilient Data Layer:** Prisma ORM connected via `@prisma/adapter-pg` for direct connection pooling on PostgreSQL. Includes on-demand Just-In-Time (JIT) user synchronization to ensure database integrity even without local webhook tunnels.
- **Subscription Architecture:** Functional subscription lifecycle handling (`isSubscribed`, `subscriptionEndsAt`), tier-based feature gating, and upgrade endpoints.
- **Operational Telemetry:** Administrative dashboard monitoring system KPIs, database metrics, and user management with manual plan override controls.
- **Reference Application (TodoMaster):** Production-grade CRUD implementation featuring debounced search (`usehooks-ts`), pagination, optimistic UI updates, and server-side quota enforcement.

---

## Tech Stack

- **Framework:** Next.js 16.3 (Turbopack, App Router, React 19)
- **Language:** TypeScript 5
- **Authentication:** Clerk Next.js SDK
- **Database & ORM:** PostgreSQL, Prisma 7.10 (`@prisma/adapter-pg`)
- **Styling:** Tailwind CSS v4, custom design tokens, tw-animate-css
- **Webhooks:** Svix signature verification
- **Icons:** Lucide React

---

## Project Structure

```
├── prisma/
│   └── schema.prisma             # PostgreSQL schema and relational models
├── src/
│   ├── app/
│   │   ├── (authenticated)/
│   │   │   ├── admin/dashboard/  # Administrative console and user roster
│   │   │   ├── dashboard/        # Authenticated workspace (TodoMaster app)
│   │   │   └── subscribe/        # Pro membership upgrade page
│   │   ├── api/
│   │   │   ├── admin/            # Metrics & user management API
│   │   │   ├── subscription/     # Plan status and upgrade endpoints
│   │   │   ├── todos/            # CRUD, search, and pagination API
│   │   │   └── webhook/register/ # Svix-verified Clerk webhook receiver
│   │   ├── layout.tsx            # Global ClerkProvider and font configuration
│   │   └── page.tsx              # Public high-conversion landing page
│   └── proxy.ts                  # Clerk authentication and RBAC middleware
├── components/
│   ├── landing/                  # Modular landing page sections
│   └── ui/                       # Reusable UI primitives
└── lib/
    └── prisma.ts                 # Prisma Client singleton with connection pooling
```

---

## Quick Start

### 1. Environment Configuration

Create a `.env` file in the project root:

```env
# PostgreSQL Connection
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Redirection
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

# Clerk Webhook Secret
WEBHOOK_SECRET="whsec_..."
```

### 2. Install and Initialize Database

```bash
# Install dependencies
npm install

# Generate Prisma Client and sync schema
npx prisma generate
npx prisma db push
```

### 3. Start Development Server

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

---

## Key Routes and Access Control

| Route | Access Level | Description |
|---|---|---|
| `/` | Public | High-fidelity marketing landing page with feature previews and pricing. |
| `/sign-in`, `/sign-up` | Public | Authentication entry points managed by Clerk. |
| `/dashboard` | Authenticated | Main user application workspace with task CRUD, search, and limits. |
| `/subscribe` | Authenticated | Membership upgrade page with monthly/annual billing options. |
| `/admin/dashboard` | Admin Role Only | Telemetry dashboard with user roster and subscription overrides. |

---

## Assigning Admin Access

To grant an account administrative access:
1. Open the **Clerk Dashboard** and select **Users**.
2. Click on the target user and navigate to **Metadata**.
3. Under **Public Metadata**, insert:
```json
{
  "role": "admin"
}
```
4. Save changes. The user will automatically route to `/admin/dashboard` on subsequent logins.

---

## Build Verification

```bash
# TypeScript validation
npx tsc --noEmit

# Production compilation
npm run build
```

---

## License

This project is licensed under the MIT License.
