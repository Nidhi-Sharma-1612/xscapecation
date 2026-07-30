import { ArrowUpRight, Coffee, Music, TreePine } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";

const EXPLORE = [
  {
    title: "Gathering Place",
    category: "Culture & Recreation",
    icon: TreePine,
    description:
      "One of the country's top-rated public parks — playgrounds, gardens, and river trails minutes away.",
    image: "/images/explore/gathering-place.jpg",
    linkLabel: "Experience Tulsa",
    href: "https://www.tulsago.com/local",
  },
  {
    title: "Guthrie Green",
    category: "Events Around Town",
    icon: Music,
    description:
      "Free concerts, festivals, and a weekly farmers market in the heart of the Tulsa Arts District.",
    image: "/images/explore/guthrie-green.jpg",
    linkLabel: "Upcoming Events",
    href: "https://www.tulsago.com/experience",
  },
  {
    title: "Local Coffee & Food",
    category: "Food & Drink",
    icon: Coffee,
    description:
      "Walkable cafes and restaurants around Kendall-Whittier and downtown Tulsa.",
    image: "/images/explore/local-coffee.jpg",
    linkLabel: "Local Food",
    href: "https://www.tulsago.com/eat",
  },
];

export default function Explore({
  hideHeading = false,
}: {
  hideHeading?: boolean;
}) {
  return (
    <section id="explore" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!hideHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              Beyond the Door
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              Explore Tulsa
            </h2>
            <p className="mt-4 text-base text-charcoal/70">
              A few of our favorite things to see and do near the property.
            </p>
          </Reveal>
        )}

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {EXPLORE.map((place, i) => (
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
                    <place.icon className="h-3.5 w-3.5" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
