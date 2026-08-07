import { revalidatePath } from "next/cache";
import { cache } from "react";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { logActivity } from "@/lib/content/activity";

export type SiteSettings = {
  phone: string;
  email: string;
  address: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  logoUrl: string | null;
  footerBlurb: string | null;
  bookingPlatforms: { label: string; href: string }[];
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: "(918) 946-3014",
  email: "contact@xscapecationoasis.com",
  address: null,
  instagramUrl: "https://www.instagram.com/xscapecation_oasis/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61558453996839",
  logoUrl: "/images/brand/logo.png",
  footerBlurb:
    "A recently renovated direct-booking vacation rental in Tulsa, Oklahoma. Home away from home.",
  bookingPlatforms: [
    { label: "Airbnb", href: "https://www.airbnb.com/rooms/891908835909763419" },
    { label: "VRBO", href: "https://www.vrbo.com/3329386" },
    {
      label: "Booking.com",
      href: "https://www.booking.com/hotel/us/xscapecation-oasis.html",
    },
    {
      label: "TripAdvisor",
      href: "https://www.tripadvisor.com/VacationRentalReview-g51697-d26242053-Xscapecation_Oasis-Tulsa_Oklahoma.html",
    },
  ],
};

/**
 * Public read — falls back to the live defaults if the DB has no row or is
 * unreachable. Wrapped in React's `cache()` so the several components that
 * each need site settings (Hero, CTA, Footer, PageBanner, ...) share one
 * DB round-trip per render instead of firing one query apiece.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const [row] = await db.select().from(siteSettings).limit(1);
    return row ? { ...DEFAULT_SITE_SETTINGS, ...row } : DEFAULT_SITE_SETTINGS;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
});

export async function updateSiteSettings(
  input: SiteSettings,
  adminUserId: string | null,
): Promise<void> {
  await db
    .insert(siteSettings)
    .values({ id: 1, ...input })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: { ...input, updatedAt: new Date() },
    });

  await logActivity({
    adminUserId,
    action: "Updated Site Settings",
    entityType: "site_settings",
    entityLabel: "Site Settings",
  });

  for (const path of ["/", "/about", "/amenities", "/properties", "/review", "/explore", "/contact", "/book"]) {
    revalidatePath(path);
  }
  revalidatePath("/properties/[slug]", "page");
}
