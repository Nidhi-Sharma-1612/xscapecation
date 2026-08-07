import type { Metadata } from "next";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionIcon } from "@/lib/content/section-icons";

export const metadata: Metadata = {
  title: "About | Xscapecation Oasis",
  description:
    "Learn the story behind Xscapecation Oasis, a direct-booking vacation rental in Tulsa, Oklahoma.",
};

type BannerContent = {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
};
type ValuesContent = {
  eyebrow: string;
  heading: string;
  items: { title: string; description: string }[];
};

export default async function AboutPage() {
  const [banner, values] = await Promise.all([
    getSectionContent<BannerContent>("about", "about-banner"),
    getSectionContent<ValuesContent>("about", "about-values"),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow={banner.eyebrow}
        title={banner.title}
        image={banner.image}
        imageAlt={banner.imageAlt}
      />

      <About hideHeading />

      <section className="bg-cream-dark py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {values.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              {values.heading}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.items.map((value, i) => {
              const Icon = getSectionIcon("about-values", i);
              return (
                <Reveal key={value.title} delay={i * 120}>
                  <div className="flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-semibold text-charcoal">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                      {value.description}
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
