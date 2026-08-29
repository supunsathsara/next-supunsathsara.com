import type { MetadataRoute } from "next";
import { PROJECT_STORIES } from "@/content/stories";

const SITE_URL = "https://supunsathsara.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const storyEntries: MetadataRoute.Sitemap = PROJECT_STORIES.map((story) => ({
    url: `${SITE_URL}/projects/${story.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...storyEntries,
    {
      url: `${SITE_URL}/certifications`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2023-09-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date("2023-09-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
