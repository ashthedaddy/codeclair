const BUCKET_CAPACITY = 10;
const REFILL_WINDOW_MS = 60 * 60 * 1000;

interface Bucket {
  tokens: number;
  updatedAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(ip);

  const refilled = refill(existing, now);

  if (refilled.tokens < 1) {
    const msSinceUpdate = now - refilled.updatedAt;
    const msUntilNextToken = Math.max(
      0,
      REFILL_WINDOW_MS / BUCKET_CAPACITY - msSinceUpdate,
    );
    buckets.set(ip, refilled);
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil(msUntilNextToken / 1000),
    };
  }

  const next: Bucket = { tokens: refilled.tokens - 1, updatedAt: now };
  buckets.set(ip, next);
  return { ok: true, remaining: next.tokens, retryAfterSec: 0 };
}

function refill(existing: Bucket | undefined, now: number): Bucket {
  if (!existing) {
    return { tokens: BUCKET_CAPACITY, updatedAt: now };
  }
  const elapsed = now - existing.updatedAt;
  const tokensToAdd = (elapsed / REFILL_WINDOW_MS) * BUCKET_CAPACITY;
  const tokens = Math.min(BUCKET_CAPACITY, existing.tokens + tokensToAdd);
  return { tokens, updatedAt: now };
}

export function __resetRateLimitForTests(): void {
  buckets.clear();
}

export function extractClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
