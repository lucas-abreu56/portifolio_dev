"use client";

import { useCallback, useRef, useState } from "react";
import {
  createLineParser,
  readTextChunks,
  type StreamEvent,
} from "@/lib/chatStream";

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  text: string;
}

/**
 * `working` is the interesting one: it means a cycle opened and closed without
 * producing any text, which is how a tool call looks from outside. It is the
 * only hook available for telling the visitor that the agent is doing
 * something while an availability lookup runs.
 */
export type AgentStatus = "idle" | "thinking" | "working" | "streaming";

export interface AgentError {
  kind: "rate-limited" | "unavailable" | "network";
  retryAfterSeconds?: number;
}

export function useSchedulingAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [error, setError] = useState<AgentError | null>(null);
  // When the current turn began, or null when nothing is in flight. Kept
  // separate from `status` on purpose: a turn moves through thinking → working
  // → streaming, and a counter anchored to the status would restart at every
  // hop, which is exactly when the visitor is waiting longest.
  const [turnStartedAt, setTurnStartedAt] = useState<number | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const idRef = useRef(0);
  const nextId = () => `m${++idRef.current}`;

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStatus("idle");
    setError(null);
    setTurnStartedAt(null);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", text: trimmed },
      ]);
      setStatus("thinking");
      setTurnStartedAt(Date.now());

      let response: Response;
      try {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
          signal: controller.signal,
        });
      } catch {
        if (!controller.signal.aborted) {
          setError({ kind: "network" });
          setStatus("idle");
          setTurnStartedAt(null);
        }
        return;
      }

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("retry-after"));
        setError({
          kind: "rate-limited",
          retryAfterSeconds: Number.isFinite(retryAfter) ? retryAfter : undefined,
        });
        setStatus("idle");
        setTurnStartedAt(null);
        return;
      }

      if (!response.ok || !response.body) {
        setError({ kind: "unavailable" });
        setStatus("idle");
        setTurnStartedAt(null);
        return;
      }

      const agentId = nextId();
      const parser = createLineParser();
      let reply = "";
      // Tracks whether the cycle currently open has produced any text. A cycle
      // that closes still empty was a tool call.
      let cycleProducedText = false;

      const apply = (event: StreamEvent) => {
        switch (event.type) {
          case "begin":
            cycleProducedText = false;
            break;

          case "item":
            if (!reply) {
              setMessages((prev) => [
                ...prev,
                { id: agentId, role: "agent", text: "" },
              ]);
            }
            cycleProducedText = true;
            reply += event.content;
            setStatus("streaming");
            setMessages((prev) =>
              prev.map((m) => (m.id === agentId ? { ...m, text: reply } : m))
            );
            break;

          case "end":
            // Empty cycle → a tool ran and another cycle is coming.
            if (!cycleProducedText) setStatus("working");
            break;

          case "error":
            setError({ kind: "unavailable" });
            break;

          case "keepalive":
            break;
        }
      };

      try {
        for await (const chunk of readTextChunks(
          response.body,
          controller.signal
        )) {
          for (const event of parser.push(chunk)) apply(event);
        }
        for (const event of parser.flush()) apply(event);
      } catch {
        if (!controller.signal.aborted && !reply) {
          setError({ kind: "network" });
        }
      } finally {
        if (!controller.signal.aborted) {
          setStatus("idle");
          setTurnStartedAt(null);
        }
        if (abortRef.current === controller) abortRef.current = null;
      }
    },
    []
  );

  return { messages, status, error, turnStartedAt, send, reset };
}
