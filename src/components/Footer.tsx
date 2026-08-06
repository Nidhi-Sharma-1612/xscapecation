import { ExternalLink, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "./icons/SocialIcons";
import Reveal from "./Reveal";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Amenities", href: "/amenities" },
  { label: "Review", href: "/review" },
  { label: "Explore", href: "/explore" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/xscapecation_oasis/",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61558453996839",
    icon: FacebookIcon,
  },
];

const BOOKING_PLATFORMS = [
  {
    label: "Airbnb",
    href: "https://www.airbnb.com/rooms/891908835909763419",
  },
  {
    label: "VRBO",
    href: "https://www.vrbo.com/3329386",
  },
  {
    label: "Booking.com",
    href: "https://www.booking.com/hotel/us/xscapecation-oasis.html",
  },
  {
    label: "TripAdvisor",
    href: "https://www.tripadvisor.com/VacationRentalReview-g51697-d26242053-Xscapecation_Oasis-Tulsa_Oklahoma.html",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal py-16 text-white/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/brand/logo.png"
                alt="Xscapecation Oasis"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <span className="font-serif text-lg font-semibold text-white">
                Xscapecation Oasis
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              A recently renovated direct-booking vacation rental in Tulsa,
              Oklahoma. Home away from home.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold-300" />
                <a
                  href="tel:19189463014"
                  className="transition hover:text-gold-300"
                >
                  (918) 946-3014
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold-300" />
                <a
                  href="mailto:contact@xscapecationoasis.com"
                  className="transition hover:text-gold-300"
                >
                  contact@xscapecationoasis.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Also Booking On
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {BOOKING_PLATFORMS.map((platform) => (
                <li key={platform.label}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 transition hover:text-gold-300"
                  >
                    {platform.label}
                    <ExternalLink className="h-3 w-3 text-white/40 transition-colors group-hover:text-gold-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Xscapecation Oasis. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Developed by</span>
            <Image
              src="/images/logo.png"
              alt="Design By Dial"
              width={130}
              height={30}
              className="h-5 w-auto opacity-90"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
