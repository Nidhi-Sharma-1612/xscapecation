export type Property = {
  slug: string;
  name: string;
  location: string;
  address: string;
  mapUrl: string;
  description: string;
  space?: string;
  images: string[];
  guests: number;
  bedrooms: number;
  beds?: number;
  bathrooms: number;
  rating: number;
  reviews: number;
  priceFrom: number;
  bookingUrl: string;
  checkIn: string;
  checkOut: string;
  amenities: string[];
  houseRules: string[];
  additionalRules?: string;
};

export { getProperties, getPropertyBySlug } from "@/lib/content/properties";
