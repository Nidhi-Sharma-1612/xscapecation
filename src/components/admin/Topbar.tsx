"use client";

import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { SITE_PAGES } from "@/lib/content/site-pages";

const LABELS: Record<string, string> = {
  admin: "Dashboard",
  pages: "Pages",
  properties: "Properties",
  settings: "Settings",
  site: "Site Settings",
  account: "Account Settings",
};

function labelFor(segment: string) {
  const page = SITE_PAGES.find((p) => p.slug === segment);
  if (page) return page.name;
  return LABELS[segment] ?? segment;
}

export default function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => ({
    label: labelFor(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-charcoal/10 bg-white px-4 sm:px-8">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="text-charcoal/60 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-600 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <nav className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <Fragment key={crumb.href}>
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-charcoal/30" />
              )}
              {isLast ? (
                <span className="font-medium text-charcoal">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-charcoal/50 transition hover:text-charcoal"
                >
                  {crumb.label}
                </Link>
              )}
            </Fragment>
          );
        })}
      </nav>
    </header>
  );
}
