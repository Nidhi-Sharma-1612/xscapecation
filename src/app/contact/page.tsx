import { ExternalLink, Mail, Phone, Send } from "lucide-react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { getSectionContent } from "@/lib/content/sections";
import { getSiteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = {
  title: "Contact | Xscapecation Oasis",
  description:
    "Get in touch or book your direct stay at Xscapecation Oasis in Tulsa, Oklahoma.",
};

type BannerContent = {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
};
type ContactIntroContent = { eyebrow: string; heading: string; buttonText: string };

export default async function ContactPage() {
  const [banner, intro, settings] = await Promise.all([
    getSectionContent<BannerContent>("contact", "contact-banner"),
    getSectionContent<ContactIntroContent>("contact", "contact-intro"),
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

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:px-10">
          <form className="min-w-0 lg:col-span-3">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {intro.eyebrow}
            </p>
            <h2 className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              {intro.heading}
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-charcoal"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-wine-600"
                />
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-charcoal"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-wine-600"
                />
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-charcoal"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-wine-600"
                />
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="dates"
                  className="text-sm font-medium text-charcoal"
                >
                  Preferred Dates
                </label>
                <input
                  id="dates"
                  name="dates"
                  type="text"
                  placeholder="e.g. Aug 12 – Aug 16"
                  className="mt-2 w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-wine-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-charcoal"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-lg border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-wine-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-wine-600 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-wine-700"
            >
              <Send className="h-4 w-4" />
              {intro.buttonText}
            </button>
          </form>

          <div className="min-w-0 lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Contact Details
              </h3>
              <ul className="mt-6 space-y-5 text-sm text-charcoal/80">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href={telHref} className="transition hover:text-wine-600">
                    {settings.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition hover:text-wine-600"
                  >
                    {settings.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Also Booking On
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {settings.bookingPlatforms.map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 px-4 py-2 text-sm text-charcoal transition hover:border-wine-600 hover:text-wine-600"
                  >
                    {platform.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
