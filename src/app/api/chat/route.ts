import type { NextRequest } from "next/server";
import { checkRateLimit, type RateLimitRule } from "@/lib/rateLimit";

// The in-memory rate limiter needs a process that outlives a single request,
// and there is no reason to pay the edge runtime's constraints here.
export const runtime = "nodejs";

const SESSION_COOKIE = "demo_chat_session";
const SESSION_MAX_AGE_SECONDS = 2 * 60 * 60;

const MAX_MESSAGE_LENGTH = 2000;

// Generous next to a 2000-char message, but small enough that refusing costs
// nothing. Covers the JSON envelope and any multibyte expansion.
const MAX_BODY_BYTES = 16 * 1024;

// Per-IP ceilings. A burst rule keeps a single visitor from spraying the agent,
// the sustained rule caps what one address can spend over an afternoon. These
// are opening numbers, not measured ones: they are set to survive a demo
// conversation comfortably while cutting off a script. The hard ceiling on cost
// is the per-day booking limit on the calendar event type, not this.
const RATE_LIMIT_RULES: RateLimitRule[] = [
  { limit: readNumberEnv("DEMO_CHAT_BURST_LIMIT", 8), windowMs: 60_000 },
  { limit: readNumberEnv("DEMO_CHAT_HOURLY_LIMIT", 40), windowMs: 3_600_000 },
];

const UPSTREAM_TIMEOUT_MS = readNumberEnv("DEMO_CHAT_TIMEOUT_MS", 120_000);

function readNumberEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return Response.json({ error: message }, { status, headers });
}

/**
 * Best-effort client address, most trustworthy source first.
 *
 * `x-forwarded-for` is deliberately last: a client can send it themselves, and
 * whatever they send lands at the front of the list. Trusting it would let a
 * visitor reset their own rate-limit bucket on every request just by varying
 * the header. `x-vercel-forwarded-for` and `x-real-ip` are stamped by the
 * platform and overwrite anything the client supplied.
 *
 * Off-platform, the fallback still reads the left-most `x-forwarded-for` entry,
 * which is spoofable — friction, not identity.
 */
function clientAddress(request: NextRequest): string {
  for (const header of ["x-vercel-forwarded-for", "x-real-ip"]) {
    const value = request.headers.get(header)?.trim();
    if (value) return value;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || "unknown";
}

function buildSessionCookie(sessionId: string): string {
  const parts = [
    `${SESSION_COOKIE}=${sessionId}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    // Configuration gap, not a visitor mistake — say so in the log, stay vague
    // on the wire.
    console.error("[api/chat] N8N_CHAT_WEBHOOK_URL is not set");
    return jsonError("Demo temporarily unavailable.", 503);
  }

  const { allowed, retryAfterSeconds } = checkRateLimit(
    clientAddress(request),
    RATE_LIMIT_RULES
  );
  if (!allowed) {
    return jsonError("Too many messages. Try again shortly.", 429, {
      "Retry-After": String(retryAfterSeconds),
    });
  }

  // Reject oversized payloads before buffering them. Without this the handler
  // parses the whole body and only then finds the message too long, so a
  // 50 MB post costs 50 MB of memory to refuse.
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonError("Request body too large.", 413);
  }

  let message: unknown;
  try {
    const body = await request.json();
    message = (body as { message?: unknown })?.message;
  } catch {
    return jsonError("Malformed request body.", 400);
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return jsonError("Field `message` must be a non-empty string.", 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonError(
      `Field \`message\` exceeds ${MAX_MESSAGE_LENGTH} characters.`,
      413
    );
  }

  // The session id is ownership, not preference: whatever the agent booked in
  // this conversation is reachable only by whoever holds this cookie. Minting
  // it here keeps it out of the client's hands.
  const existingSession = request.cookies.get(SESSION_COOKIE)?.value;
  const sessionId = existingSession ?? crypto.randomUUID();

  const upstreamHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream, application/x-ndjson",
  };

  const user = process.env.N8N_CHAT_BASIC_AUTH_USER;
  const password = process.env.N8N_CHAT_BASIC_AUTH_PASSWORD;
  if (user && password) {
    const encoded = Buffer.from(`${user}:${password}`).toString("base64");
    upstreamHeaders.Authorization = `Basic ${encoded}`;
  }

  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify({
        action: "sendMessage",
        sessionId,
        chatInput: message,
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[api/chat] upstream request failed", error);
    return jsonError("The assistant is not responding right now.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    // Never forward the upstream body: it can carry the n8n host, node names
    // and stack traces.
    console.error(
      `[api/chat] upstream responded ${upstream.status} ${upstream.statusText}`
    );
    return jsonError("The assistant is not responding right now.", 502);
  }

  // Pass the body straight through instead of parsing it. The client owns the
  // chunk format, so the handler stays correct whether n8n emits plain text,
  // NDJSON or SSE — and whatever arrives is observable end to end.
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      // Tells nginx-style proxies not to buffer, which would defeat streaming.
      "X-Accel-Buffering": "no",
      "Set-Cookie": buildSessionCookie(sessionId),
    },
  });
}
