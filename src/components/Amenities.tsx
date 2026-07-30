import { KeyRound, Laptop, Sparkles, ShowerHead, UtensilsCrossed, Wifi } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";

const AMENITIES = [
  {
    title: "Self Check-In",
    description: "Skip the front desk — let yourself in on your schedule.",
    image: "/images/amenities/self-checkin.jpg",
    icon: KeyRound,
  },
  {
    title: "Complimentary Wi-Fi",
    description: "Fast, reliable internet for streaming and remote work.",
    image: "/images/amenities/wifi.jpg",
    icon: Wifi,
  },
  {
    title: "Fresh Linens",
    description: "Hotel-quality bedding, washed and ready for every stay.",
    image: "/images/amenities/linens.jpg",
    icon: Sparkles,
  },
  {
    title: "Hotel-Style Toiletries",
    description: "Little luxuries stocked in every bathroom.",
    image: "/images/amenities/toiletries.jpg",
    icon: ShowerHead,
  },
  {
    title: "Dedicated Office Space",
    description: "A quiet corner to stay productive while you travel.",
    image: "/images/amenities/office.jpg",
    icon: Laptop,
  },
  {
    title: "Fully Equipped Kitchen",
    description: "Everything you need to cook a real meal at home.",
    image: "/images/amenities/kitchen.jpg",
    icon: UtensilsCrossed,
  },
];

export default function Amenities({
  hideHeading = false,
}: {
  hideHeading?: boolean;
}) {
  return (
    <section id="amenities" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!hideHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              Comfort, Covered
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              Amenities
            </h2>
            <p className="mt-4 text-base text-charcoal/70">
              Everything you need for a stay that feels like home.
            </p>
          </Reveal>
        )}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((amenity, i) => (
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
                    <amenity.icon className="h-5 w-5" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
