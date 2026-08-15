export interface RateLimitRule {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

// In-memory sliding window. This survives only as long as the server process:
// on a serverless platform each instance keeps its own counters, so the real
// ceiling is (limit x instances). It raises the cost of abuse, it does not cap
// it — the hard cap for the booking demo is the per-day limit on the Cal.com
// event type.
const hits = new Map<string, number[]>();

let lastSweep = 0;
const SWEEP_INTERVAL_MS = 60_000;

function sweep(now: number, maxWindowMs: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;

  for (const [key, timestamps] of hits) {
    const alive = timestamps.filter((t) => now - t < maxWindowMs);
    if (alive.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, alive);
    }
  }
}

/**
 * Records one hit for `key` and reports whether every rule still holds.
 * Rules are checked together, so a short burst rule and a long sustained rule
 * can be combined. The hit is recorded even when denied — a client that keeps
 * hammering keeps its window full instead of slipping through as it expires.
 */
export function checkRateLimit(
  key: string,
  rules: RateLimitRule[]
): RateLimitResult {
  const now = Date.now();
  const maxWindowMs = Math.max(...rules.map((rule) => rule.windowMs));

  sweep(now, maxWindowMs);

  const timestamps = (hits.get(key) ?? []).filter(
    (t) => now - t < maxWindowMs
  );
  timestamps.push(now);
  hits.set(key, timestamps);

  let retryAfterSeconds = 0;

  for (const rule of rules) {
    const inWindow = timestamps.filter((t) => now - t < rule.windowMs);
    if (inWindow.length > rule.limit) {
      // The oldest hit inside the window is the one that has to expire before
      // this client gets a slot back.
      const oldest = inWindow[0];
      const waitMs = rule.windowMs - (now - oldest);
      retryAfterSeconds = Math.max(
        retryAfterSeconds,
        Math.ceil(waitMs / 1000)
      );
    }
  }

  return {
    allowed: retryAfterSeconds === 0,
    retryAfterSeconds,
  };
}

/** Test seam — the module-level map would otherwise leak between cases. */
export function resetRateLimit() {
  hits.clear();
  lastSweep = 0;
}
