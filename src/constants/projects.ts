import data from "./projects.data.json";

interface ProjectsData {
  username: string;
  pinned: string[];
  extra: string[];
  hidden: string[];
  noisePatterns: string[];
  titleOverrides?: Record<string, string>;
  fallbackProjects: {
    fullName: string;
    title: string;
    description: string;
    url: string;
    primaryLanguage: string;
  }[];
}

export const GITHUB_USERNAME = (data as ProjectsData).username;
export const PINNED_REPOS = (data as ProjectsData).pinned;
export const EXTRA_REPOS = (data as ProjectsData).extra;
export const HIDDEN_REPOS = (data as ProjectsData).hidden;
export const NOISE_PATTERN_STRINGS = (data as ProjectsData).noisePatterns;
export const FALLBACK_PROJECTS = (data as ProjectsData).fallbackProjects;

/** Max cards rendered on the page. */
export const MAX_PROJECTS = 6;

/** Cleaner display titles for repos whose raw name reads poorly. Keyed by repo name. */
export const TITLE_OVERRIDES: Record<string, string> =
  (data as ProjectsData).titleOverrides ?? {};
