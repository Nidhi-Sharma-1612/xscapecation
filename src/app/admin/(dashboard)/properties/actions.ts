"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentAdmin } from "@/lib/auth/current-admin";
import { syncPropertyAvailabilityNow } from "@/lib/content/availability";
import {
  createProperty,
  deleteProperty,
  updateProperty,
  type PropertyInput,
} from "@/lib/content/properties";

const nullableString = z.preprocess(
  (v) => (v === "" || v == null ? null : v),
  z.string().nullable(),
);

const nullableInt = z.preprocess(
  (v) => (v === "" || v == null ? null : Number(v)),
  z.number().int().min(0).nullable(),
);

const nullableUrl = z.preprocess(
  (v) => (v === "" || v == null ? null : v),
  z.string().url("Enter a valid iCal URL.").nullable(),
);

const PropertySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only.",
    ),
  name: z.string().trim().min(1, "Name is required."),
  location: z.string().trim().min(1, "Location is required."),
  address: z.string().trim().min(1, "Address is required."),
  mapUrl: z.string().trim().url("Enter a valid map URL."),
  description: z.string().trim().min(1, "Description is required."),
  space: nullableString,
  images: z.array(z.string()).min(1, "Add at least one image."),
  guests: z.coerce.number().int().min(1, "Guests must be at least 1."),
  bedrooms: z.coerce.number().int().min(0),
  beds: nullableInt,
  bathrooms: z.coerce.number().int().min(0),
  rating: z.coerce.number().min(0).max(5),
  reviews: z.coerce.number().int().min(0),
  priceFrom: z.coerce.number().min(0),
  bookingUrl: z.string().trim().url("Enter a valid booking URL."),
  checkIn: z.string().trim().min(1, "Check-in time is required."),
  checkOut: z.string().trim().min(1, "Check-out time is required."),
  amenities: z.array(z.string()),
  houseRules: z.array(z.string()),
  additionalRules: nullableString,
  guestyICalUrl: nullableUrl,
});

function parseArray(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parsePropertyForm(formData: FormData) {
  return PropertySchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    location: formData.get("location"),
    address: formData.get("address"),
    mapUrl: formData.get("mapUrl"),
    description: formData.get("description"),
    space: formData.get("space"),
    images: parseArray(formData.get("images")),
    guests: formData.get("guests"),
    bedrooms: formData.get("bedrooms"),
    beds: formData.get("beds"),
    bathrooms: formData.get("bathrooms"),
    rating: formData.get("rating"),
    reviews: formData.get("reviews"),
    priceFrom: formData.get("priceFrom"),
    bookingUrl: formData.get("bookingUrl"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    amenities: parseArray(formData.get("amenities")),
    houseRules: parseArray(formData.get("houseRules")),
    additionalRules: formData.get("additionalRules"),
    guestyICalUrl: formData.get("guestyICalUrl"),
  });
}

export type PropertyFormState = { error?: string } | null;

export async function createPropertyAction(
  _prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  const parsed = parsePropertyForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const admin = await getCurrentAdmin();

  try {
    await createProperty(parsed.data as PropertyInput, admin?.id ?? null);
  } catch {
    return {
      error: "Could not save property. The slug may already be in use.",
    };
  }

  redirect("/admin/properties");
}

export async function updatePropertyAction(
  id: string,
  _prevState: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  const parsed = parsePropertyForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const admin = await getCurrentAdmin();

  try {
    await updateProperty(id, parsed.data as PropertyInput, admin?.id ?? null);
  } catch {
    return {
      error: "Could not save property. The slug may already be in use.",
    };
  }

  redirect("/admin/properties");
}

export async function deletePropertyAction(id: string): Promise<void> {
  const admin = await getCurrentAdmin();
  await deleteProperty(id, admin?.id ?? null);
}

export type SyncAvailabilityState = { error?: string; success?: boolean } | null;

export async function syncAvailabilityAction(
  id: string,
): Promise<SyncAvailabilityState> {
  const admin = await getCurrentAdmin();
  try {
    await syncPropertyAvailabilityNow(id, admin?.id ?? null);
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Sync failed.",
    };
  }
}
