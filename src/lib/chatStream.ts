/**
 * Parser for the NDJSON stream the n8n Chat Trigger emits in streaming mode.
 *
 * Two things about that stream drive this file:
 *
 * 1. n8n labels the response `application/json` but the body is one JSON
 *    object per line, not a single document, so `response.json()` cannot be
 *    used. Lines also arrive split across chunks.
 * 2. Tool calls are invisible. When the agent uses a tool, the stream emits a
 *    `begin`/`end` pair carrying no `item` at all, then opens a second cycle
 *    with the reply. An empty cycle is therefore the only evidence that work
 *    is happening, and a turn that queries availability can stay silent for
 *    several seconds — occasionally ten or more — with nothing else on the wire.
 */

export interface StreamMetadata {
  nodeId: string;
  nodeName: string;
  itemIndex: number;
  runIndex: number;
  timestamp: number;
}

export type StreamEvent =
  | { type: "begin"; metadata: StreamMetadata }
  | { type: "item"; content: string; metadata: StreamMetadata }
  | { type: "end"; metadata: StreamMetadata }
  // Heartbeat sent roughly every 30s. Note it carries no `metadata` field,
  // so nothing downstream may assume that key exists.
  | { type: "keepalive" }
  | { type: "error"; content?: string };

/**
 * Splits a growing byte stream into whole NDJSON lines.
 *
 * Holds the trailing partial line between calls, so a JSON object cut in half
 * across two chunks is reassembled rather than dropped.
 */
export function createLineParser() {
  let buffer = "";

  return {
    /** Feed a decoded chunk; get back whatever complete events it closed. */
    push(chunk: string): StreamEvent[] {
      buffer += chunk;
      const lines = buffer.split("\n");
      // The last element is either "" (chunk ended on a newline) or a partial
      // line still waiting for the rest of its bytes.
      buffer = lines.pop() ?? "";
      return lines.map(toEvent).filter((e): e is StreamEvent => e !== null);
    },

    /** Flush anything left when the stream closes without a final newline. */
    flush(): StreamEvent[] {
      const rest = buffer;
      buffer = "";
      const event = toEvent(rest);
      return event ? [event] : [];
    },
  };
}

function toEvent(line: string): StreamEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  try {
    const parsed = JSON.parse(trimmed) as StreamEvent;
    return typeof parsed?.type === "string" ? parsed : null;
  } catch {
    // A malformed line should not tear down a conversation that is otherwise
    // working; skipping it degrades one token, not the whole reply.
    return null;
  }
}

/**
 * Reads a fetch response body as decoded text chunks.
 *
 * `TextDecoder` runs in streaming mode because the agent's deltas split
 * mid-word and mid-codepoint — one chunk ended "Para começ" and the next
 * opened with "armos". Decoding each chunk independently would corrupt the
 * accented character straddling that boundary.
 */
export async function* readTextChunks(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal
): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      yield decoder.decode(value, { stream: true });
    }
    const tail = decoder.decode();
    if (tail) yield tail;
  } finally {
    reader.releaseLock();
  }
}
