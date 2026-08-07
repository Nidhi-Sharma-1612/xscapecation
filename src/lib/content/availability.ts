import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as ical from "node-ical";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { logActivity } from "@/lib/content/activity";

/**
 * Guesty Lite exposes no API — the only sync mechanism available is a
 * per-listing iCal export link (blocked dates only, no pricing, and Guesty
 * itself documents a 15-minute-to-several-hour propagation delay). This
 * re-syncs lazily on read rather than on a cron schedule, since there's no
 * real-time guarantee to chase anyway.
 */
const SYNC_STALE_MS = 60 * 60 * 1000; // 60 minutes

export type PropertyAvailability = {
  blockedDates: string[];
  availabilitySyncedAt: Date | null;
};

function expandBlockedDates(events: ical.CalendarResponse): string[] {
  const dates = new Set<string>();

  for (const value of Object.values(events)) {
    if (!value || value.type !== "VEVENT") continue;
    const event = value as ical.VEvent;
    if (!event.start) continue;

    const start = new Date(event.start);
    // DTEND is exclusive per iCal convention — the day after the last
    // blocked night — so a missing end just blocks the single start day.
    const end = event.end ? new Date(event.end) : new Date(start.getTime() + 86_400_000);

    for (const d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      dates.add(d.toISOString().slice(0, 10));
    }
  }

  return Array.from(dates).sort();
}

async function performSync(propertyId: string, icalUrl: string): Promise<string[]> {
  const events = await ical.async.fromURL(icalUrl);
  const blockedDates = expandBlockedDates(events);

  await db
    .update(properties)
    .set({ blockedDates, availabilitySyncedAt: new Date() })
    .where(eq(properties.id, propertyId));

  return blockedDates;
}

/**
 * Public read for the property detail page. Lazily re-syncs from the
 * property's Guesty iCal feed if the cached data is missing or older than
 * an hour; falls back to whatever's cached (or empty) on any fetch/parse
 * failure so a slow or briefly-broken feed never breaks the page.
 */
export async function getPropertyAvailability(
  slug: string,
): Promise<PropertyAvailability> {
  const [row] = await db
    .select({
      id: properties.id,
      guestyICalUrl: properties.guestyICalUrl,
      blockedDates: properties.blockedDates,
      availabilitySyncedAt: properties.availabilitySyncedAt,
    })
    .from(properties)
    .where(eq(properties.slug, slug))
    .limit(1);

  if (!row || !row.guestyICalUrl) {
    return {
      blockedDates: row?.blockedDates ?? [],
      availabilitySyncedAt: row?.availabilitySyncedAt ?? null,
    };
  }

  const isStale =
    !row.availabilitySyncedAt ||
    Date.now() - row.availabilitySyncedAt.getTime() > SYNC_STALE_MS;

  if (!isStale) {
    return {
      blockedDates: row.blockedDates,
      availabilitySyncedAt: row.availabilitySyncedAt,
    };
  }

  try {
    const blockedDates = await performSync(row.id, row.guestyICalUrl);
    return { blockedDates, availabilitySyncedAt: new Date() };
  } catch {
    return {
      blockedDates: row.blockedDates,
      availabilitySyncedAt: row.availabilitySyncedAt,
    };
  }
}

/** Admin-triggered immediate sync — used by the "Sync Now" button. */
export async function syncPropertyAvailabilityNow(
  propertyId: string,
  adminUserId: string | null,
): Promise<PropertyAvailability> {
  const [row] = await db
    .select({
      slug: properties.slug,
      name: properties.name,
      guestyICalUrl: properties.guestyICalUrl,
    })
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);

  if (!row) throw new Error("Property not found.");
  if (!row.guestyICalUrl) {
    throw new Error("No Guesty iCal URL is set for this property.");
  }

  const blockedDates = await performSync(propertyId, row.guestyICalUrl);

  await logActivity({
    adminUserId,
    action: `Synced Guesty calendar for "${row.name}"`,
    entityType: "property",
    entityLabel: row.name,
  });

  revalidatePath(`/properties/${row.slug}`);

  return { blockedDates, availabilitySyncedAt: new Date() };
}
