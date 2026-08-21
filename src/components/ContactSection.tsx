"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { socials } from "@/data/socials";
import AnimateOnScroll from "./AnimateOnScroll";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-white/5 relative z-20"
    >
      {/* Contact Header */}
      <AnimateOnScroll
        className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16"
        style={{ animation: "fadeSlideIn 0.8s ease-out 0s both" }}
      >
        <span className="flex items-center justify-center gap-4 mb-6 text-xs font-mono tracking-widest uppercase text-orange-brand">
          <span className="w-12 h-[1px] bg-orange-brand"></span>
          <span>{t("Contato", "Contact")}</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4 text-glow">
          {t("Gostou do meu trabalho?", "Liked my work?")}
        </h2>
        <p className="text-lg text-neutral-400 font-light">
          {t(
            "Entre em contato ou acompanhe as minhas redes sociais para acompanhar novos projetos.",
            "Get in touch or follow my social networks to keep up with new projects."
          )}
        </p>
      </AnimateOnScroll>

      {/* Socials Grid */}
      <AnimateOnScroll
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        style={{ animation: "fadeSlideIn 0.8s ease-out 0.2s both" }}
      >
        {socials.map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 bg-surface border border-white/5 hover:border-orange-brand/50 hover:bg-white/[0.04] transition-colors border-l-2 border-l-transparent hover:border-l-orange-brand social-logo-hover"
          >
            <div className="flex items-center gap-4 text-neutral-300 group-hover:text-white transition-colors">
              <img
                src={social.icon}
                alt={social.label}
                width="24"
                height="24"
                className="opacity-100"
              />
              <span className="font-mono text-sm uppercase tracking-widest text-white group-hover:text-orange-brand transition-colors">
                {social.label}
              </span>
            </div>
            {/* Arrow-right-up icon inline */}
            <svg
              className="w-6 h-6 text-neutral-dim group-hover:text-orange-brand transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        ))}
      </AnimateOnScroll>
    </section>
  );
}
