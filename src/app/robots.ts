import type { MetadataRoute } from "next";

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "Anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "cohere-ai",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "Omgilibot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
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
