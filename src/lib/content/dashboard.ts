import { count } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, properties, sections } from "@/lib/db/schema";

export async function getDashboardStats() {
  const [[pageCount], [sectionCount], [propertyCount]] = await Promise.all([
    db.select({ value: count() }).from(pages),
    db.select({ value: count() }).from(sections),
    db.select({ value: count() }).from(properties),
  ]);

  return {
    pages: pageCount?.value ?? 0,
    sections: sectionCount?.value ?? 0,
    properties: propertyCount?.value ?? 0,
  };
}
