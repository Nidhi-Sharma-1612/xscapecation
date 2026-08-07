import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Properties from "@/components/Properties";
import Reveal from "@/components/Reveal";
import { getProperties } from "@/data/properties";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionIcon } from "@/lib/content/section-icons";

export const metadata: Metadata = {
  title: "Properties | Xscapecation Oasis",
  description:
    "Browse our direct-booking vacation rental properties in Tulsa, Oklahoma.",
};

type BannerContent = {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
};
type StepsContent = {
  eyebrow: string;
  heading: string;
  items: { title: string; description: string }[];
};

export default async function PropertiesPage() {
  const [properties, banner, steps] = await Promise.all([
    getProperties(),
    getSectionContent<BannerContent>("properties", "properties-banner"),
    getSectionContent<StepsContent>("properties", "steps"),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow={banner.eyebrow}
        title={banner.title}
        image={banner.image}
        imageAlt={banner.imageAlt}
      />

      <div className="bg-cream-dark pb-8">
        <div className="relative z-20 mx-auto -mt-8 w-full max-w-5xl px-6 lg:-mt-9 lg:px-10">
          <BookingWidget layout="bar" properties={properties} />
        </div>
      </div>

      <Properties hideHeading />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {steps.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              {steps.heading}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.items.map((step, i) => {
              const Icon = getSectionIcon("steps", i);
              return (
                <Reveal key={step.title} delay={i * 150}>
                  <div className="relative flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className="absolute top-4 right-5 font-serif text-4xl font-semibold text-wine-600/10">
                      0{i + 1}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-semibold text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                      {step.description}
                    </p>
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
