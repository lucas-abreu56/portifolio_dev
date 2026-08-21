"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ShimmerButton from "./ShimmerButton";
import AnimateOnScroll from "./AnimateOnScroll";
import Image from "next/image";

export default function HeroSection() {
  const { t, language } = useLanguage();

  const arrowIcon = (
    <svg
      aria-hidden="true"
      className="text-lg text-orange-brand group-hover:translate-y-1 transition-transform"
      height="1em"
      role="img"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M12 3.25a.75.75 0 0 1 .75.75v9.25h1.5a.75.75 0 0 1 .75.75"
        fill="currentColor"
        fillRule="evenodd"
        opacity=".5"
      ></path>
      <path
        d="M12.75 13.25H18a.75.75 0 0 1 .53 1.28l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 .53-1.28z"
        fill="currentColor"
      ></path>
    </svg>
  );

  const heroImage = (
    <div className="relative z-10 w-64 md:w-80 lg:w-96 xl:w-[400px] aspect-[3/4] bg-[#0A0A0A] border border-white/10 shadow-2xl floating-card hero-card transform rotate-[2deg] hover:rotate-[0deg] overflow-hidden group">
      {/* Photo */}
      <Image
        alt="Lucas Abreu"
        className="w-full h-full object-cover transition-[opacity,transform] duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105 will-change-[transform,opacity]"
        src="/assets/images/user-img.png"
        width={400}
        height={533}
        priority
      />
      {/* Creative overlay: subtle orange tint */}
      <div className="absolute inset-0 bg-orange-brand/20 opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none z-10 hero-overlay" />
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80 transition-opacity duration-700 z-10 pointer-events-none" />
      {/* Small dot grid pattern overlay */}
      <div className="absolute inset-0 z-10 bg-grid-pattern-small opacity-20 pointer-events-none" />
      {/* Label */}
      <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 group-hover:border-orange-brand/50 transition-colors hero-label">
        <span className="text-[10px] font-mono uppercase text-orange-brand tracking-widest">
          Lucas_Abreu.png
        </span>
      </div>
    </div>
  );

  return (
    <section
      id="introduction"
      className="pt-32 pb-20 relative z-10 w-full max-w-[90rem] mx-auto min-h-[70vh] flex items-center justify-center px-6 lg:px-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
        {/* TEXT COLUMN */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          <AnimateOnScroll
            className="flex items-center gap-3 mb-6"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.1s both" }}
          >
            <span className="block mb-6 text-xs font-mono tracking-widest uppercase text-orange-brand">
              {t("Olá, eu sou o Lucas.", "Hi, I'm Lucas.")}
            </span>
          </AnimateOnScroll>

          {/* IMAGE ON MOBILE */}
          <AnimateOnScroll
            className="flex lg:hidden w-full relative h-[400px] items-center justify-center perspective-[1000px] mb-8"
            style={{ animation: "fadeSlideIn 0.8s ease-out 1.0s both" }}
          >
            {heroImage}
            <div className="absolute w-64 md:w-80 aspect-[3/4] bg-orange-brand/10 rounded-full blur-[60px] -z-10 pointer-events-none" />
          </AnimateOnScroll>

          <AnimateOnScroll
            className="text-glow mb-8"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.2s both" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] text-left font-medium tracking-tighter leading-[1.15] md:leading-[0.9] text-white">
              {t("Desenvolvedor de", "Developer of")}
              <br />
              <span className="text-orange-brand">
                {language === "pt" ? (
                  <>
                    Automações e <br className="hidden md:block" />
                    Agentes de IA
                  </>
                ) : (
                  <>
                    Automations & <br className="hidden md:block" />
                    AI Agents
                  </>
                )}
              </span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll
            className="text-left mb-10"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.4s both" }}
          >
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
              {t(
                "Transformo necessidades de negócios em automações reais e funcionais. Do roteamento inteligente de dados à criação de assistentes virtuais com visão computacional, desenvolvo arquiteturas robustas para resolver os desafios mais complexos da sua operação.",
                "I transform business needs into real and functional automations. From intelligent data routing to creating virtual assistants with computer vision, I develop robust architectures to solve the most complex challenges of your operation."
              )}
            </p>
          </AnimateOnScroll>

          {/* SKILLS TAGS */}
          <AnimateOnScroll
            className="flex flex-wrap justify-start gap-4 max-w-2xl"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.6s both" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-sm text-sm font-mono text-neutral-300 hover:text-orange-brand hover:border-orange-brand/50 transition-colors">
              <img src="/assets/logos/n8n-color.png" alt="N8N" width="16" height="16" /> N8N
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-sm text-sm font-mono text-neutral-300 hover:text-orange-brand hover:border-orange-brand/50 transition-colors">
              <img src="/assets/logos/AI.png" alt="AI Agents" width="16" height="16" /> AI Agents
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-sm text-sm font-mono text-neutral-300 hover:text-orange-brand hover:border-orange-brand/50 transition-colors">
              <span className="iconify" data-icon="logos:javascript" data-width="16" data-height="16"></span>
              Javascript
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-sm text-sm font-mono text-neutral-300 hover:text-orange-brand hover:border-orange-brand/50 transition-colors">
              <span className="iconify" data-icon="logos:python" data-width="16" data-height="16"></span> Python
            </div>
          </AnimateOnScroll>

          {/* CTA SHIMMER BUTTON */}
          <AnimateOnScroll
            className="mt-14"
            style={{ animation: "fadeSlideIn 0.8s ease-out 0.8s both" }}
          >
            <ShimmerButton href="#projects" icon={arrowIcon}>
              {t("Ver Projetos", "View Projects")}
            </ShimmerButton>
          </AnimateOnScroll>
        </div>

        {/* IMAGE COLUMN (DESKTOP) */}
        <AnimateOnScroll
          className="lg:col-span-5 relative h-auto hidden lg:flex items-center justify-center perspective-[1000px] mt-12 lg:mt-0"
          style={{ animation: "fadeSlideIn 0.8s ease-out 1.0s both" }}
        >
          {heroImage}
          {/* Glowing effect behind the image */}
          <div className="absolute w-64 md:w-80 lg:w-96 xl:w-[400px] aspect-[3/4] bg-orange-brand/10 rounded-full blur-[60px] -z-10 pointer-events-none" />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
