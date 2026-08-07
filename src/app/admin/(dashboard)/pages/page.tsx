import { ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { SITE_PAGES } from "@/lib/content/site-pages";

export default function AdminPagesIndex() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Pages
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Select a page to edit its sections.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm transition hover:border-wine-600/30 hover:shadow-md"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
                <FileText className="h-4 w-4" />
              </span>
              <span className="font-serif text-base font-semibold text-charcoal">
                {page.name}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 text-charcoal/30 transition group-hover:text-wine-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}
