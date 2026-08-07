"use client";

import {
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_PAGES } from "@/lib/content/site-pages";
import type { CurrentAdmin } from "@/lib/auth/current-admin";
import { logout } from "@/app/admin/(dashboard)/actions";

export default function Sidebar({
  admin,
  mobileOpen,
  onClose,
}: {
  admin: CurrentAdmin;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [pagesOpen, setPagesOpen] = useState(pathname.startsWith("/admin/pages"));

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onClose]);

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 ${
      active
        ? "bg-white/10 text-gold-300"
        : "text-white/75 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      {mobileOpen && (
        <div
          aria-hidden
          onClick={onClose}
          className="fixed inset-0 z-40 bg-charcoal/60 lg:hidden"
        />
      )}

      <aside
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 shrink-0 flex-col bg-charcoal transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <Image
            src="/images/brand/logo.png"
            alt="Xscapecation Oasis"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-sm font-semibold text-white">
              Xscapecation Oasis
            </p>
            <p className="text-xs tracking-wide text-gold-300 uppercase">
              Admin Panel
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-white/60 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <Link href="/admin" className={navLinkClass(pathname === "/admin")}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setPagesOpen((prev) => !prev)}
              aria-expanded={pagesOpen}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 ${
                pathname.startsWith("/admin/pages")
                  ? "bg-white/10 text-gold-300"
                  : "text-white/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                Pages
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${pagesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {pagesOpen && (
              <div className="mt-1 ml-4 flex flex-col gap-0.5 border-l border-white/10 pl-4">
                {SITE_PAGES.map((page) => {
                  const href = `/admin/pages/${page.slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={page.slug}
                      href={href}
                      className={`rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 ${
                        active
                          ? "text-gold-300"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {page.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/admin/properties"
            className={navLinkClass(pathname.startsWith("/admin/properties"))}
          >
            <Home className="h-4 w-4" />
            Properties
          </Link>

          <Link
            href="/admin/settings/site"
            className={navLinkClass(pathname === "/admin/settings/site")}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Site Settings
          </Link>

          <Link
            href="/admin/settings/account"
            className={navLinkClass(pathname === "/admin/settings/account")}
          >
            <Settings className="h-4 w-4" />
            Account Settings
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/20 font-serif text-sm font-semibold text-gold-300">
              {admin.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {admin.name}
              </p>
              <p className="truncate text-xs text-white/50">{admin.email}</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
