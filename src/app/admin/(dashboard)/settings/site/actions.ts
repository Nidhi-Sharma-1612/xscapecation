"use server";

import { z } from "zod";
import { getCurrentAdmin } from "@/lib/auth/current-admin";
import { updateSiteSettings } from "@/lib/content/site-settings";

const nullableString = z.preprocess(
  (v) => (v === "" || v == null ? null : v),
  z.string().nullable(),
);

const SiteSettingsSchema = z.object({
  phone: z.string().trim().min(1, "Phone is required."),
  email: z.string().trim().email("Enter a valid email address."),
  address: nullableString,
  instagramUrl: nullableString,
  facebookUrl: nullableString,
  logoUrl: nullableString,
  footerBlurb: nullableString,
  bookingPlatforms: z.array(
    z.object({ label: z.string().min(1), href: z.string().url() }),
  ),
});

export type SiteSettingsFormState = { error?: string; success?: boolean } | null;

export async function updateSiteSettingsAction(
  _prevState: SiteSettingsFormState,
  formData: FormData,
): Promise<SiteSettingsFormState> {
  let bookingPlatforms: unknown = [];
  try {
    bookingPlatforms = JSON.parse(String(formData.get("bookingPlatforms") || "[]"));
  } catch {
    bookingPlatforms = [];
  }

  const parsed = SiteSettingsSchema.safeParse({
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    instagramUrl: formData.get("instagramUrl"),
    facebookUrl: formData.get("facebookUrl"),
    logoUrl: formData.get("logoUrl"),
    footerBlurb: formData.get("footerBlurb"),
    bookingPlatforms,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const admin = await getCurrentAdmin();
  await updateSiteSettings(parsed.data, admin?.id ?? null);

  return { success: true };
}
