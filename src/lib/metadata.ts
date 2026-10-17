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
  /** Per-page OG/Twitter image, e.g. a project's own OG card. */
  images?: NonNullable<Metadata["openGraph"]>["images"];
}

/** Builds per-page metadata with canonical, Open Graph and Twitter overrides. */
export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  images,
}: PageMetadataInput): Metadata {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  const resolvedImages = images ?? [SOCIAL_CARD];
  return {
    // Only set when provided, otherwise the layout's title.default applies
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: resolvedTitle,
      description,
      url: path,
      images: resolvedImages,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: resolvedImages,
    },
  };
}
