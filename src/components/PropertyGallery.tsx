"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-gallery-card]");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {images.map((src, i) => (
          <div
            key={src}
            data-gallery-card
            className="relative h-56 w-72 shrink-0 snap-start overflow-hidden rounded-xl sm:h-64 sm:w-80"
          >
            <Image
              src={src}
              alt={`${name} — photo ${i + 1}`}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => scrollByCard(-1)}
        className="absolute top-1/2 -left-4 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-white text-charcoal shadow-sm transition-colors hover:border-wine-600 hover:text-wine-600 lg:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => scrollByCard(1)}
        className="absolute top-1/2 -right-4 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-white text-charcoal shadow-sm transition-colors hover:border-wine-600 hover:text-wine-600 lg:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
