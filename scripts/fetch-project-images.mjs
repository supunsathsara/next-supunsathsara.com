import { mkdir, writeFile, readFile, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, "src/constants/projects.data.json");
const OUT_DIR = path.join(ROOT, "public/images/projects/auto");
const MANIFEST_PATH = path.join(OUT_DIR, "manifest.json");

const RETRIES = 3;
const BACKOFF_MS = [1000, 3000, 6000];
const FONT_PATH = path.join(__dirname, "assets", "SpaceGrotesk-latin.woff2");

let embeddedFont = null;
async function loadEmbeddedFont() {
  if (embeddedFont !== null) return embeddedFont;
  try {
    const font = await readFile(FONT_PATH);
    embeddedFont = font.toString("base64");
  } catch {
    embeddedFont = "";
  }
  return embeddedFont;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LANGUAGE_COLORS = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Kotlin: "#A97BFF",
  C: "#555555",
  "C#": "#178600",
  "C++": "#f34b7d",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Rust: "#dea584",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#663399",
  Svelte: "#ff3e00",
  Vue: "#41b883",
};

function normalizeFullName(entry, username) {
  if (!entry.includes("/")) return `${username}/${entry}`;
  return entry;
}

function githubHeaders(extra = {}) {
  const headers = {
    "User-Agent": "supunsathsara.com-card-generator",
    Accept: "application/json",
    ...extra,
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchWithRetry(url, accept) {
  for (let attempt = 0; attempt < RETRIES; attempt += 1) {
    try {
      const res = await fetch(url, { headers: githubHeaders({ Accept: accept }) });
      if (res.status === 200) return res;
    } catch {
      // network error, fall through to retry
    }
    if (attempt < RETRIES - 1) await sleep(BACKOFF_MS[attempt]);
  }
  return null;
}

async function fetchRepoMeta(fullName) {
  const res = await fetchWithRetry(
    `https://api.github.com/repos/${fullName}`,
    "application/vnd.github+json"
  );
  if (!res) return null;
  try {
    const data = await res.json();
    return {
      name: data.name,
      description: data.description,
      language: data.language,
      stars: data.stargazers_count,
      topics: data.topics ?? [],
      pushedAt: data.pushed_at,
    };
  } catch {
    return null;
  }
}

async function fetchOgImage(fullName) {
  const res = await fetchWithRetry(
    `https://opengraph.githubassets.com/1/${fullName}`,
    "image/*"
  );
  if (!res) return null;
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) return null;
  const buffer = Buffer.from(await res.arrayBuffer());
  return buffer.length > 1024 ? buffer : null;
}

/* ---------- SVG card generation ---------- */

function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i += 1) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^= h >>> 16) >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text, maxChars, maxLines) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === maxLines && lines.join(" ").length < text.replace(/\s+/g, " ").trim().length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s+\S*$/, "")}…`;
  }
  return lines.slice(0, maxLines);
}

function prettifyTitle(name, overrides) {
  if (overrides[name]) return overrides[name];
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function generateCardSvg(fullName, meta, config) {
  const W = 1200;
  const H = 630;
  const rand = mulberry32(hashSeed(fullName));

  const overrides = config.cardOverrides?.[meta.name] ?? {};
  const accent = LANGUAGE_COLORS[meta.language] ?? "#8b949e";
  const secondary = "#a855f7";
  const title = prettifyTitle(meta.name, config.titleOverrides ?? {});
  const description =
    overrides.description || meta.description || `${meta.language ?? "Code"} project by Supun Sathsara.`;
  const topics = overrides.topics ?? (meta.topics ?? []).slice(0, 3);
  const year = meta.pushedAt ? new Date(meta.pushedAt).getFullYear() : null;
  const fontB64 = await loadEmbeddedFont();
  const fontFace = fontB64
    ? `<style>@font-face{font-family:'Space Grotesk';src:url(data:font/woff2;base64,${fontB64}) format('woff2');font-weight:300 700;font-style:normal;}</style>`
    : "";
  const displayFont = "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif";

  /* deterministic starfield */
  let stars = "";
  for (let i = 0; i < 42; i += 1) {
    const x = (rand() * W).toFixed(1);
    const y = (rand() * H).toFixed(1);
    const r = (0.8 + rand() * 1.8).toFixed(2);
    const o = (0.15 + rand() * 0.45).toFixed(2);
    stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${o}"/>`;
  }

  /* deterministic constellation in the upper-right quadrant */
  const points = [];
  for (let i = 0; i < 6; i += 1) {
    points.push([820 + rand() * 320, 50 + rand() * 200]);
  }
  const polyline = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  let constellation = `<polyline points="${polyline}" fill="none" stroke="${accent}" stroke-width="1.4" opacity="0.3"/>`;
  for (const [x, y] of points) {
    constellation += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + rand() * 2.5).toFixed(1)}" fill="${accent}" opacity="0.75"/>`;
  }

  /* orbital rings */
  const rings = `
    <circle cx="1030" cy="90" r="150" fill="none" stroke="${accent}" stroke-width="1.2" opacity="0.14"/>
    <circle cx="1030" cy="90" r="200" fill="none" stroke="${accent}" stroke-width="1" opacity="0.07"/>
    <circle cx="110" cy="580" r="120" fill="none" stroke="${secondary}" stroke-width="1" opacity="0.08"/>`;

  /* description block */
  const descLines = wrapText(description, 46, 3);
  const descY = 292;
  const descSvg = descLines
    .map(
      (line, i) =>
        `<text x="80" y="${descY + i * 40}" font-family=${JSON.stringify(displayFont)} font-weight="500" font-size="25" fill="#ADB7BE">${escapeXml(line)}</text>`
    )
    .join("\n  ");

  /* topic pills */
  let pillsSvg = "";
  let pillX = 80;
  const pillY = descY + descLines.length * 40 + 26;
  for (const topic of topics) {
    const label = escapeXml(topic);
    const width = topic.length * 10.6 + 30;
    pillsSvg += `
    <g>
      <rect x="${pillX}" y="${pillY}" width="${width.toFixed(0)}" height="36" rx="18" fill="${accent}" opacity="0.12"/>
      <rect x="${pillX}" y="${pillY}" width="${width.toFixed(0)}" height="36" rx="18" fill="none" stroke="${accent}" stroke-width="1" opacity="0.45"/>
      <text x="${(pillX + width / 2).toFixed(0)}" y="${pillY + 24}" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="17" fill="#ddd6fe">${label}</text>
    </g>`;
    pillX += width + 14;
  }

  /* footer meta */
  const metaY = 566;
  let metaSvg = `<circle cx="88" cy="${metaY - 7}" r="7" fill="${accent}"/>
  <text x="106" y="${metaY}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" fill="#ADB7BE">${escapeXml(meta.language ?? "Code")}</text>`;
  let metaX = 106 + (meta.language ?? "Code").length * 12.2 + 26;
  if (meta.stars > 0) {
    metaSvg += `<text x="${metaX}" y="${metaY}" font-size="20" fill="#e3b341">★</text>
  <text x="${metaX + 26}" y="${metaY}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" fill="#ADB7BE">${meta.stars}</text>`;
    metaX += 26 + String(meta.stars).length * 12.2 + 26;
  }
  if (year) {
    metaSvg += `<text x="${metaX}" y="${metaY}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" fill="#6b7280">Updated ${year}</text>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(title)} project preview">
  <defs>
    ${fontFace}
    <radialGradient id="glowA" cx="15%" cy="18%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#030014" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="88%" cy="88%" r="55%">
      <stop offset="0%" stop-color="${secondary}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#030014" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${secondary}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#030014"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>
  ${stars}
  ${constellation}
  ${rings}

  <rect x="80" y="64" width="56" height="56" rx="14" fill="url(#badgeGrad)"/>
  <text x="108" y="102" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="30" font-weight="bold" fill="#ffffff">${escapeXml(title.charAt(0).toUpperCase())}</text>
  <text x="156" y="99" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" fill="#6b7280">supunsathsara / <tspan fill="${accent}">${escapeXml(meta.name)}</tspan></text>

  <text x="80" y="228" font-family=${JSON.stringify(displayFont)} font-weight="700" font-size="66" fill="url(#titleGrad)">${escapeXml(title)}</text>

  ${descSvg}
  ${pillsSvg}
  ${metaSvg}

  <text x="1120" y="${metaY}" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18" fill="#4b5563">supunsathsara.com</text>

  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="24" fill="none" stroke="#33353F" stroke-width="2"/>
</svg>
`;
  return svg;
}

