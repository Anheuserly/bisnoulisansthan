/**
 * Single source of truth for the site origin.
 *
 * Reads from process.env.NEXT_PUBLIC_SITE_URL with a fallback to the official
 * production domain "https://www.bsgssindia.org".
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim()
    ? process.env.NEXT_PUBLIC_SITE_URL.trim()
    : "https://www.bsgssindia.org"
).replace(/\/+$/, "");

export function getClientOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return SITE_URL;
}

/**
 * Returns an absolute URL based on SITE_URL.
 */
export function absoluteUrl(path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
