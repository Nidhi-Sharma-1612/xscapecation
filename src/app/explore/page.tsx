import type { Metadata } from "next";
import CTA from "@/components/CTA";
import Explore from "@/components/Explore";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionIcon } from "@/lib/content/section-icons";

export const metadata: Metadata = {
  title: "Explore | Xscapecation Oasis",
  description:
    "Discover what to see and do near Xscapecation Oasis in Tulsa, Oklahoma.",
};

type BannerContent = {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
};
type GettingAroundContent = {
  eyebrow: string;
  heading: string;
  paragraph: string;
  items: { value: string; label: string }[];
};

export default async function ExplorePage() {
  const [banner, gettingAround] = await Promise.all([
    getSectionContent<BannerContent>("explore", "explore-banner"),
    getSectionContent<GettingAroundContent>("explore", "getting-around"),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow={banner.eyebrow}
        title={banner.title}
        image={banner.image}
        imageAlt={banner.imageAlt}
      />

      <Explore hideHeading />

      <section className="bg-cream-dark py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {gettingAround.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              {gettingAround.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70">
              {gettingAround.paragraph}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gettingAround.items.map((fact, i) => {
              const Icon = getSectionIcon("getting-around", i);
              return (
                <Reveal key={fact.label} delay={i * 120}>
                  <div className="flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-serif text-2xl font-semibold text-charcoal">
                      {fact.value}
                    </p>
                    <p className="mt-1 text-sm text-charcoal/60">
                      {fact.label}
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
