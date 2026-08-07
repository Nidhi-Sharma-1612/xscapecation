"use client";

import {
  ArrowRight,
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const [index, setIndex] = useState(0);
  const hasGallery = property.images.length > 1;

  const showPrev = () =>
    setIndex((i) => (i - 1 + property.images.length) % property.images.length);
  const showNext = () => setIndex((i) => (i + 1) % property.images.length);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-tl-xl rounded-tr-[2.5rem] rounded-br-xl rounded-bl-[2.5rem] border border-gold-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl">
      <div className="relative h-64 shrink-0 overflow-hidden">
        <Image
          src={property.images[index]}
          alt={`${property.name} at Xscapecation Oasis`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />

        {hasGallery && (
          <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              aria-label="Previous image"
              onClick={showPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/50 text-white transition-colors hover:bg-charcoal/75"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={showNext}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/50 text-white transition-colors hover:bg-charcoal/75"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1.5 text-xs font-semibold text-gold-700">
            <Star className="h-3.5 w-3.5 shrink-0 fill-gold-700 text-gold-700" />
            {property.rating} · {property.reviews} Reviews
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="rounded-full bg-charcoal/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            From ${property.priceFrom}/night
          </span>
        </div>

        {hasGallery && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {property.images.map((img, i) => (
              <span
                key={img}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium tracking-wide text-wine-600">
          {property.location}
        </p>
        <Link href={`/properties/${property.slug}`}>
          <h3 className="mt-1 font-serif text-xl text-charcoal transition-colors hover:text-wine-600">
            {property.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal/70">
          {property.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-charcoal/60">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> {property.guests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" /> {property.bedrooms} Bed
            {property.bedrooms > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5" /> {property.bathrooms} Bath
            {property.bathrooms > 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={`/properties/${property.slug}`}
            className="group/link inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-wine-600 transition-all hover:gap-2.5"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
