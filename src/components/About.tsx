import {
  ArrowRight,
  Bath,
  Bed,
  Car,
  Compass,
  Footprints,
  Navigation,
  Plane,
  Star,
  Sun,
  Tv,
  UtensilsCrossed,
  Wifi,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const QUICK_FACTS = [
  { icon: Bed, label: "2 Bedrooms" },
  { icon: Bath, label: "1 Bathroom" },
  { icon: Wind, label: "Air Conditioned" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Private Parking" },
  { icon: Tv, label: "Smart TV & Streaming" },
  { icon: UtensilsCrossed, label: "Fully Equipped Kitchen" },
  { icon: Sun, label: "Patio & Outdoor Dining" },
];

export default function About({
  hideHeading = false,
}: {
  hideHeading?: boolean;
}) {
  return (
    <section id="about" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!hideHeading && (
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              About Us
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl lg:whitespace-nowrap">
              Welcome to Xscapecation Oasis
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-charcoal/70">
              A recently renovated villa in the heart of Tulsa, styled to
              feel like your own.
            </p>
          </Reveal>
        )}

        <Reveal
          delay={150}
          className="group mt-16 grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2"
        >
          <div className="relative h-80 overflow-hidden md:h-full">
            <Image
              src="/images/property/bedroom.jpg"
              alt="Bedroom at Xscapecation Oasis"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-charcoal shadow-sm">
              <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
              4.9 · Verified Reviews
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 lg:p-12">
            <p className="text-base leading-relaxed text-charcoal/80">
              This air-conditioned retreat keeps you close to the action
              without sacrificing a quiet night&apos;s sleep.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal/60">
              <span className="inline-flex items-center gap-1.5">
                <Footprints className="h-4 w-4 text-wine-600" />
                10 min walk to the Stadium
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Navigation className="h-4 w-4 text-wine-600" />
                5 min to Expo Center &amp; BOK Center
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Plane className="h-4 w-4 text-wine-600" />
                8 miles to the Airport
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-charcoal/80">
              Inside, two comfortable bedrooms and a full kitchen make it
              easy to settle in, while the patio is the perfect spot for
              morning coffee or an evening glass of wine. Arriving guests are
              welcomed with a little something sweet.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-charcoal/10 pt-6 text-sm text-charcoal/75">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label} className="flex items-center gap-2">
                  <fact.icon className="h-4 w-4 shrink-0 text-wine-600" />
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-base leading-relaxed text-charcoal/80">
              Once you&apos;re settled in, Tulsa&apos;s best is just minutes
              away.
            </p>

            <Link
              href="/explore"
              className="group/btn mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-wine-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-wine-700"
            >
              <Compass className="h-4 w-4" />
              Explore Tulsa
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
