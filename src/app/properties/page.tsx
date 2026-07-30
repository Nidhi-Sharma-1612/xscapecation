import { CalendarCheck, Luggage, Search } from "lucide-react";
import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Properties from "@/components/Properties";
import Reveal from "@/components/Reveal";
import { PROPERTIES } from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties | Xscapecation Oasis",
  description:
    "Browse our direct-booking vacation rental properties in Tulsa, Oklahoma.",
};

const STEPS = [
  {
    icon: Search,
    title: "Pick Your Property",
    description:
      "Compare guests, bedrooms, and rates across all three homes to find your fit.",
  },
  {
    icon: CalendarCheck,
    title: "Book Direct",
    description:
      "Reserve straight with us — the best rate, no third-party service fees.",
  },
  {
    icon: Luggage,
    title: "Pack Your Bags",
    description:
      "We'll handle the rest, from self check-in details to local tips.",
  },
];

export default function PropertiesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow="Where You'll Stay"
        title="Properties"
        image="/images/property/kitchen.jpg"
        imageAlt="Kitchen at Xscapecation Oasis"
      />

      <div className="bg-cream-dark pb-8">
        <div className="relative z-20 mx-auto -mt-8 w-full max-w-5xl px-6 lg:-mt-9 lg:px-10">
          <BookingWidget layout="bar" properties={PROPERTIES} />
        </div>
      </div>

      <Properties hideHeading />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              Simple & Direct
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              How Booking Direct Works
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 150}>
                <div className="relative flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="absolute top-4 right-5 font-serif text-4xl font-semibold text-wine-600/10">
                    0{i + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
