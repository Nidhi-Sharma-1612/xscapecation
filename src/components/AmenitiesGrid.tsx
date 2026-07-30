"use client";

import { useState } from "react";
import { getAmenityIcon } from "@/lib/amenity-icons";

const PREVIEW_COUNT = 8;

export default function AmenitiesGrid({ amenities }: { amenities: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? amenities : amenities.slice(0, PREVIEW_COUNT);
  const hasMore = amenities.length > PREVIEW_COUNT;

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
        {visible.map((label) => {
          const Icon = getAmenityIcon(label);
          return (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0 text-wine-600" />
              <span className="text-sm text-charcoal/75">{label}</span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 text-sm font-semibold text-wine-600 underline-offset-4 hover:underline"
        >
          {expanded
            ? "Show less"
            : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </div>
  );
}
