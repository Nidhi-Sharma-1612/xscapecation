"use client";

import { CalendarCheck, Minus, Plus, Search, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { getAvailabilityAction } from "@/app/properties/actions";
import type { Property } from "@/data/properties";
import DateRangePicker from "./DateRangePicker";

function rangeOverlapsBlocked(
  checkIn: string,
  checkOut: string,
  unavailableDates: string[],
) {
  if (!checkIn || !checkOut) return false;
  return unavailableDates.some((d) => d >= checkIn && d < checkOut);
}

export default function BookingWidget({
  layout = "card",
  property,
  properties,
  className = "",
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  unavailableDates = [],
  showAvailability = false,
  navigateCtaLabel = "checkAvailability",
}: {
  layout?: "bar" | "card";
  property?: Property;
  properties?: Property[];
  className?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  unavailableDates?: string[];
  /** List mode only: fetch and show the picked property's synced Guesty
   * availability as soon as it's selected from the dropdown, rather than
   * waiting until the guest lands on that property's own page. */
  showAvailability?: boolean;
  /** List mode only: label/icon for the CTA that navigates to the selected
   * property's page. Defaults to "Check Availability" + a search icon. */
  navigateCtaLabel?: "checkAvailability" | "bookNow";
}) {
  // No default date range — the picker starts empty ("Add date") so guests
  // always make a deliberate choice, unless dates arrive via prefill
  // (e.g. navigated here from another widget with dates already picked).
  const [checkIn, setCheckIn] = useState(() => initialCheckIn || "");
  const [checkOut, setCheckOut] = useState(() => initialCheckOut || "");
  const [guests, setGuests] = useState(() => initialGuests ?? 1);
  // No "Any Property" option — the picker always has a real property
  // selected, defaulting to the first one, so "Check Availability" always
  // has a specific property's page to send the guest to.
  const [selectedSlug, setSelectedSlug] = useState(
    () => properties?.[0]?.slug ?? "",
  );

  // Fixed single-property mode (property detail page) is the terminal step
  // that hands off to Guesty for payment. List mode (property picker, used
  // on Hero/Properties/Book) instead navigates to that property's own page.
  const isTerminal = Boolean(property);

  const selectedProperty =
    property ?? properties?.find((p) => p.slug === selectedSlug);

  const [fetchedUnavailableDates, setFetchedUnavailableDates] = useState<
    string[]
  >([]);
  const [loadingAvailability, startAvailabilityFetch] = useTransition();

  useEffect(() => {
    if (!showAvailability || isTerminal || !selectedProperty) return;

    let cancelled = false;
    const slug = selectedProperty.slug;

    startAvailabilityFetch(async () => {
      const { blockedDates } = await getAvailabilityAction(slug);
      if (!cancelled) setFetchedUnavailableDates(blockedDates);
    });

    return () => {
      cancelled = true;
    };
  }, [showAvailability, isTerminal, selectedProperty]);

  const effectiveUnavailableDates = isTerminal
    ? unavailableDates
    : selectedProperty
      ? fetchedUnavailableDates
      : [];

  const internalHref = useMemo(() => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(guests));
    const path = selectedProperty
      ? `/properties/${selectedProperty.slug}`
      : "/properties";
    return `${path}?${params.toString()}`;
  }, [selectedProperty, checkIn, checkOut, guests]);

  const guestyHref = useMemo(() => {
    if (!selectedProperty) return "";
    const params = new URLSearchParams();
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    params.set("minOccupancy", String(guests));
    params.set("adults", String(guests));
    // Skip Guesty's property/"Request to Book" landing page and go straight
    // to checkout — confirmed as a stable, directly-linkable route (not a
    // one-time session URL) by following the real flow manually.
    const baseUrl = selectedProperty.bookingUrl.replace(/\/$/, "");
    return `${baseUrl}/checkout?${params.toString()}`;
  }, [selectedProperty, checkIn, checkOut, guests]);

  const hasValidDates = Boolean(checkIn && checkOut);
  const isUnavailable = rangeOverlapsBlocked(
    checkIn,
    checkOut,
    effectiveUnavailableDates,
  );

  const isBar = layout === "bar";

  return (
    <div
      className={`${
        isBar
          ? "flex flex-col divide-y divide-charcoal/10 rounded-2xl bg-white shadow-xl lg:flex-row lg:divide-x lg:divide-y-0"
          : "rounded-2xl border border-gold-100 bg-white p-6 shadow-sm"
      } ${className}`}
    >
      {!property && properties && properties.length > 0 && (
        <div className={isBar ? "flex-1 px-5 py-3 lg:py-2.5" : "mb-4"}>
          <label className="block text-[11px] font-semibold tracking-wide text-charcoal/50 uppercase">
            Property
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm font-medium text-charcoal outline-none"
          >
            {properties.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={isBar ? "flex-1 px-5 py-3 lg:py-2.5" : ""}>
        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(nextCheckIn, nextCheckOut) => {
            setCheckIn(nextCheckIn);
            setCheckOut(nextCheckOut);
          }}
          layout={layout}
          unavailableDates={effectiveUnavailableDates}
        />
        {loadingAvailability && (
          <p className="mt-1.5 text-xs text-charcoal/40">
            Checking availability…
          </p>
        )}
      </div>

      <div className={isBar ? "px-5 py-3 lg:py-2.5" : "mt-4"}>
        <label className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-charcoal/50 uppercase">
          <Users className="h-3.5 w-3.5" />
          Guests
        </label>
        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease guests"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-wine-600 hover:text-wine-600"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-4 text-center text-sm font-medium text-charcoal">
            {guests}
          </span>
          <button
            type="button"
            aria-label="Increase guests"
            onClick={() => setGuests((g) => Math.min(12, g + 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-wine-600 hover:text-wine-600"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className={isBar ? "p-3 lg:flex lg:items-center" : "mt-6"}>
        {isTerminal ? (
          isUnavailable ? (
            <button
              type="button"
              disabled
              className={`flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-charcoal/10 text-sm font-semibold text-charcoal/50 ${
                isBar ? "h-full w-full px-6 py-3 lg:w-auto" : "w-full px-6 py-3.5"
              }`}
            >
              Unavailable for These Dates
            </button>
          ) : (
            <a
              href={guestyHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!hasValidDates}
              onClick={(e) => {
                if (!hasValidDates) e.preventDefault();
              }}
              className={`flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                hasValidDates
                  ? "bg-wine-600 text-white hover:bg-wine-700"
                  : "cursor-not-allowed bg-charcoal/10 text-charcoal/50"
              } ${isBar ? "h-full w-full px-6 py-3 lg:w-auto" : "w-full px-6 py-3.5"}`}
            >
              <CalendarCheck className="h-4 w-4" />
              {hasValidDates ? "Book Now" : "Select Dates"}
            </a>
          )
        ) : (
          <Link
            href={internalHref}
            className={`flex items-center justify-center gap-2 rounded-full bg-wine-600 text-sm font-semibold text-white transition hover:bg-wine-700 ${
              isBar ? "h-full w-full px-6 py-3 lg:w-auto" : "w-full px-6 py-3.5"
            }`}
          >
            {navigateCtaLabel === "bookNow" ? (
              <>
                <CalendarCheck className="h-4 w-4" />
                Book Now
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Check Availability
              </>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
