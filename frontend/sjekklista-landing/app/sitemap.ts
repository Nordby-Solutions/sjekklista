import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const routes = ["", "/features", "/pricing"].map((route) => ({
    url: `https://sjekklista.no${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
  // Extend with blog routes from your CMS or filesystem
  return routes;
}
