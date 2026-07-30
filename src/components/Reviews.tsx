import { Star } from "lucide-react";
import Reveal from "./Reveal";
import ReviewsCarousel, { type Review } from "./ReviewsCarousel";

const REVIEWS: Review[] = [
  {
    quote:
      "The home was clean and comfortable. There were explanations of everything in a notebook on a desk. Free wifi, which the kids enjoyed. Good neighborhood also! The owner was nice and easy to get a hold of if I needed them.",
    name: "Jodi",
    detail: "Verified Guest",
  },
  {
    quote:
      "The host is absolutely precious and the home is so sweet — by far my favorite stay thus far. It was so cute and cozy, I hate I didn't stay longer.",
    name: "Angel",
    detail: "Verified Guest",
  },
  {
    quote:
      "Exactly like the photos — better, actually. Walking distance to campus made the whole trip so easy.",
    name: "Marcus",
    detail: "Verified Guest",
  },
  {
    quote:
      "Loved the porch in the mornings. Spotless, well-stocked kitchen, and quick to respond to every message.",
    name: "Priya",
    detail: "Verified Guest",
  },
  {
    quote:
      "Self check-in made a late arrival painless. The bed was incredibly comfortable and the kitchen had everything we needed.",
    name: "Devon",
    detail: "Verified Guest",
  },
  {
    quote:
      "Booked direct and it was a breeze. Would stay again for our next trip to Tulsa without a second thought.",
    name: "Sarah",
    detail: "Verified Guest",
  },
  {
    quote:
      "Quiet neighborhood, close to everything downtown, and the host was quick to answer every question we had.",
    name: "Anthony",
    detail: "Verified Guest",
  },
  {
    quote:
      "Private parking made unloading so easy, and the place was even better in person. Already planning our next visit.",
    name: "Renee",
    detail: "Verified Guest",
  },
];

export default function Reviews({
  hideHeading = false,
  limit,
}: {
  hideHeading?: boolean;
  limit?: number;
}) {
  const reviews = limit ? REVIEWS.slice(0, limit) : REVIEWS;

  return (
    <section id="reviews" className="bg-cream-dark py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!hideHeading && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              Guest Love
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              Reviews
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-charcoal/70">
              <span className="flex items-center gap-1 text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                ))}
              </span>
              <span>4.9 · 196 Verified Stays</span>
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
