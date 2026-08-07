"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  dateToISO,
  formatShort,
  getMonthMatrix,
  isoToDate,
  todayISO,
} from "@/lib/date";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  layout = "card",
  unavailableDates = [],
}: {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
  layout?: "bar" | "card";
  unavailableDates?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => isoToDate(checkIn || todayISO()));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const todayIso = todayISO();
  const cells = getMonthMatrix(viewDate);
  const blockedSet = new Set(unavailableDates);

  const rangeCrossesBlocked = (start: string, end: string) =>
    unavailableDates.some((blocked) => blocked > start && blocked < end);

  const handleDayClick = (date: Date) => {
    const iso = dateToISO(date);
    if (iso < todayIso || blockedSet.has(iso)) return;

    if (!checkIn || (checkIn && checkOut) || iso <= checkIn) {
      onChange(iso, "");
      return;
    }

    if (rangeCrossesBlocked(checkIn, iso)) return;

    onChange(checkIn, iso);
    setOpen(false);
  };

  const changeMonth = (delta: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const isBar = layout === "bar";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full text-left ${
          isBar
            ? "flex-1 flex-col gap-4 sm:flex-row sm:divide-x sm:divide-charcoal/10"
            : "grid grid-cols-2 gap-4"
        }`}
      >
        <span className={isBar ? "flex-1 sm:pr-4" : ""}>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-charcoal/50 uppercase">
            <CalendarDays className="h-3.5 w-3.5" />
            Check-In
          </span>
          <span className="mt-1 block text-sm font-medium text-charcoal">
            {checkIn ? formatShort(checkIn) : "Add date"}
          </span>
        </span>
        <span className={isBar ? "flex-1 sm:pl-4" : ""}>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-charcoal/50 uppercase">
            <CalendarDays className="h-3.5 w-3.5" />
            Check-Out
          </span>
          <span className="mt-1 block text-sm font-medium text-charcoal">
            {checkOut ? formatShort(checkOut) : "Add date"}
          </span>
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 z-30 mt-3 w-[19rem] -translate-x-1/2 rounded-2xl border border-charcoal/10 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream-dark hover:text-wine-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-serif text-sm font-semibold text-charcoal">
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream-dark hover:text-wine-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="text-[11px] font-semibold text-charcoal/40"
              >
                {day}
              </span>
            ))}

            {cells.map((date, i) => {
              if (!date) return <span key={`empty-${i}`} />;

              const iso = dateToISO(date);
              const isPast = iso < todayIso;
              const isBlocked = blockedSet.has(iso);
              const disabled = isPast || isBlocked;
              const isCheckIn = iso === checkIn;
              const isCheckOut = iso === checkOut;
              const inRange =
                !!checkIn && !!checkOut && iso > checkIn && iso < checkOut;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  aria-label={isBlocked ? `${date.getDate()} — unavailable` : undefined}
                  onClick={() => handleDayClick(date)}
                  className={`relative h-9 text-sm transition-colors ${
                    isBlocked
                      ? "cursor-not-allowed text-charcoal/25 line-through decoration-charcoal/30"
                      : isPast
                        ? "cursor-not-allowed text-charcoal/25"
                        : "text-charcoal hover:bg-cream-dark"
                  } ${inRange ? "bg-wine-600/10" : ""} ${
                    isCheckIn || isCheckOut
                      ? "rounded-full bg-wine-600 font-semibold text-white hover:bg-wine-600"
                      : "rounded-full"
                  } ${isCheckIn ? "rounded-r-none" : ""} ${
                    isCheckOut ? "rounded-l-none" : ""
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="mt-3 border-t border-charcoal/10 pt-3 text-center text-xs text-charcoal/50">
            {!checkIn || (checkIn && checkOut)
              ? "Select a check-in date"
              : "Select a check-out date"}
          </p>
          {unavailableDates.length > 0 && (
            <p className="mt-1 text-center text-[11px] text-charcoal/40">
              Struck-through dates are already booked
            </p>
          )}
        </div>
      )}
    </div>
  );
}
