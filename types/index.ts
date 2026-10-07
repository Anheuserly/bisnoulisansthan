/** Shared BSGSS website types. */

export interface SocialLink {
  platform: "facebook" | "instagram" | "youtube" | "linkedin" | "x";
  url: string;
  label: string;
  enabled: boolean;
}

export interface OpeningHours {
  label: string;
  days: string;
  hours: string;
}
