import type { OpeningHours, SocialLink } from "@/types";

const env = (key: string): string | null => {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : null;
};

/** Public information imported from bisnoulisansthan.in. */
export const site = {
  name: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan",
  shortName: "BSGSS",
  url: env("NEXT_PUBLIC_SITE_URL") ?? "https://bisnoulisansthan.in",
  description:
    "BSGSS is a voluntary organisation empowering communities through education, healthcare, skill development and women's empowerment.",
  address: {
    line1: "B-180, Sector–31", line2: "Noida – 201301", locality: "Noida", district: "Gautam Buddha Nagar",
    region: "Uttar Pradesh", country: "India", countryCode: "IN", postalCode: "201301",
  },
  contact: {
    phone: env("NEXT_PUBLIC_BSGSS_PHONE") ?? "011-46548002/03", emergencyPhone: null,
    email: env("NEXT_PUBLIC_BSGSS_EMAIL") ?? "bsgssindia@yahoo.co.in", whatsapp: env("NEXT_PUBLIC_BSGSS_WHATSAPP"),
  },
  maps: { embedUrl: env("NEXT_PUBLIC_MAPS_EMBED_URL"), directionsUrl: env("NEXT_PUBLIC_MAPS_DIRECTIONS_URL") },
  hours: [] as OpeningHours[],
  ownership: [
    { name: "Vijay Kumar Jha", relation: "Ex-IPS · Chairperson, BSGSS" },
    { name: "Nandita Bakshi", relation: "Ex-IRS · CEO, BSGSS" },
  ],
  facts: { established: 1994, beds: null, registrationNumber: null, accreditations: [] as string[] },
  social: [] as SocialLink[],
} as const;

export const fullAddress = [site.address.line1, site.address.line2, `${site.address.locality}, ${site.address.region}`, site.address.country].join(", ");
const mapQuery = encodeURIComponent(fullAddress);
export const mapEmbedUrl = site.maps.embedUrl ?? `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const directionsUrl = site.maps.directionsUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
