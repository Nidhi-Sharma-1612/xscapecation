export const SITE_PAGES = [
  { slug: "home", name: "Home" },
  { slug: "about", name: "About" },
  { slug: "properties", name: "Properties" },
  { slug: "amenities", name: "Amenities" },
  { slug: "review", name: "Review" },
  { slug: "explore", name: "Explore" },
  { slug: "contact", name: "Contact" },
  { slug: "book", name: "Book" },
] as const;

export type SitePageSlug = (typeof SITE_PAGES)[number]["slug"];
