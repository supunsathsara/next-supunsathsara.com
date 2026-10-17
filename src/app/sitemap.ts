import type { MetadataRoute } from "next";
import { PROJECT_STORIES } from "@/content/stories";

const SITE_URL = "https://supunsathsara.com";

/**
 * lastModified is derived from real content dates (a project's year) rather
 * than `new Date()`. Using the build time made every deploy claim every page
 * had changed, which trains crawlers to ignore the field entirely.
 */
function storyDate(year?: string): Date | undefined {
  return year ? new Date(`${year}-01-01`) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const storyEntries: MetadataRoute.Sitemap = PROJECT_STORIES.map((story) => ({
    url: `${SITE_URL}/projects/${story.slug}`,
    lastModified: storyDate(story.year),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // The homepage is as fresh as the newest story it features.
  const newestStoryDate = PROJECT_STORIES.reduce<Date | undefined>(
    (newest, story) => {
      const date = storyDate(story.year);
      if (!date) return newest;
      return !newest || date > newest ? date : newest;
    },
    undefined,
  );

  return [
    {
      url: SITE_URL,
      lastModified: newestStoryDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...storyEntries,
    {
      url: `${SITE_URL}/certifications`,
      changeFrequency: "monthly",
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