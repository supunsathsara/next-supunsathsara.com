/**
 * Simple in-memory sliding-window rate limiter.
 *
 * NOTE: In-memory state resets on Vercel cold starts / serverless function
 * evictions, so this is a best-effort guard against burst/spam rather than
 * a hard guarantee. For production-critical rate limiting, use Vercel KV or
 * Upstash Ratelimit instead.
 */

interface RateLimitEntry {
  /** Timestamps of requests within the current window (ms). */
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

/** Default: 3 requests per 60-second window per IP. */
const DEFAULT_MAX_REQUESTS = 3;
const DEFAULT_WINDOW_MS = 60_000;

/**
 * Check whether `key` has exceeded the rate limit.
 * Returns `{ allowed, remaining }` where:
 *  - `allowed` is true if the request should proceed
 *  - `remaining` is the number of requests left in the current window
 */
export function rateLimit(
  key: string,
  maxRequests: number = DEFAULT_MAX_REQUESTS,
  windowMs: number = DEFAULT_WINDOW_MS,
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  let entry = store.get(key);

  if (!entry) {
    // First request — create entry and allow
    entry = { timestamps: [now] };
    store.set(key, entry);
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // Prune timestamps outside the window
  entry.timestamps = entry.timestamps.filter((ts) => ts >= windowStart);

  if (entry.timestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.timestamps.push(now);
  return { allowed: true, remaining: maxRequests - entry.timestamps.length };
}

/**
 * Clean up stale entries every 5 minutes to prevent memory leaks.
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter((ts) => ts >= now - 120_000);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}, 300_000);
