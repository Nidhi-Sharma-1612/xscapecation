import { Phone } from "lucide-react";
import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { getProperties } from "@/data/properties";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionIcon } from "@/lib/content/section-icons";
import { getSiteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = {
  title: "Book | Xscapecation Oasis",
  description:
    "Reserve your stay direct with Xscapecation Oasis — the best rate, no platform fees, and a real host on the other end.",
};

type BannerContent = {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
};
type BookIntroContent = { paragraph: string; items: { label: string }[] };

export default async function BookPage() {
  const [properties, banner, intro, settings] = await Promise.all([
    getProperties(),
    getSectionContent<BannerContent>("book", "book-banner"),
    getSectionContent<BookIntroContent>("book", "book-intro"),
    getSiteSettings(),
  ]);
  const telHref = `tel:1${settings.phone.replace(/\D/g, "")}`;

  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow={banner.eyebrow}
        title={banner.title}
        image={banner.image}
        imageAlt={banner.imageAlt}
      />

      <section className="bg-cream-dark py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-base text-charcoal/70">{intro.paragraph}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-charcoal/70">
              {intro.items.map((badge, i) => {
                const Icon = getSectionIcon("book-intro", i);
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4 text-wine-600" />
                    {badge.label}
                  </span>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={150} className="relative z-10 mt-10">
            <BookingWidget
              layout="card"
              properties={properties}
              className="p-8"
              showAvailability
            />
          </Reveal>

          <Reveal delay={250} className="mt-10 text-center">
            <p className="text-sm text-charcoal/60">
              Prefer to talk it through first?
            </p>
            <a
              href={telHref}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-wine-600 hover:underline"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
