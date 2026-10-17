import type { MetadataRoute } from "next";
import { partners } from "@/components/partners/partners-data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/about/our-story",
    "/about/legal-status",
    "/about/partners",
    "/management",
    "/our-work",
    "/activities",
    "/activities/key-programmes",
    "/activities/gallery",
    "/activities/videos",
    "/activities/work-in-media",
    "/activities/shg-products",
    "/activities-under-state-central-government",
    "/impact",
    "/support",
    "/sponsor",
    "/transparency",
    "/join-us",
    "/contact",
    ...partners.map((partner) => partner.href),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/about/partners/") ? 0.6 : 0.8,
  }));
}
