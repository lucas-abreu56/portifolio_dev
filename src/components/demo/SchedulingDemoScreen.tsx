"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SchedulingDemo from "@/components/demo/SchedulingDemo";

/**
 * The stack behind the demo, in call order: the agent runs in n8n, thinks with
 * Gemini, writes to Cal.com, and is proxied by Next.
 *
 * n8n keeps its own bitmap because the brand mark is multicolour; the other
 * three are single-colour marks, so they take `color` and inherit cleanly.
 * Cal.com and Next.js are black wordmarks — on this ground they read as white.
 */
const STACK: { label: string; icon: string; color?: string; image?: string }[] = [
  { label: "n8n", icon: "", image: "/assets/logos/n8n-color.png" },
  { label: "Gemini", icon: "simple-icons:googlegemini", color: "#4285F4" },
  { label: "Cal.com API", icon: "simple-icons:caldotcom", color: "#FFFFFF" },
  { label: "Next.js", icon: "simple-icons:nextdotjs", color: "#FFFFFF" },
];

export default function SchedulingDemoScreen() {
  const { t } = useLanguage();

  const notes: { term: string; detail: string }[] = [
    {
      term: t("Endpoint anônimo", "Anonymous endpoint"),
      detail: t(
        "Qualquer visitante conversa sem se identificar. O navegador nunca fala com o n8n: um Route Handler no servidor guarda a credencial e aplica limite por IP, porque é o único ponto onde isso pode ser imposto.",
        "Anyone can talk to it without signing in. The browser never reaches n8n: a server-side route handler holds the credential and enforces a per-IP limit, because that is the only place it can be enforced."
      ),
    },
    {
      term: t("Posse por sessão", "Session-scoped ownership"),
      detail: t(
        "O identificador da conversa é gerado no servidor, num cookie httpOnly. Ele não é preferência do cliente, é token de posse: só quem tem o cookie alcança o agendamento criado naquela conversa.",
        "The conversation id is minted server-side into an httpOnly cookie. It isn't a client preference, it's a token of ownership: only the holder can reach the booking made in that conversation."
      ),
    },
    {
      term: t("Identidade não vem do modelo", "Identity never comes from the model"),
      detail: t(
        "Nenhuma ferramenta recebe e-mail ou id escolhido pelo LLM para localizar um agendamento — isso seria negociável em linguagem natural. Cancelar e remarcar só operam sobre o que a própria conversa criou.",
        "No tool takes an email or id chosen by the model to look up a booking — that would be negotiable in plain language. Cancelling and rescheduling only act on what this conversation itself created."
      ),
    },
    {
      term: t("Confirmação imposta pelo servidor", "Confirmation enforced server-side"),
      detail: t(
        "Marcar e cancelar exigem duas chamadas, em turnos diferentes: a primeira só registra a intenção e devolve os dados para o visitante conferir. Pedir confirmação no prompt não bastava — o modelo às vezes pulava a etapa.",
        "Booking and cancelling take two calls, in different turns: the first only records the intent and hands back the details for the visitor to check. Asking for confirmation in the prompt wasn't enough — the model sometimes skipped it."
      ),
    },
    {
      term: t("Falha não vira sucesso", "A failure stays a failure"),
      detail: t(
        "Quando a agenda recusa a operação, a ferramenta devolve uma frase, não um stack trace. Antes disso o agente lia o erro e anunciava sucesso assim mesmo.",
        "When the calendar refuses, the tool returns a sentence, not a stack trace. Before that, the agent would read the error and announce success anyway."
      ),
    },
    {
      term: t("O que mudaria em produção", "What would change in production"),
      detail: t(
        "Escopo por sessão é a versão leve do padrão certo. Num sistema real a posse viria de magic link no e-mail de confirmação ou de um código de uso único.",
        "Session scoping is the lightweight version of the right pattern. In a real system, ownership would come from a magic link in the confirmation email, or a one-time code."
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[90rem] px-6 pt-32 pb-24 lg:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Framing */}
        <header className="lg:col-span-5">
          <span className="font-mono text-xs uppercase tracking-widest text-orange-brand">
            {t("[Demo ao vivo] // Agente de agendamento", "[Live demo] // Scheduling agent")}
          </span>

          <h1 className="mt-6 text-4xl font-medium tracking-tighter text-white lg:text-5xl">
            {t("Marque uma consulta", "Book an appointment")}
            <span className="block text-neutral-500">
              {t("conversando", "by chatting")}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-neutral-400">
            {t(
              "Uma clínica fictícia, uma agenda real. O agente consulta horários livres, cria a reserva, remarca e cancela — falando com a API do Cal.com por trás, não fingindo que fala.",
              "A fictional clinic, a real calendar. The agent looks up open slots, creates the booking, reschedules and cancels — actually calling the Cal.com API behind the scenes, not pretending to."
            )}
          </p>

          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-neutral-500">
            {t(
              "Consultar a agenda leva alguns segundos: o agente decide, chama a ferramenta, lê a resposta e volta a escrever. O painel mostra em que etapa ele está.",
              "Checking the calendar takes a few seconds: the agent decides, calls the tool, reads the response, then writes back. The panel shows which step it's on."
            )}
          </p>

          <AnimateOnScroll
            className="mt-8 flex flex-wrap gap-4"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.6s both" }}
          >
            {STACK.map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#0A0A0A] px-4 py-2 font-mono text-sm text-neutral-300 transition-colors hover:border-orange-brand/50 hover:text-orange-brand"
              >
                {tech.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tech.image} alt="" width="16" height="16" />
                ) : (
                  <span
                    className="iconify"
                    data-icon={tech.icon}
                    data-width="16"
                    data-height="16"
                    style={{ color: tech.color }}
                  />
                )}
                {tech.label}
              </div>
            ))}
          </AnimateOnScroll>
        </header>

        {/* Chat */}
        <div className="lg:col-span-7">
          <SchedulingDemo />
        </div>
      </div>

      {/* Architecture notes */}
      <section className="mt-24 border-t border-white/5 pt-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          {t("// Notas de arquitetura", "// Architecture notes")}
        </h2>

        <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-neutral-400">
          {t(
            "Expor um agente que escreve numa agenda real, para tráfego anônimo, é sobretudo um problema de contenção. O que foi decidido, e por quê:",
            "Exposing an agent that writes to a real calendar, to anonymous traffic, is mostly a containment problem. What was decided, and why:"
          )}
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {notes.map((note) => (
            <div key={note.term} className="border-l border-white/10 pl-5">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-orange-brand">
                {note.term}
              </dt>
              <dd className="mt-3 text-sm font-light leading-relaxed text-neutral-400">
                {note.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
