"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { socials } from "@/data/socials";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050505] py-8 border-t border-white/5 relative z-20">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-dim">
        <p>
          {t(
            "© 2026 Lucas Abreu. Todos os direitos reservados.",
            "© 2026 Lucas Abreu. All rights reserved."
          )}
        </p>
        <div className="flex items-center gap-6">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity social-logo-hover"
            >
              <img src={social.icon} alt={social.label} width="20" height="20" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
