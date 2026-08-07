import { Star } from "lucide-react";
import Reveal from "./Reveal";
import ReviewsCarousel, { type Review } from "./ReviewsCarousel";
import { getSectionContent } from "@/lib/content/sections";

type ReviewsContent = {
  eyebrow: string;
  heading: string;
  ratingText: string;
  items: Review[];
};

export default async function Reviews({
  hideHeading = false,
  limit,
}: {
  hideHeading?: boolean;
  limit?: number;
}) {
  const content = await getSectionContent<ReviewsContent>("review", "reviews");
  const reviews = limit ? content.items.slice(0, limit) : content.items;

  return (
    <section id="reviews" className="bg-cream-dark py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!hideHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {content.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              {content.heading}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-charcoal/70">
              <span className="flex items-center gap-1 text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                ))}
              </span>
              <span>{content.ratingText}</span>
            </div>
          </Reveal>
        )}

        <Reveal delay={150} className="mt-16">
          <ReviewsCarousel reviews={reviews} />
        </Reveal>
      </div>
    </section>
  );
}
