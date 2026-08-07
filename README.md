# Xscapecation Oasis

A direct-booking marketing website for **Xscapecation Oasis**, a vacation rental property management business in Tulsa, Oklahoma. Built by [Design By Dial](https://designbydial.com).

The site showcases three real properties and drives guests to book directly instead of through third-party platforms, while still linking out to the Airbnb, VRBO, Booking.com, and TripAdvisor listings for guests who prefer them. All property details, page content, and site-wide settings (phone, email, social links, booking platforms) are editable through a built-in admin panel — no code changes needed for routine updates.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons
- [Supabase](https://supabase.com) — Postgres database, Auth (admin login), and Storage (uploaded images)
- [Drizzle ORM](https://orm.drizzle.team) — schema and queries against Postgres
- [@dnd-kit](https://dndkit.com) — drag-to-reorder in the admin panel
- react-hook-form + zod — form state and validation

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

Create a project at [supabase.com](https://supabase.com), then copy `.env.example` to `.env.local` and fill in the four values (Project URL, anon key, service role key, and database connection string — see the comments in `.env.example` for exactly where to find each one in the Supabase dashboard).

### 3. Create the database schema and load starting content

```bash
npm run db:push      # create tables from the Drizzle schema
npm run db:secure    # lock tables down from Supabase's public REST API (see Security below)
npm run db:seed      # load the site's current properties, pages, sections, and settings
npm run storage:setup # create the Supabase Storage bucket for uploaded images
```

### 4. Create your first admin login

Supabase Auth doesn't have a public signup form wired up (intentionally). Create your admin user directly:

1. Supabase dashboard → **Authentication** → **Users** → **Add user** (check "Auto Confirm User").
2. Copy the new user's UID.
3. **Table Editor** → `admin_users` → insert a row with `auth_user_id` set to that UID, plus `email` and `name`.

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, or [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to sign in to the admin panel.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npm run db:push` — sync the Postgres schema from `src/lib/db/schema.ts` (see note below)
- `npm run db:seed` — (re)load properties, pages, sections, and site settings from their defaults; safe to re-run — it upserts settings/sections but never overwrites existing property/page records
- `npm run db:secure` — enable Row Level Security on all app tables (see Security)
- `npm run storage:setup` — create the `property-images` Supabase Storage bucket if it doesn't exist

> **Note:** `drizzle-kit push`/`generate`+`migrate` crash on introspection against this project's Supabase database (an unrelated drizzle-kit bug, not a schema issue). If you need to make further schema changes, apply them as a one-off SQL script the way `scripts/enable-rls.ts` does, rather than relying on `db:push` for anything beyond the first `push`.

## Admin Panel

`/admin/login` — sign in, then use the sidebar to manage:

- **Dashboard** — content stats and recent activity
- **Pages** — edit headings, paragraphs, images, and card lists (amenities, reviews, steps, etc.) on every page
- **Properties** — add, edit, and delete property listings, including photo galleries
- **Site Settings** — phone, email, address, logo, social links, and booking platform links, all in one place instead of duplicated across pages
- **Account Settings** — change your own password

## Security

Row Level Security must be enabled on every table (`npm run db:secure`) before this goes live. Without it, Supabase's auto-generated REST API exposes every `public` schema table to anyone holding the public anon key (which is necessarily embedded in client-side JS), completely bypassing the admin login. The app itself is unaffected by RLS — it connects to Postgres directly via `DATABASE_URL`, not through that REST layer, so RLS only closes the anonymous-access hole without changing how the app works.

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client — it bypasses RLS entirely and should only ever be imported from `"use server"` files (currently just `src/app/admin/(dashboard)/upload-actions.ts`).

## Project Structure

```
src/
  app/
    admin/          Admin panel — login, dashboard, pages/properties/settings editors
    about/
    amenities/
    book/
    contact/
    explore/
    properties/
      [slug]/        Individual property detail pages
    review/
  components/
    admin/          Admin-only UI (forms, drag-and-drop, image uploads, live preview)
    icons/
    ...             Shared public-site UI (Navbar, Footer, BookingWidget, etc.)
  data/
    properties.ts   Public-shaped property reads (DB-backed; same exports as before the CMS)
  lib/
    auth/           Current-admin lookup
    content/        Data-access layer — properties, page sections, site settings, activity log
    db/             Drizzle schema and client
    supabase/       Supabase browser/server/admin clients
  proxy.ts          Route guard for /admin/** (Next.js 16's renamed middleware.ts)
scripts/
  seed.ts           Loads starting content into a fresh database
  seed-data.ts      The original hardcoded property data, used only by seed.ts
  setup-storage.ts  Creates the Supabase Storage bucket
  enable-rls.ts     Enables Row Level Security (see Security)
public/
  images/           Property photos and site imagery
```
