"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Review = {
  quote: string;
  name: string;
  detail: string;
};

const AUTOPLAY_INTERVAL = 4500;

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {reviews.map((review) => (
          <figure
            key={review.name}
            data-review-card
            className="flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <div>
              <Quote className="h-7 w-7 text-gold-300" />
              <div className="mt-4 mb-4 flex gap-1 text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <blockquote className="text-base leading-relaxed text-charcoal/80">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-6 text-sm font-semibold text-charcoal">
              {review.name}
              <span className="block font-normal text-charcoal/50">
                {review.detail}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={() => scrollByCard(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-wine-600 hover:text-wine-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next reviews"
          onClick={() => scrollByCard(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-wine-600 hover:text-wine-600"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
