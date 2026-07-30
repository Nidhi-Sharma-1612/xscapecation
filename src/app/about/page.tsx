import { BadgePercent, CalendarClock, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About | Xscapecation Oasis",
  description:
    "Learn the story behind Xscapecation Oasis, a direct-booking vacation rental in Tulsa, Oklahoma.",
};

const VALUES = [
  {
    title: "Best Rate, Guaranteed",
    description:
      "Book direct and skip the third-party service fees that come with other platforms.",
    icon: BadgePercent,
  },
  {
    title: "Direct Communication",
    description:
      "Reach us any time before, during, and after your stay — no call centers, no middlemen.",
    icon: MessageCircle,
  },
  {
    title: "Flexible Terms",
    description:
      "Need to adjust your dates or have a special request? We work with you directly.",
    icon: CalendarClock,
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBanner
        eyebrow="Home Away From Home"
        title="About Us"
        image="/images/properties/oasis-1/1.jpg"
        imageAlt="Cozy living room at Xscapecation Oasis"
      />

      <About hideHeading />

      <section className="bg-cream-dark py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              Why Book Direct
            </p>
            <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
              No Middlemen, Just Us
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 120}>
                <div className="flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
