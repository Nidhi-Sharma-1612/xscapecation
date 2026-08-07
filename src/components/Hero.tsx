import { ChevronDown } from "lucide-react";
import Image from "next/image";
import BookingWidget from "./BookingWidget";
import Navbar from "./Navbar";
import { getProperties } from "@/data/properties";
import { getSectionContent } from "@/lib/content/sections";
import { getSiteSettings } from "@/lib/content/site-settings";

type HeroContent = { eyebrow: string; heading: string; backgroundImage: string };

export default async function Hero() {
  const [properties, hero, settings] = await Promise.all([
    getProperties(),
    getSectionContent<HeroContent>("home", "hero"),
    getSiteSettings(),
  ]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt="Front porch of the Xscapecation Oasis vacation rental in Tulsa"
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
      </div>

      {/* Vertical read: darkens the bottom where the nav/content sit */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-charcoal/55" />
      {/* Horizontal read: guarantees contrast behind the headline regardless of what's in the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/25 to-transparent" />

      <Navbar logoUrl={settings.logoUrl ?? undefined} />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center lg:px-10">
        <p
          className="animate-fade-in-up mb-4 text-sm font-semibold tracking-[0.3em] text-white uppercase [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "80ms" }}
        >
          {hero.eyebrow}
        </p>
        <h1
          className="animate-gradient-shimmer mx-auto max-w-3xl bg-gradient-to-r from-gold-300 via-gold-100 to-gold-500 bg-clip-text font-serif text-5xl leading-tight font-semibold text-transparent drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "200ms" }}
        >
          {hero.heading}
        </h1>

        <div
          className="animate-fade-in-up mx-auto mt-8 max-w-4xl"
          style={{ animationDelay: "380ms" }}
        >
          <BookingWidget layout="bar" properties={properties} />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="animate-fade-in-up absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80 transition hover:text-gold-300"
        style={{ animationDelay: "700ms" }}
      >
        <ChevronDown className="animate-bounce-soft h-8 w-8" />
      </a>
    </section>
  );
}
