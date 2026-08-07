import {
  BadgePercent,
  CalendarCheck,
  CalendarClock,
  Car,
  Coffee,
  DollarSign,
  Footprints,
  KeyRound,
  Laptop,
  type LucideIcon,
  Luggage,
  MessageCircle,
  Music,
  Navigation,
  Plane,
  Search,
  ShieldCheck,
  ShowerHead,
  Sofa,
  Sparkles,
  TreePine,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";

/**
 * Card-list sections keep a fixed, non-editable icon per card (per the
 * confirmed Phase 3 scope — icons are decorative, not admin-editable).
 * Indexed by position; any card beyond the seeded defaults falls back to
 * a generic icon so admin-added items still render something sensible.
 */
const FALLBACK_ICON: LucideIcon = Sparkles;

const SECTION_ICONS: Record<string, LucideIcon[]> = {
  "about-values": [BadgePercent, MessageCircle, CalendarClock],
  steps: [Search, CalendarCheck, Luggage],
  "amenities-grid": [KeyRound, Wifi, Sparkles, ShowerHead, Laptop, UtensilsCrossed],
  "amenity-list": [UtensilsCrossed, Sofa, Wifi, ShieldCheck],
  "explore-cards": [TreePine, Music, Coffee],
  "getting-around": [Footprints, Navigation, Plane, Car],
  "book-intro": [DollarSign, ShieldCheck, MessageCircle],
};

export function getSectionIcon(sectionKey: string, index: number): LucideIcon {
  return SECTION_ICONS[sectionKey]?.[index] ?? FALLBACK_ICON;
}
