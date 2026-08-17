"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSchedulingAgent } from "@/hooks/useSchedulingAgent";

/** Seconds of silence before the elapsed counter appears. */
const COUNTER_AFTER_SECONDS = 3;

export default function SchedulingDemo() {
  const { t } = useLanguage();
  const { messages, status, error, turnStartedAt, send, reset } =
    useSchedulingAgent();
  const [draft, setDraft] = useState("");
  const [elapsed, setElapsed] = useState(0);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const busy = status !== "idle";
  const started = messages.length > 0;

  // An availability lookup can stay silent for several seconds. A counter is
  // the cheapest honest signal that the request is alive, not hung.
  //
  // It is anchored to the start of the turn, not to `status`: a turn hops from
  // thinking to working to streaming, and restarting the count at each hop
  // would keep it below the display threshold for the whole wait.
  //
  // The value is only ever advanced from the interval callback, and zeroed in
  // the cleanup — setting it in the effect body would cascade an extra render.
  useEffect(() => {
    if (turnStartedAt === null) return;

    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - turnStartedAt) / 1000)),
      1000
    );

    return () => {
      clearInterval(id);
      setElapsed(0);
    };
  }, [turnStartedAt]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const submit = (text: string) => {
    if (busy) return;
    setDraft("");
    void send(text);
    inputRef.current?.focus();
  };

  const suggestions = [
    t("Quero marcar uma consulta", "I'd like to book an appointment"),
    t("Que horários têm essa semana?", "What times are open this week?"),
    t("Preciso remarcar", "I need to reschedule"),
  ];

  const statusLabel =
    status === "working"
      ? t("Consultando a agenda", "Checking the calendar")
      : status === "thinking"
        ? t("Pensando", "Thinking")
        : null;

  return (
    <div className="w-full">
      <div className="relative border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-lg">
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-2 w-2 rounded-full ${
                busy ? "animate-pulse bg-[#F97316]" : "bg-neutral-600"
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              {t("Clínica fictícia", "Fictional clinic")} ·{" "}
              {t("Agente de agendamento", "Scheduling agent")}
            </span>
          </div>
          {started && (
            <button
              onClick={reset}
              disabled={busy}
              className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 transition-colors hover:text-[#F97316] disabled:opacity-30"
            >
              {t("Recomeçar", "Restart")}
            </button>
          )}
        </div>

        {/* Transcript */}
        <div
          ref={transcriptRef}
          className="hide-scrollbar h-[26rem] space-y-5 overflow-y-auto px-5 py-6"
        >
          {!started && (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <p className="max-w-md text-sm font-light leading-relaxed text-neutral-400">
                {t(
                  "Você é o paciente. Peça um horário, marque, e depois tente remarcar ou cancelar — o agente conversa com uma agenda real do Cal.com.",
                  "You're the patient. Ask for a time, book it, then try rescheduling or cancelling — the agent talks to a real Cal.com calendar."
                )}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                {t(
                  "Use dados fictícios — nada aqui é confidencial",
                  "Use made-up details — nothing here is private"
                )}
              </p>
            </div>
          )}

          {messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="flex justify-end">
                <p className="max-w-[85%] border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-light leading-relaxed text-white">
                  {message.text}
                </p>
              </div>
            ) : (
              <div key={message.id} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#F97316]">
                  {t("Agente", "Agent")}
                </span>
                <p className="max-w-[92%] whitespace-pre-wrap text-sm font-light leading-relaxed text-neutral-300">
                  {message.text}
                </p>
              </div>
            )
          )}

          {statusLabel && (
            <div className="flex items-center gap-3">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#F97316]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                {statusLabel}
                {elapsed >= COUNTER_AFTER_SECONDS && (
                  <span className="text-neutral-600"> · {elapsed}s</span>
                )}
              </span>
            </div>
          )}

          {error && (
            <p className="border border-[#F97316]/30 bg-[#F97316]/5 px-4 py-3 text-xs font-light leading-relaxed text-neutral-300">
              {error.kind === "rate-limited"
                ? t(
                    `Muitas mensagens seguidas. Tente de novo em ${error.retryAfterSeconds ?? 60}s.`,
                    `Too many messages in a row. Try again in ${error.retryAfterSeconds ?? 60}s.`
                  )
                : t(
                    "O agente não respondeu. É uma demonstração em infraestrutura modesta — tente novamente.",
                    "The agent didn't respond. This is a demo on modest infrastructure — please try again."
                  )}
            </p>
          )}
        </div>

        {/* Suggestions */}
        {!started && (
          <div className="flex flex-wrap gap-2 border-t border-white/5 px-5 py-4">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => submit(suggestion)}
                disabled={busy}
                className="border border-white/10 px-3 py-1.5 text-xs font-light text-neutral-400 transition-colors hover:border-[#F97316]/50 hover:text-[#F97316] disabled:opacity-30"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(draft);
          }}
          className="flex items-center gap-3 border-t border-white/5 px-5 py-4"
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            disabled={busy}
            maxLength={2000}
            placeholder={t("Digite sua mensagem…", "Type your message…")}
            className="flex-1 bg-transparent text-sm font-light text-white placeholder:text-neutral-600 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            className="border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition-colors hover:border-[#F97316] hover:text-[#F97316] disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
          >
            {t("Enviar", "Send")}
          </button>
        </form>

        <div className="beam-border-h" />
      </div>
    </div>
  );
}
