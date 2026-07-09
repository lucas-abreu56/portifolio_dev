"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-lg border-b border-white/5 h-20 flex justify-between items-center px-6 lg:px-12 transition-all">
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center justify-center w-2 h-2 rounded-full animate-pulse bg-[#F97316]"></span>
        <a
          href="#"
          className="text-white hover:text-[#F97316] transition-colors font-medium tracking-tight text-lg"
        >
          Lucas<span className="text-neutral-500">Abreu</span>
        </a>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-neutral-500 items-center">
          <a href="#projects" className="hover:text-white transition-colors">
            {t("Projetos", "Projects")}
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            {t("Serviços", "Services")}
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            {t("Contato", "Contact")}
          </a>
        </div>

        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-xs font-mono hover:border-[#F97316] hover:text-[#F97316] transition-colors text-white cursor-pointer group flex items-center gap-2"
        >
          <svg
            className="w-3 h-3 group-hover:text-[#F97316] text-neutral-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            ></path>
          </svg>
          <span>{language === "en" ? "PT-BR" : "EN"}</span>
        </button>
      </div>
    </nav>
  );
}
