"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";
import ShimmerButton from "./ShimmerButton";

export default function LiveDemoSection() {
  const { t } = useLanguage();

  // Os tres fatos que sustentam a afirmacao, e que sao verificaveis: agenda
  // real, sem cadastro, e o agente escreve de verdade. Nada aqui e numero
  // inventado -- o PRODUCT.md proibe metrica fabricada, e nao existe nenhuma.
  const proof = [
    {
      term: t("Agenda real", "Real calendar"),
      detail: t("Cal.com, nao simulado", "Cal.com, not simulated"),
    },
    {
      term: t("Sem cadastro", "No signup"),
      detail: t("Nada para instalar", "Nothing to install"),
    },
    {
      term: t("Escreve, nao so le", "Writes, not just reads"),
      detail: t("Marca, remarca e cancela", "Books, reschedules, cancels"),
    },
  ];

  const arrowIcon = (
    <svg
      aria-hidden="true"
      className="text-lg text-orange-brand transition-transform group-hover:translate-x-1"
      height="1em"
      width="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );

  return (
    <section
      id="live-demo"
      className="w-full max-w-[90rem] mx-auto px-6 lg:px-12 py-24 border-t border-white/5 relative z-20"
    >
      {/* Uma faixa, nao um card: e a unica seccao da home que nao e lista nem
          grade. O contraste de forma e o que distingue a demo dos projetos,
          ja que o vocabulario visual e deliberadamente o mesmo. */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:items-center">
        <div className="min-w-0">
          <AnimateOnScroll
            className="flex items-center gap-3 mb-6"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0s both" }}
          >
            {/* Mesmo ponto da navbar, de proposito. La ele diz "o site esta no
                ar"; aqui diz "esta coisa esta no ar". A repeticao e o que da
                significado ao sinal. Sob movimento reduzido o globals.css o
                deixa aceso e parado -- nunca apagado. */}
            <span
              aria-hidden="true"
              className="inline-flex h-2 w-2 shrink-0 rounded-full bg-orange-brand animate-pulse"
            />
            <span className="font-mono text-xs uppercase tracking-widest text-orange-brand">
              {t("[Demo ao vivo] // Rodando agora", "[Live demo] // Running now")}
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll
            className="text-glow mb-6"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.1s both" }}
          >
            <h2 className="hyphens-auto text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter break-words text-white">
              {t("Um agente de IA", "An AI agent")}
              <br />
              <span className="text-orange-brand">
                {t("rodando de verdade", "actually running")}
              </span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.2s both" }}
          >
            <p className="max-w-xl text-base md:text-lg font-light leading-relaxed text-neutral-400">
              {t(
                "Marque uma consulta conversando com ele. O agente consulta os horarios livres, cria a reserva, remarca e cancela — falando de fato com a API do Cal.com, num endpoint aberto a qualquer visitante.",
                "Book an appointment by chatting with it. The agent looks up open slots, creates the booking, reschedules and cancels — actually calling the Cal.com API, on an endpoint open to any visitor."
              )}
            </p>
          </AnimateOnScroll>

          {/* A latencia e fato, e o PRODUCT.md manda comunica-la em vez de
              esconde-la: um agente que demora porque chamou a ferramenta de
              verdade e mais convincente que um que responde instantaneo. */}
          <AnimateOnScroll
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.3s both" }}
          >
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-neutral-dim">
              {t(
                "Consultar a agenda leva alguns segundos: ele decide, chama a ferramenta, le a resposta e volta a escrever.",
                "Checking the calendar takes a few seconds: it decides, calls the tool, reads the response, then writes back."
              )}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll
            className="mt-10"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.4s both" }}
          >
            <ShimmerButton href="/demo/agendamento" icon={arrowIcon}>
              {t("Experimentar agora", "Try it now")}
            </ShimmerButton>
          </AnimateOnScroll>
        </div>

        {/* A prova, em rotulos mono: o mesmo registro de saida de sistema que
            o resto do site usa para metadado. */}
        <AnimateOnScroll
          className="min-w-0"
          style={{ animation: "fadeSlideIn 0.8s ease-out 0.5s both" }}
        >
          <dl className="grid grid-cols-1 gap-px bg-white/5 border border-white/10">
            {proof.map((item) => (
              <div key={item.term} className="bg-surface px-5 py-5">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-orange-brand">
                  {item.term}
                </dt>
                <dd className="mt-2 text-sm font-light leading-relaxed text-neutral-300">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
