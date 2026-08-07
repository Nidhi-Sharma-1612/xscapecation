import { asc, eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import type { Property } from "@/data/properties";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { logActivity } from "@/lib/content/activity";

type PropertyRow = typeof properties.$inferSelect;

export type PropertyInput = {
  slug: string;
  name: string;
  location: string;
  address: string;
  mapUrl: string;
  description: string;
  space: string | null;
  images: string[];
  guests: number;
  bedrooms: number;
  beds: number | null;
  bathrooms: number;
  rating: number;
  reviews: number;
  priceFrom: number;
  bookingUrl: string;
  checkIn: string;
  checkOut: string;
  amenities: string[];
  houseRules: string[];
  additionalRules: string | null;
};

function rowToProperty(row: PropertyRow): Property {
  return {
    slug: row.slug,
    name: row.name,
    location: row.location,
    address: row.address,
    mapUrl: row.mapUrl,
    description: row.description,
    space: row.space ?? undefined,
    images: row.images,
    guests: row.guests,
    bedrooms: row.bedrooms,
    beds: row.beds ?? undefined,
    bathrooms: row.bathrooms,
    rating: row.rating,
    reviews: row.reviews,
    priceFrom: Number(row.priceFrom),
    bookingUrl: row.bookingUrl,
    checkIn: row.checkIn,
    checkOut: row.checkOut,
    amenities: row.amenities,
    houseRules: row.houseRules,
    additionalRules: row.additionalRules ?? undefined,
  };
}

/**
 * Public-shaped reads — used by the marketing site. Wrapped in React's
 * `cache()` so multiple sibling components requesting the same data in one
 * render (e.g. Hero and Properties both call getProperties) share a single
 * DB round-trip instead of each firing their own query.
 */
export const getProperties = cache(async (): Promise<Property[]> => {
  const rows = await db
    .select()
    .from(properties)
    .orderBy(asc(properties.sortOrder));
  return rows.map(rowToProperty);
});

export const getPropertyBySlug = cache(
  async (slug: string): Promise<Property | undefined> => {
    const [row] = await db
      .select()
      .from(properties)
      .where(eq(properties.slug, slug))
      .limit(1);
    return row ? rowToProperty(row) : undefined;
  },
);

/** Admin reads — include id/sortOrder for management UI. */
export async function getAdminProperties(): Promise<PropertyRow[]> {
  return db.select().from(properties).orderBy(asc(properties.sortOrder));
}

export async function getAdminPropertyById(
  id: string,
): Promise<PropertyRow | undefined> {
  const [row] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, id))
    .limit(1);
  return row;
}

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/review");
  revalidatePath("/book");
  if (slug) revalidatePath(`/properties/${slug}`);
}

export async function createProperty(
  input: PropertyInput,
  adminUserId: string | null,
) {
  const [{ value: highestSortOrder }] = await db
    .select({ value: max(properties.sortOrder) })
    .from(properties);

  const [row] = await db
    .insert(properties)
    .values({
      ...input,
      priceFrom: String(input.priceFrom),
      sortOrder: highestSortOrder === null ? 0 : highestSortOrder + 1,
    })
    .returning();

  await logActivity({
    adminUserId,
    action: `Added property "${input.name}"`,
    entityType: "property",
    entityLabel: input.name,
  });

  revalidatePublicPages(input.slug);
  return row;
}

export async function updateProperty(
  id: string,
  input: PropertyInput,
  adminUserId: string | null,
) {
  const [row] = await db
    .update(properties)
    .set({ ...input, priceFrom: String(input.priceFrom), updatedAt: new Date() })
    .where(eq(properties.id, id))
    .returning();

  await logActivity({
    adminUserId,
    action: `Updated property "${input.name}"`,
    entityType: "property",
    entityLabel: input.name,
  });

  revalidatePublicPages(input.slug);
  return row;
}

export async function deleteProperty(id: string, adminUserId: string | null) {
  const [row] = await db
    .delete(properties)
    .where(eq(properties.id, id))
    .returning();

  if (row) {
    await logActivity({
      adminUserId,
      action: `Deleted property "${row.name}"`,
      entityType: "property",
      entityLabel: row.name,
    });
  }

  revalidatePublicPages(row?.slug);
  return row;
}
