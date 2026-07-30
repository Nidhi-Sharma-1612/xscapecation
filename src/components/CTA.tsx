import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-wine-600 via-wine-700 to-wine-900 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-gold-300 uppercase">
          Home Away From Home
        </p>
        <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
          Ready to Xscape?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
          Book direct for the best rate — no third-party fees, just a home
          that&apos;s ready when you are.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-10 py-4 text-sm font-semibold tracking-wide text-charcoal transition hover:-translate-y-0.5 hover:bg-gold-300"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Your Stay
          </Link>
          <a
            href="tel:19189463014"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-10 py-4 text-sm font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Call Us
          </a>
        </div>
      </Reveal>
    </section>
  );
}
