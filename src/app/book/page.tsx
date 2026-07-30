import { DollarSign, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { PROPERTIES } from "@/data/properties";

export const metadata: Metadata = {
  title: "Book | Xscapecation Oasis",
  description:
    "Reserve your stay direct with Xscapecation Oasis — the best rate, no platform fees, and a real host on the other end.",
};

const BADGES = [
  { icon: DollarSign, label: "$0 Service Fees" },
  { icon: ShieldCheck, label: "Best Rate Guaranteed" },
  { icon: MessageCircle, label: "Direct Host Access" },
];

export default function BookPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow="Direct Reservation"
        title="Reserve Your Stay"
        image="/images/properties/oasis-2/3.jpg"
        imageAlt="Bright open-concept living area at Xscapecation Oasis"
      />

      <section className="bg-cream-dark py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-base text-charcoal/70">
              Book directly with us and enjoy the best rate, no third-party
              fees, and a real host on the other end.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-charcoal/70">
              {BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2"
                >
                  <badge.icon className="h-4 w-4 text-wine-600" />
                  {badge.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-10">
            <BookingWidget
              layout="card"
              properties={PROPERTIES}
              className="p-8"
            />
          </Reveal>

          <Reveal delay={250} className="mt-10 text-center">
            <p className="text-sm text-charcoal/60">
              Prefer to talk it through first?
            </p>
            <a
              href="tel:19189463014"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-wine-600 hover:underline"
            >
              <Phone className="h-4 w-4" />
              (918) 946-3014
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
