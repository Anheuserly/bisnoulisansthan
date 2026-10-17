/**
 * Single source of truth for the site origin.
 *
 * Reads from process.env.NEXT_PUBLIC_SITE_URL with a fallback to the official
 * production domain "https://bisnoulisansthan.in".
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim()
    ? process.env.NEXT_PUBLIC_SITE_URL.trim()
    : "https://bisnoulisansthan.in"
).replace(/\/+$/, "");

/**
 * Returns an absolute URL based on SITE_URL.
 */
export function absoluteUrl(path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
