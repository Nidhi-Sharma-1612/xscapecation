import { PROPERTIES } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import Reveal from "./Reveal";

export default function Properties({
  hideHeading = false,
}: {
  hideHeading?: boolean;
}) {
  return (
    <section id="properties" className="bg-cream-dark py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!hideHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              Where You&apos;ll Stay
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              Our Properties
            </h2>
            <p className="mt-4 text-base text-charcoal/70">
              Each home is hand-furnished and maintained by us — no
              middlemen, no surprises.
            </p>
          </Reveal>
        )}

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map((property, i) => (
            <Reveal key={property.name} delay={i * 120} className="h-full">
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
