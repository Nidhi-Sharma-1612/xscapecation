# Xscapecation Oasis

A direct-booking marketing website for **Xscapecation Oasis**, a vacation rental property management business in Tulsa, Oklahoma. Built by [Design By Dial](https://designbydial.com).

The site showcases three real properties and drives guests to book directly (via the Guesty booking engine) instead of through third-party platforms, while still linking out to the Airbnb, VRBO, Booking.com, and TripAdvisor listings for guests who prefer them.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Project Structure

```
src/
  app/            Route pages (App Router)
    about/
    amenities/
    book/
    contact/
    explore/
    properties/
      [slug]/      Individual property detail pages
    review/
  components/     Shared UI components (Navbar, Footer, BookingWidget, etc.)
  data/           Property data (source of truth for listings)
  lib/            Shared utilities (date helpers, etc.)
public/
  images/         Property photos and site imagery
```
