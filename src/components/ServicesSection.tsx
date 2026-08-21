"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import AnimateOnScroll from "./AnimateOnScroll";

export default function ServicesSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="services"
      className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-white/5 relative z-20"
    >
      {/* Header Tag */}
      <AnimateOnScroll
        className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase mb-6 text-orange-brand"
        style={{ animation: "fadeSlideIn 0.8s ease-out 0s both" }}
      >
        <span className="w-12 h-[1px] bg-orange-brand"></span>
        <span>{t("O que eu faço", "What I do")}</span>
      </AnimateOnScroll>

      {/* Header Title */}
      <AnimateOnScroll
        style={{ animation: "fadeSlideIn 0.8s ease-out 0.1s both" }}
      >
        <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-16">
          {t("Como posso ajudar o seu negócio", "How I can help your business")}
        </h2>
      </AnimateOnScroll>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, i) => {
          const info = language === "pt" ? service.pt : service.en;
          const delay = `${(0.2 + i * 0.1).toFixed(1)}s`;

          return (
            <AnimateOnScroll
              key={i}
              className="h-full"
              style={{ animation: `fadeSlideIn 0.8s ease-out ${delay} both` }}
            >
              <div className="group relative overflow-hidden bg-surface border border-white/5 flex flex-col pt-12 p-8 floating-card h-full">
                {/* Glowing blob on top-right */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-brand/5 rounded-full blur-3xl group-hover:bg-orange-brand/10 pointer-events-none transition-colors duration-700" />
                
                {/* Icon Container */}
                <div className="text-orange-brand bg-white/5 w-14 h-14 border border-white/10 rounded-sm mb-8 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-700">
                  <img src={service.icon} alt={info.title} width="28" height="28" />
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-medium text-white group-hover:text-orange-brand transition-colors duration-700 mb-2">
                  {info.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {info.description}
                </p>

                {/* Bottom border laser line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-brand/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
}
