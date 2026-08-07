import { Check } from "lucide-react";
import type { Metadata } from "next";
import Amenities from "@/components/Amenities";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionIcon } from "@/lib/content/section-icons";

export const metadata: Metadata = {
  title: "Amenities | Xscapecation Oasis",
  description:
    "Everything included at Xscapecation Oasis — from self check-in to a fully equipped kitchen.",
};

type BannerContent = {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
};
type AmenityListContent = {
  eyebrow: string;
  heading: string;
  paragraph: string;
  items: { title: string; items: string[] }[];
};

export default async function AmenitiesPage() {
  const [banner, list] = await Promise.all([
    getSectionContent<BannerContent>("amenities", "amenities-banner"),
    getSectionContent<AmenityListContent>("amenities", "amenity-list"),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow={banner.eyebrow}
        title={banner.title}
        image={banner.image}
        imageAlt={banner.imageAlt}
      />

      <Amenities hideHeading />

      <section className="bg-cream-dark py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {list.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              {list.heading}
            </h2>
            <p className="mt-4 text-base text-charcoal/70">{list.paragraph}</p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.items.map((category, i) => {
              const Icon = getSectionIcon("amenity-list", i);
              return (
                <Reveal key={category.title} delay={i * 120}>
                  <div className="h-full rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal">
                      {category.title}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-charcoal/75">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
