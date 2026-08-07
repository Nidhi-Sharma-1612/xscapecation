"use server";

import { getPropertyAvailability } from "@/lib/content/availability";

/**
 * Client-callable action for booking widgets that show a property picker
 * (Properties list, Book page) — lets them fetch a specific property's
 * synced Guesty availability on demand, once the guest picks it from the
 * dropdown, without turning the whole widget into a server component.
 */
export async function getAvailabilityAction(
  slug: string,
): Promise<{ blockedDates: string[] }> {
  const { blockedDates } = await getPropertyAvailability(slug);
  return { blockedDates };
}
