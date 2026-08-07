import {
  Bath,
  Bed,
  BedDouble,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import BookingWidget from "@/components/BookingWidget";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyGallery from "@/components/PropertyGallery";
import Reveal from "@/components/Reveal";
import { getProperties, getPropertyBySlug } from "@/data/properties";
import { getPropertyAvailability } from "@/lib/content/availability";
import { getSiteSettings } from "@/lib/content/site-settings";

export async function generateMetadata({
  params,
}: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: `${property.name} | Xscapecation Oasis`,
    description: property.description,
  };
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const query = (await searchParams) as {
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
  const [property, allProperties, settings, availability] = await Promise.all([
    getPropertyBySlug(slug),
    getProperties(),
    getSiteSettings(),
    getPropertyAvailability(slug),
  ]);
  if (!property) notFound();

  const otherProperties = allProperties.filter((p) => p.slug !== slug);
  const telHref = `tel:1${settings.phone.replace(/\D/g, "")}`;
  const parsedGuests = query.guests ? Number(query.guests) : undefined;

  const features = [
    { icon: Users, label: `${property.guests} Guests` },
    {
      icon: BedDouble,
      label: `${property.bedrooms} Bedroom${property.bedrooms > 1 ? "s" : ""}`,
    },
    ...(property.beds
      ? [{ icon: Bed, label: `${property.beds} Bed${property.beds > 1 ? "s" : ""}` }]
      : []),
    {
      icon: Bath,
      label: `${property.bathrooms} Bathroom${property.bathrooms > 1 ? "s" : ""}`,
    },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex min-h-[56vh] items-end overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/60" />

        <Navbar logoUrl={settings.logoUrl ?? undefined} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/properties" className="hover:text-white">
              Properties
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{property.name}</span>
          </div>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-white sm:text-5xl">
            {property.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold-300 text-gold-300" />
              {property.rating} · {property.reviews} Reviews
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold-300" />
              {property.location}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <PropertyGallery images={property.images} name={property.name} />
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3 lg:px-10">
          <div className="lg:col-span-2">
            <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-charcoal/10 pb-8">
              {features.map((feature) => (
                <span
                  key={feature.label}
                  className="flex items-center gap-2 text-sm font-medium text-charcoal/75"
                >
                  <feature.icon className="h-4 w-4 text-wine-600" />
                  {feature.label}
                </span>
              ))}
            </Reveal>

            <Reveal className="mt-8 border-b border-charcoal/10 pb-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                About This Property
              </h2>
              <p className="mt-4 text-base leading-relaxed whitespace-pre-line text-charcoal/75">
                {property.description}
              </p>
            </Reveal>

            {property.space && (
              <Reveal className="mt-8 border-b border-charcoal/10 pb-8">
                <h2 className="font-serif text-2xl font-semibold text-charcoal">
                  The Space
                </h2>
                <p className="mt-4 text-base leading-relaxed whitespace-pre-line text-charcoal/75">
                  {property.space}
                </p>
              </Reveal>
            )}

            <Reveal className="mt-8 border-b border-charcoal/10 pb-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                Amenities
              </h2>
              <div className="mt-6">
                <AmenitiesGrid amenities={property.amenities} />
              </div>
            </Reveal>

            <Reveal className="mt-8 border-b border-charcoal/10 pb-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                House Rules
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {property.houseRules.map((rule) => (
                  <span key={rule} className="text-sm text-charcoal/75">
                    {rule}
                  </span>
                ))}
              </div>
              {property.additionalRules && (
                <p className="mt-6 text-sm leading-relaxed text-charcoal/60">
                  {property.additionalRules}
                </p>
              )}
            </Reveal>

            <Reveal className="mt-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                Location
              </h2>
              <div className="mt-4 flex items-start gap-2 text-sm text-charcoal/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-wine-600" />
                {property.address}
              </div>
              <a
                href={property.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-wine-600 hover:underline"
              >
                View on Google Maps
              </a>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-1">
            <div className="sticky top-24">
              <p className="font-serif text-2xl font-semibold text-charcoal">
                ${property.priceFrom}
                <span className="text-sm font-normal text-charcoal/60">
                  {" "}
                  / night
                </span>
              </p>

              <div className="mt-4">
                <BookingWidget
                  layout="card"
                  property={property}
                  initialCheckIn={query.checkIn}
                  initialCheckOut={query.checkOut}
                  initialGuests={
                    parsedGuests && parsedGuests > 0 ? parsedGuests : undefined
                  }
                  unavailableDates={availability.blockedDates}
                />
              </div>
              {availability.availabilitySyncedAt && (
                <p className="mt-2 text-center text-xs text-charcoal/40">
                  Availability last checked {timeAgo(availability.availabilitySyncedAt)}
                </p>
              )}

              <div className="mt-6 space-y-3 text-sm text-charcoal/70">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-wine-600" />
                  Check-in {property.checkIn} · Check-out {property.checkOut}
                </div>
                <a
                  href={telHref}
                  className="flex items-center gap-2 transition hover:text-wine-600"
                >
                  <Phone className="h-4 w-4 shrink-0 text-wine-600" />
                  {settings.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {otherProperties.length > 0 && (
        <section className="bg-cream-dark py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-wine-600 uppercase">
                Keep Exploring
              </p>
              <h2 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
                Our Other Properties
              </h2>
            </Reveal>

            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
              {otherProperties.map((p, i) => (
                <Reveal key={p.slug} delay={i * 120} className="h-full">
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
      <Footer />
    </main>
  );
}
