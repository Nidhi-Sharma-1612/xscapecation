"use client";

import { CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Amenities", href: "/amenities" },
  { label: "Review", href: "/review" },
  { label: "Explore", href: "/explore" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  logoUrl = "/images/brand/logo.png",
}: {
  logoUrl?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/95 shadow-lg shadow-charcoal/10 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoUrl}
            alt="Xscapecation Oasis"
            width={56}
            height={56}
            className="h-14 w-14"
            priority
          />
          <span className="hidden font-serif text-lg font-semibold tracking-wide text-white sm:block">
            Xscapecation Oasis
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition hover:text-gold-300 ${
                    isActive ? "text-gold-300" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/book"
          className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-6 py-2.5 text-sm font-semibold tracking-wide text-wine-900 shadow-lg shadow-charcoal/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-gold-500 hover:to-gold-700 hover:shadow-xl hover:shadow-charcoal/30 lg:inline-flex"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Now
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-7 bg-white" />
          <span className="h-0.5 w-7 bg-white" />
          <span className="h-0.5 w-7 bg-white" />
        </button>
      </nav>

      {isOpen && (
        <div className="mx-6 flex flex-col gap-1 rounded-2xl bg-charcoal/95 p-6 backdrop-blur lg:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white/10 ${
                  isActive ? "text-gold-300" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-6 py-3 text-sm font-semibold text-wine-900 shadow-lg shadow-charcoal/25 transition hover:from-gold-500 hover:to-gold-700"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
