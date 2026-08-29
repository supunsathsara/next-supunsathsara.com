export interface StoryGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface StorySection {
  heading?: string;
  body: string[];
}

export interface StoryStat {
  value: string;
  label: string;
}

export interface StoryQuote {
  text: string;
  author?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface StoryFeature {
  title: string;
  description: string;
}

export interface StoryEmbed {
  type: "tweet" | "linkedin";
  url: string;
  caption?: string;
  height?: number;
}

export interface ProjectStory {
  /** URL segment: /projects/<slug> */
  slug: string;
  title: string;
  /** One-line hook shown under the title everywhere the story appears. */
  tagline: string;
  /** Short teaser used on cards and as the page meta description. */
  excerpt: string;
  /** Optional GitHub repo — pulls the auto-cached OG card image + live links. */
  repoFullName?: string;
  /** Overrides the repo OG card as the visual. */
  bannerImage?: string;
  /** Small badges e.g. hackathon name, placement, team size. */
  chips?: string[];
  year?: string;
  links?: { label: string; href: string }[];
  sections: StorySection[];
  gallery?: StoryGalleryItem[];
  /** Big-number band rendered under the banner. */
  stats?: StoryStat[];
  /** Technology chips row. */
  techStack?: string[];
  /** Highlighted tweet / testimonial callout. */
  quote?: StoryQuote;
  /** Capability grid for technical deep-dives. */
  features?: StoryFeature[];
  /** Social posts rendered as real embeds (X tweets, LinkedIn posts). */
  embeds?: StoryEmbed[];
}
