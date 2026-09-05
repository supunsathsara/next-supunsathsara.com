import type { Project } from "@/types/project";
import {
  EXTRA_REPOS,
  FALLBACK_PROJECTS,
  GITHUB_USERNAME,
  HIDDEN_REPOS,
  MAX_PROJECTS,
  NOISE_PATTERN_STRINGS,
  PINNED_REPOS,
  TITLE_OVERRIDES,
} from "@/constants/projects";
import imageManifest from "@public/images/projects/auto/manifest.json";

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60 * 24;
const MAX_README_LOOKUPS = 8;
const PLACEHOLDER_IMAGE = "/images/project-placeholder.svg";

const NOISE_PATTERNS = NOISE_PATTERN_STRINGS.map((pattern) => new RegExp(pattern, "i"));

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
}

/** Local cached OG card when available; remote URL as backup; placeholder as last resort. */
export function resolveProjectImage(fullName: string): string {
  const cached =
    imageManifest.images[fullName as keyof typeof imageManifest.images] ?? null;
  if (cached) return cached;
  if (cached === null && fullName in imageManifest.images) return PLACEHOLDER_IMAGE;
  return `https://opengraph.githubassets.com/1/${fullName}`;
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "supunsathsara.com",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function ghFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function repoKey(fullNameOrName: string): string {
  return fullNameOrName.toLowerCase();
}

function isNoise(name: string): boolean {
  return NOISE_PATTERNS.some((pattern) => pattern.test(name));
}

function prettifyTitle(repo: GithubRepo): string {
  const override = TITLE_OVERRIDES[repo.name];
  if (override) return override;
  return repo.name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeHomepage(homepage: string | null): string | null {
  if (!homepage) return null;
  const trimmed = homepage.trim();
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}

function extractReadmeIntro(markdown: string): string | null {
  const lines = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .split("\n")
    .map((line) =>
      line
        .replace(/^\s*(?:#{1,6}\s*|>\s*|[-*+]\s+)/, "")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/[`*_~]/g, "")
        .trim()
    )
    .filter((line) => line.length > 48);

  const intro = lines[0];
  if (!intro) return null;
  if (intro.length <= 190) return intro;
  return `${intro.slice(0, 190).replace(/\s+\S*$/, "")}…`;
}

async function fetchReadmeIntro(fullName: string): Promise<string | null> {
  const data = await ghFetch<{ content: string; encoding: string }>(
    `/repos/${fullName}/readme`
  );
  if (!data?.content) return null;
  try {
    const markdown = Buffer.from(
      data.content,
      data.encoding as BufferEncoding
    ).toString("utf-8");
    return extractReadmeIntro(markdown);
  } catch {
    return null;
  }
}

function matchPin(repo: GithubRepo): number {
  const byFullName = PINNED_REPOS.findIndex(
    (entry) => repoKey(entry) === repoKey(repo.full_name)
  );
  if (byFullName !== -1) return byFullName;
  const byName = PINNED_REPOS.findIndex(
    (entry) => !entry.includes("/") && repoKey(entry) === repoKey(repo.name)
  );
  return byName;
}

async function listRepos(): Promise<GithubRepo[]> {
  const owned = await ghFetch<GithubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`
  );
  const extras = (
    await Promise.all(EXTRA_REPOS.map((fullName) => ghFetch<GithubRepo>(`/repos/${fullName}`)))
  ).filter((repo): repo is GithubRepo => repo !== null);

  return [...extras, ...(owned ?? [])];
}

function selectRepos(repos: GithubRepo[]): GithubRepo[] {
  const seen = new Set<string>();
  const candidates = repos.filter((repo) => {
    const key = repoKey(repo.full_name);
    if (seen.has(key)) return false;
    seen.add(key);

    const pinned = matchPin(repo) !== -1;
    if (HIDDEN_REPOS.includes(repo.name)) return false;
    if (repo.fork && !pinned) return false;
    if (isNoise(repo.name) && !pinned) return false;
    return true;
  });

  return candidates
    .sort((a, b) => {
      const pinA = matchPin(a);
      const pinB = matchPin(b);
      if (pinA !== -1 || pinB !== -1) {
        if (pinA === -1) return 1;
        if (pinB === -1) return -1;
        return pinA - pinB;
      }
      return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
    })
    .slice(0, MAX_PROJECTS);
}

export function toProject(
  repo: GithubRepo,
  id: number,
  description: string
): Project {
  return {
    id,
    title: prettifyTitle(repo),
    description,
    image: resolveProjectImage(repo.full_name),
    primaryLanguage: repo.language,
    topics: (repo.topics ?? []).slice(0, 3),
    stars: repo.stargazers_count,
    gitUrl: repo.html_url,
    previewUrl: normalizeHomepage(repo.homepage),
    updatedAt: repo.pushed_at,
  };
}

export async function getProjects(): Promise<Project[]> {
  try {
    const repos = await listRepos();
    if (!repos || repos.length === 0) throw new Error("GitHub API unavailable");

    const selected = selectRepos(repos);
    if (selected.length === 0) throw new Error("No repositories selected");

    const missingDescription = selected.filter((repo) => !repo.description);
    const lookups = missingDescription.slice(0, MAX_README_LOOKUPS);
    const intros = await Promise.all(lookups.map((repo) => fetchReadmeIntro(repo.full_name)));
    const introByFullName = new Map(
      lookups.map((repo, index) => [repoKey(repo.full_name), intros[index]])
    );

    return selected.map((repo, index) => {
      const description =
        repo.description ||
        introByFullName.get(repoKey(repo.full_name)) ||
        `${repo.language ?? "Code"} project. See the repository for implementation details.`;
      return toProject(repo, index + 1, description);
    });
  } catch {
    return FALLBACK_PROJECTS.map((project, index) =>
      toProject(
        {
          id: index,
          name: project.title.replace(/\s+/g, "-"),
          full_name: project.fullName,
          html_url: project.url,
          description: project.description,
          homepage: project.url.startsWith("http") ? project.url : null,
          fork: false,
          archived: false,
          stargazers_count: 0,
          language: project.primaryLanguage,
          topics: [],
          pushed_at: new Date().toISOString(),
        },
        index + 1,
        project.description
      )
    );
  }
}
