/**
 * Seeds the database with the site's current live content, so day one of
 * the admin panel shows exactly what's on the site today.
 *
 * Seeds: site_settings, properties, page shells, and every registered
 * section's default content. Safe to re-run — site_settings and sections
 * upsert (so corrections to defaults propagate), properties/pages insert
 * only if missing (so real admin edits to those are never overwritten).
 *
 * Run with: npm run db:seed
 */
import { eq } from "drizzle-orm";
import { db } from "../src/lib/db";
import { pages, properties, sections, siteSettings } from "../src/lib/db/schema";
import { SEED_PROPERTIES } from "./seed-data";
import { SITE_PAGES } from "../src/lib/content/site-pages";
import { SECTION_REGISTRY } from "../src/lib/content/section-registry";
import { DEFAULT_SITE_SETTINGS } from "../src/lib/content/site-settings";

async function seedSiteSettings() {
  await db
    .insert(siteSettings)
    .values({ id: 1, ...DEFAULT_SITE_SETTINGS })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: DEFAULT_SITE_SETTINGS,
    });
  console.log("✓ site_settings seeded");
}

async function seedProperties() {
  for (const [index, property] of SEED_PROPERTIES.entries()) {
    await db
      .insert(properties)
      .values({
        ...property,
        priceFrom: String(property.priceFrom),
        sortOrder: index,
      })
      .onConflictDoNothing({ target: properties.slug });
  }
  console.log(`✓ ${SEED_PROPERTIES.length} properties seeded`);
}

async function seedPages() {
  for (const page of SITE_PAGES) {
    await db
      .insert(pages)
      .values({ slug: page.slug, name: page.name })
      .onConflictDoNothing({ target: pages.slug });
  }
  console.log(`✓ ${SITE_PAGES.length} page shells seeded`);
}

async function seedSections() {
  for (const def of SECTION_REGISTRY) {
    const [page] = await db
      .select({ id: pages.id })
      .from(pages)
      .where(eq(pages.slug, def.pageSlug))
      .limit(1);
    if (!page) continue;

    await db
      .insert(sections)
      .values({
        pageId: page.id,
        key: def.key,
        name: def.name,
        content: def.defaultContent,
      })
      .onConflictDoUpdate({
        target: [sections.pageId, sections.key],
        set: { name: def.name },
      });
  }
  console.log(`✓ ${SECTION_REGISTRY.length} sections seeded`);
}

async function main() {
  await seedSiteSettings();
  await seedProperties();
  await seedPages();
  await seedSections();
  console.log("Seed complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
