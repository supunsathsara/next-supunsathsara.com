import type { Metadata } from "next";

export const SITE_URL = "https://supunsathsara.com";
export const SITE_NAME = "Supun Sathsara";

const DEFAULT_TITLE = "Supun Sathsara · Software Engineer";
const DEFAULT_DESCRIPTION =
  "A Developer based in Sri Lanka, specializing in building exceptional websites, applications, and everything in between.";
const SOCIAL_CARD = {
  url: "/social-card.png",
  width: 1200,
  height: 630,
  alt: "Supun Sathsara · Software Engineer",
};

interface PageMetadataInput {
  title?: string;
  description?: string;
  path: string;
}

/** Builds per-page metadata with canonical, Open Graph and Twitter overrides. */
export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
}: PageMetadataInput): Metadata {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  return {
    // Only set when provided, otherwise the layout's title.default applies
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: resolvedTitle,
      description,
      url: path,
      images: [SOCIAL_CARD],
    },
    twitter: {
      title: resolvedTitle,
      description,
    },
  };
}
