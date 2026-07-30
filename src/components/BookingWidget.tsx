"use client";

import { Minus, Plus, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import type { Property } from "@/data/properties";
import { addDaysISO, todayISO } from "@/lib/date";
import DateRangePicker from "./DateRangePicker";

const BOOKING_BASE_URL = "https://book.xscapecations.com/en/properties";

export default function BookingWidget({
  layout = "card",
  property,
  properties,
  className = "",
}: {
  layout?: "bar" | "card";
  property?: Property;
  properties?: Property[];
  className?: string;
}) {
  const [checkIn, setCheckIn] = useState(() => todayISO());
  const [checkOut, setCheckOut] = useState(() => addDaysISO(todayISO(), 3));
  const [guests, setGuests] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState("");

  const selectedProperty =
    property ?? properties?.find((p) => p.slug === selectedSlug);

  const href = useMemo(() => {
    const base = selectedProperty ? selectedProperty.bookingUrl : BOOKING_BASE_URL;
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("minOccupancy", String(guests));
    params.set("adults", String(guests));
    return `${base}?${params.toString()}`;
  }, [selectedProperty, checkIn, checkOut, guests]);

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
            <option value="">Any Property</option>
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
        />
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
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 rounded-full bg-wine-600 text-sm font-semibold text-white transition hover:bg-wine-700 ${
            isBar ? "h-full w-full px-6 py-3 lg:w-auto" : "w-full px-6 py-3.5"
          }`}
        >
          <Search className="h-4 w-4" />
          Check Availability
        </a>
      </div>
    </div>
  );
}
