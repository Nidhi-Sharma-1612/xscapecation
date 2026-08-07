import { ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminSectionsForPage } from "@/lib/content/sections";
import { SITE_PAGES } from "@/lib/content/site-pages";

export const dynamic = "force-dynamic";

function preview(content: Record<string, unknown>) {
  const text =
    (content.heading as string) ||
    (content.title as string) ||
    (content.eyebrow as string) ||
    (content.paragraph as string) ||
    (content.ratingValue as string);
  return typeof text === "string" ? text : null;
}

export default async function AdminPageSectionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = SITE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const sections = await getAdminSectionsForPage(slug);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          {page.name}
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Sections on the {page.name} page.
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-charcoal/15 bg-white px-8 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-serif text-lg font-semibold text-charcoal">
            Nothing editable here yet
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.key}
              href={`/admin/pages/${slug}/${section.key}`}
              className="group flex flex-col justify-between gap-3 rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm transition hover:border-wine-600/30 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-semibold text-charcoal">
                    {section.name}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-charcoal/30 transition group-hover:text-wine-600" />
                </div>
                {preview(section.content) && (
                  <p className="mt-1.5 line-clamp-2 text-sm text-charcoal/55">
                    {preview(section.content)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
