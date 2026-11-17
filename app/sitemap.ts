import type { MetadataRoute } from "next";
import { partners } from "@/components/partners/partners-data";
import { SHG_PRODUCTS } from "@/config/shg-products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
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
    "/stories",
    "/join-us",
    "/contact",
  ];

  const partnerRoutes = partners.map((partner) => partner.href);
  const productRoutes = SHG_PRODUCTS.map((product) => `/activities/shg-products/${product.slug}`);

  const allRoutes = [...staticRoutes, ...partnerRoutes, ...productRoutes];

  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1.0
        : route.startsWith("/activities/shg-products/")
          ? 0.7
          : route.startsWith("/about/partners/")
            ? 0.6
            : 0.8,
  }));
}
