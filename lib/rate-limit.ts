import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Durable, cross-instance rate limiting for public API routes.
 *
 * When UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set, this uses a
 * sliding-window limiter backed by Upstash Redis — shared across all serverless
 * instances, so the limit actually holds under real traffic.
 *
 * When those env vars are absent (local dev, or a deploy without Upstash
 * provisioned), it falls back to a per-instance in-memory limiter. The fallback
 * is best-effort only: it does NOT hold across serverless instances or cold
 * starts. Set the env vars before exposing a public entry link.
 */

const LIMIT = 20;
const WINDOW = "1 h";
const WINDOW_MS = 60 * 60 * 1000;

export interface RateLimitResult {
  ok: boolean;
  /** Whether a durable (Upstash) backend served this decision. */
  durable: boolean;
  /** Remaining requests in the window, when known. */
  remaining?: number;
}

// ── Durable backend (only constructed when configured) ───────────────────────
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const durableLimiter =
  upstashUrl && upstashToken
    ? new Ratelimit({
        redis: new Redis({ url: upstashUrl, token: upstashToken }),
        limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
        prefix: "ratelimit:evaluate",
        analytics: false,
      })
    : null;

// ── In-memory fallback ───────────────────────────────────────────────────────
const memMap = new Map<string, { count: number; resetAt: number }>();

function checkInMemory(ip: string): RateLimitResult {
  const now = Date.now();
  const record = memMap.get(ip);
  if (!record || now >= record.resetAt) {
    memMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, durable: false, remaining: LIMIT - 1 };
  }
  if (record.count >= LIMIT) {
    return { ok: false, durable: false, remaining: 0 };
  }
  record.count++;
  return { ok: true, durable: false, remaining: LIMIT - record.count };
}

/**
 * Returns whether the request identified by `ip` is allowed. Uses Upstash when
 * configured; otherwise the in-memory fallback. Never throws — on a backend
 * error it fails open to the in-memory limiter so a Redis blip can't take the
 * endpoint down.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  if (!durableLimiter) return checkInMemory(ip);
  try {
    const { success, remaining } = await durableLimiter.limit(ip);
    return { ok: success, durable: true, remaining };
  } catch {
    // Redis unreachable — degrade to in-memory rather than 500 the route.
    return checkInMemory(ip);
  }
}

export const RATE_LIMIT_MAX = LIMIT;
