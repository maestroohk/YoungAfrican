import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getInsights } from "@/lib/insights";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/connectivity", "/academy", "/insights", "/about", "/contact", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const insights = (await getInsights()).filter((insight) => insight.publishedAt);
  const articles = insights.map((insight) => ({
    url: `${site.url}/insights/${insight.slug}`,
    lastModified: insight.publishedAt ?? undefined,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
