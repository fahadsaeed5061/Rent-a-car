import type { MetadataRoute } from "next";
import { articles, fleet, services } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/airports", "/areas", "/fleet", "/about", "/events", "/journal", "/book"];
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...fleet.map(({ slug }) => ({ url: `${siteUrl}/fleet/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...services.map(({ slug }) => ({ url: `${siteUrl}/services/${slug}`, changeFrequency: "monthly" as const, priority: 0.65 })),
    ...articles.map(({ slug, date }) => ({ url: `${siteUrl}/journal/${slug}`, lastModified: new Date(date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
