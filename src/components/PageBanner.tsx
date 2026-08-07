import Image from "next/image";
import Navbar from "./Navbar";
import { getSiteSettings } from "@/lib/content/site-settings";

export default async function PageBanner({
  eyebrow,
  title,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
}) {
  const settings = await getSiteSettings();

  return (
    <section className="relative flex min-h-[46vh] items-center overflow-hidden">
      <Image src={image} alt={imageAlt} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/60" />

      <Navbar logoUrl={settings.logoUrl ?? undefined} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 text-center lg:px-10">
        <p className="mb-4 inline-block rounded-full border border-gold-300/40 bg-charcoal/40 px-4 py-1.5 text-sm font-semibold tracking-[0.3em] text-gold-300 uppercase backdrop-blur-sm">
          {eyebrow}
        </p>
        <h1 className="font-serif text-5xl font-semibold text-white sm:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
