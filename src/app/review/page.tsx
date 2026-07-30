import { Home, Star, ThumbsUp } from "lucide-react";
import type { Metadata } from "next";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import { PROPERTIES } from "@/data/properties";

export const metadata: Metadata = {
  title: "Reviews | Xscapecation Oasis",
  description:
    "See what guests are saying about their stay at Xscapecation Oasis in Tulsa, Oklahoma.",
};

const STATS = [
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: ThumbsUp, value: "196", label: "Verified Stays" },
  { icon: Home, value: `${PROPERTIES.length}`, label: "Properties in Tulsa" },
];

const PLATFORMS = [
  { label: "Airbnb", href: "https://www.airbnb.com/rooms/891908835909763419" },
  { label: "VRBO", href: "https://www.vrbo.com/3329386" },
  {
    label: "Booking.com",
    href: "https://www.booking.com/hotel/us/xscapecation-oasis.html",
  },
  {
    label: "TripAdvisor",
    href: "https://www.tripadvisor.com/VacationRentalReview-g51697-d26242053-Xscapecation_Oasis-Tulsa_Oklahoma.html",
  },
];

export default function ReviewPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow="Guest Love"
        title="Reviews"
        image="/images/property/bedroom.jpg"
        imageAlt="Bedroom at Xscapecation Oasis"
      />

      <section className="bg-cream-dark pt-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal className="grid gap-6 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-serif text-3xl font-semibold text-charcoal">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-charcoal/60">{stat.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal
            delay={150}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center"
          >
            <span className="text-sm text-charcoal/60">
              Verified across:
            </span>
            {PLATFORMS.map((platform) => (
              <a
                key={platform.label}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-charcoal/15 bg-white px-4 py-1.5 text-sm font-medium text-charcoal/80 transition-colors hover:border-wine-600 hover:text-wine-600"
              >
                {platform.label}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <Reviews hideHeading />
      <CTA />
      <Footer />
    </main>
  );
}
