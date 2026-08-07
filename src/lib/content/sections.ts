import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { db } from "@/lib/db";
import { pages, sections } from "@/lib/db/schema";
import { logActivity } from "@/lib/content/activity";
import { getSectionDef, getSectionDefsForPage } from "@/lib/content/section-registry";

/**
 * Public read — falls back to the registry default if the DB has no row or
 * is unreachable. Wrapped in React's `cache()` so repeated calls for the
 * same (pageSlug, key) within one render — e.g. across builds hitting the
 * same section twice — share a DB round-trip.
 */
export const getSectionContent = cache(
  async <T = Record<string, unknown>>(
    pageSlug: string,
    key: string,
  ): Promise<T> => {
    const def = getSectionDef(pageSlug, key);
    const fallback = (def?.defaultContent ?? {}) as T;

    try {
      const [row] = await db
        .select({ content: sections.content })
        .from(sections)
        .innerJoin(pages, eq(sections.pageId, pages.id))
        .where(and(eq(pages.slug, pageSlug), eq(sections.key, key)))
        .limit(1);

      return row ? (row.content as T) : fallback;
    } catch {
      return fallback;
    }
  },
);

export type AdminSectionSummary = {
  key: string;
  name: string;
  content: Record<string, unknown>;
  updatedAt: Date | null;
};

/** Admin read — one row per registered section for a page, DB content merged over the registry order. */
export async function getAdminSectionsForPage(
  pageSlug: string,
): Promise<AdminSectionSummary[]> {
  const defs = getSectionDefsForPage(pageSlug);

  const rows = await db
    .select({
      key: sections.key,
      content: sections.content,
      updatedAt: sections.updatedAt,
    })
    .from(sections)
    .innerJoin(pages, eq(sections.pageId, pages.id))
    .where(eq(pages.slug, pageSlug));

  const rowsByKey = new Map(rows.map((row) => [row.key, row]));

  return defs.map((def) => {
    const row = rowsByKey.get(def.key);
    return {
      key: def.key,
      name: def.name,
      content: (row?.content as Record<string, unknown>) ?? def.defaultContent,
      updatedAt: row?.updatedAt ?? null,
    };
  });
}

/**
 * Several shared components (CTA, About, Amenities, Explore, Reviews) render
 * on both their "home" page section AND a full-detail page — e.g. CTA shows
 * on Home/About/Amenities/Properties/Review/Explore. Each section lists
 * every path it actually appears on, not just its owning page's route.
 */
const SECTION_REVALIDATE_PATHS: Record<string, string[]> = {
  hero: ["/"],
  cta: ["/", "/about", "/amenities", "/properties", "/review", "/explore"],
  "about-banner": ["/about"],
  "about-intro": ["/", "/about"],
  "about-content": ["/", "/about"],
  "about-values": ["/about"],
  "properties-banner": ["/properties"],
  steps: ["/properties"],
  "amenities-banner": ["/amenities"],
  "amenities-intro": ["/", "/amenities"],
  "amenities-grid": ["/", "/amenities"],
  "amenity-list": ["/amenities"],
  "review-banner": ["/review"],
  "review-stats": ["/review"],
  reviews: ["/", "/review"],
  "explore-banner": ["/explore"],
  "explore-intro": ["/", "/explore"],
  "explore-cards": ["/", "/explore"],
  "getting-around": ["/explore"],
  "contact-banner": ["/contact"],
  "contact-intro": ["/contact"],
  "book-banner": ["/book"],
  "book-intro": ["/book"],
};

export async function updateSectionContent(
  pageSlug: string,
  key: string,
  content: Record<string, unknown>,
  adminUserId: string | null,
): Promise<void> {
  const def = getSectionDef(pageSlug, key);
  if (!def) throw new Error(`Unknown section ${pageSlug}/${key}`);

  const [page] = await db
    .select({ id: pages.id })
    .from(pages)
    .where(eq(pages.slug, pageSlug))
    .limit(1);
  if (!page) throw new Error(`Unknown page ${pageSlug}`);

  await db
    .insert(sections)
    .values({ pageId: page.id, key, name: def.name, content })
    .onConflictDoUpdate({
      target: [sections.pageId, sections.key],
      set: { content, name: def.name, updatedAt: new Date() },
    });

  await logActivity({
    adminUserId,
    action: `Updated "${def.name}" on ${pageSlug === "home" ? "Home" : pageSlug[0].toUpperCase() + pageSlug.slice(1)}`,
    entityType: "section",
    entityLabel: def.name,
  });

  for (const path of SECTION_REVALIDATE_PATHS[key] ?? ["/"]) {
    revalidatePath(path);
  }
  revalidatePath(`/admin/pages/${pageSlug}`);
}
