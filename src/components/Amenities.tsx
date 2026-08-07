import Image from "next/image";
import Reveal from "./Reveal";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionIcon } from "@/lib/content/section-icons";

type AmenitiesIntroContent = { eyebrow: string; heading: string; subheading: string };
type AmenityItem = { title: string; description: string; image: string };
type AmenitiesGridContent = { items: AmenityItem[] };

export default async function Amenities({
  hideHeading = false,
}: {
  hideHeading?: boolean;
}) {
  const [intro, grid] = await Promise.all([
    getSectionContent<AmenitiesIntroContent>("amenities", "amenities-intro"),
    getSectionContent<AmenitiesGridContent>("amenities", "amenities-grid"),
  ]);

  return (
    <section id="amenities" className="bg-cream py-24">
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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {grid.items.map((amenity, i) => {
            const Icon = getSectionIcon("amenities-grid", i);
            return (
              <Reveal key={amenity.title} delay={(i % 3) * 120}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={amenity.image}
                      alt={amenity.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-wine-600 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-charcoal">
                      {amenity.title}
                    </h3>
                    <p className="mt-2 text-sm text-charcoal/70">
                      {amenity.description}
                    </p>
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
