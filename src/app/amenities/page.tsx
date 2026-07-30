import { Check, ShieldCheck, Sofa, UtensilsCrossed, Wifi } from "lucide-react";
import type { Metadata } from "next";
import Amenities from "@/components/Amenities";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Amenities | Xscapecation Oasis",
  description:
    "Everything included at Xscapecation Oasis — from self check-in to a fully equipped kitchen.",
};

const AMENITY_LIST = [
  {
    category: "Kitchen & Dining",
    icon: UtensilsCrossed,
    items: [
      "Fully equipped kitchen",
      "Coffee maker",
      "Dishwasher",
      "Dining table for 6",
    ],
  },
  {
    category: "Comfort",
    icon: Sofa,
    items: [
      "Central air conditioning & heating",
      "Fresh, hotel-quality linens",
      "Hotel-style toiletries",
      "Washer & dryer",
    ],
  },
  {
    category: "Work & Connectivity",
    icon: Wifi,
    items: [
      "Complimentary Wi-Fi",
      "Dedicated office space",
      "Smart TV",
      "Self check-in",
    ],
  },
  {
    category: "Safety & Essentials",
    icon: ShieldCheck,
    items: [
      "Smoke detector",
      "Carbon monoxide detector",
      "Fire extinguisher",
      "First aid kit",
    ],
  },
];

export default function AmenitiesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow="Comfort, Covered"
        title="Amenities"
        image="/images/properties/oasis-1/2.jpg"
        imageAlt="Cozy living room at Xscapecation Oasis"
      />

      <Amenities hideHeading />

      <section className="bg-cream-dark py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              The Full List
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              What&apos;s Included
            </h2>
            <p className="mt-4 text-base text-charcoal/70">
              Every stay comes stocked with the essentials — and a few nice
              extras.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AMENITY_LIST.map(({ category, icon: Icon, items }, i) => (
              <Reveal key={category} delay={i * 120}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal">
                    {category}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-charcoal/75">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
