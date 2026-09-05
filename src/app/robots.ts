import type { MetadataRoute } from "next";

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "Anthropic-ai",
  "Claude-Web",
  "Omgilibot",
  "CCBot",
  "PerplexityBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/cgi-bin/"],
        crawlDelay: 10,
      },
      // Explicitly welcome AI/LLM crawlers
      {
        userAgent: AI_BOTS,
        allow: "/",
      },
    ],
    sitemap: "https://supunsathsara.com/sitemap.xml",
  };
}