/* ---------- main ---------- */

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let config;
  try {
    config = JSON.parse(await readFile(CONFIG_PATH, "utf-8"));
  } catch (error) {
    console.error(`[project-images] Cannot read config: ${error.message}`);
    process.exit(0);
  }

  const fullNames = [
    ...new Set(
      [...config.pinned, ...config.extra, ...config.fallbackProjects.map((p) => p.fullName)].map(
        (entry) => normalizeFullName(entry, config.username)
      )
    ),
  ];

  let previousManifest = {};
  try {
    previousManifest = JSON.parse(await readFile(MANIFEST_PATH, "utf-8")).images ?? {};
  } catch {
    // first run
  }

  const images = {};
  let generated = 0;
  let ogFallback = 0;
  let failed = 0;
  let kept = 0;

  for (const fullName of fullNames) {
    const baseName = fullName.replace("/", "__");
    const previous = previousManifest[fullName];

    /* A previously generated card is always kept unless the repo metadata
       can be refreshed — this keeps rebuilds stable under API rate limits. */
    const hasUsablePrevious =
      typeof previous === "string" &&
      previous !== null &&
      (await readFile(path.join(OUT_DIR, path.basename(previous)))
        .then(() => true)
        .catch(() => false));

    if (hasUsablePrevious && !process.env.FORCE_IMAGE_REGEN) {
      images[fullName] = previous;
      kept += 1;
      continue;
    }

    const meta = await fetchRepoMeta(fullName);

    if (meta) {
      const svgPath = path.join(OUT_DIR, `${baseName}.svg`);
      try {
        await writeFile(
          svgPath,
          await generateCardSvg(fullName, meta, config)
        );
        images[fullName] = `/images/projects/auto/${baseName}.svg`;
        generated += 1;
        continue;
      } catch (error) {
        console.error(`[project-images] SVG write failed for ${fullName}: ${error.message}`);
      }
    }

    const ogBuffer = await fetchOgImage(fullName);
    if (ogBuffer) {
      try {
        await writeFile(path.join(OUT_DIR, `${baseName}.png`), ogBuffer);
        images[fullName] = `/images/projects/auto/${baseName}.png`;
        ogFallback += 1;
        console.warn(`[project-images] Used GitHub OG fallback for ${fullName}`);
        continue;
      } catch (error) {
        console.error(`[project-images] PNG write failed for ${fullName}: ${error.message}`);
      }
    }

    if (previousManifest[fullName]) {
      images[fullName] = previousManifest[fullName];
      console.warn(`[project-images] Kept cached copy for ${fullName}`);
    } else {
      images[fullName] = null;
      failed += 1;
      console.warn(`[project-images] No image for ${fullName} — will use placeholder`);
    }
  }

  await writeFile(
    MANIFEST_PATH,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), images }, null, 2)}\n`
  );

  /* remove stale files no longer referenced */
  const referenced = new Set(Object.values(images).map((p) => p?.split("/").pop()));
  for (const file of await readdir(OUT_DIR)) {
    if (file === "manifest.json") continue;
    if (!referenced.has(file)) {
      await unlink(path.join(OUT_DIR, file));
      console.log(`[project-images] Removed stale file ${file}`);
    }
  }

  console.log(
    `[project-images] Done — ${generated} cards generated, ${kept} kept from cache, ${ogFallback} OG fallbacks, ${failed} missing (${fullNames.length} total)`
  );
  process.exit(0);
}

main();
