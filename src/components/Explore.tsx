import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionIcon } from "@/lib/content/section-icons";

type ExploreIntroContent = { eyebrow: string; heading: string; subheading: string };
type ExploreItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  linkLabel: string;
  href: string;
};
type ExploreCardsContent = { items: ExploreItem[] };

export default async function Explore({
  hideHeading = false,
}: {
  hideHeading?: boolean;
}) {
  const [intro, cards] = await Promise.all([
    getSectionContent<ExploreIntroContent>("explore", "explore-intro"),
    getSectionContent<ExploreCardsContent>("explore", "explore-cards"),
  ]);

  return (
    <section id="explore" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!hideHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {intro.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              {intro.heading}
            </h2>
            <p className="mt-4 text-base text-charcoal/70">{intro.subheading}</p>
          </Reveal>
        )}

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.items.map((place, i) => {
            const Icon = getSectionIcon("explore-cards", i);
            return (
              <Reveal key={place.title} delay={i * 120}>
                <div className="group relative h-96 overflow-hidden rounded-2xl">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
                      <Icon className="h-3.5 w-3.5" />
                      {place.category}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-white">
                      {place.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      {place.description}
                    </p>
                    <a
                      href={place.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold-300/70 px-4 py-2 text-xs font-semibold tracking-wide text-gold-300 transition hover:bg-gold-300 hover:text-charcoal"
                    >
                      {place.linkLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
