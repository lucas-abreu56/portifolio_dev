"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Projects, Services and Contact are sections of the home page. From any
  // other route a bare "#projects" scrolls to nothing, so the link has to
  // navigate home first and land on the anchor there.
  const section = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  // The same three destinations render in two places: beside the wordmark from
  // md up, and on a second row beneath it below that. They used to simply
  // disappear under 768px, which left a phone visitor on any page other than
  // the home with no navigation at all beyond the back arrow.
  const sectionLinks = [
    { id: "projects", label: t("Projetos", "Projects") },
    { id: "services", label: t("Serviços", "Services") },
    { id: "contact", label: t("Contato", "Contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-lg border-b border-white/5 flex flex-col justify-center gap-2 px-6 py-3 md:h-20 md:flex-row md:items-center md:justify-between md:gap-0 md:py-0 lg:px-12 transition-all">
      <div className="flex items-center justify-between gap-4 md:contents">
        <div className="flex min-w-0 items-center gap-4">
          {/* The pulse dot reads as "this is live". Off the home page the back
              arrow already occupies that spot, and two marks side by side just
              crowd the wordmark. */}
          {isHome && (
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full animate-pulse bg-orange-brand"></span>
          )}
          {isHome ? (
            <a
              href="#"
              className="truncate text-white hover:text-orange-brand transition-colors font-medium tracking-tight text-lg"
            >
              Lucas<span className="text-neutral-dim">Abreu</span>
            </a>
          ) : (
            // Off the home page the wordmark is the way back, so it says so: an
            // arrow that leans left on hover, rather than a logo that looks
            // decorative and happens to be clickable.
            <Link
              href="/"
              aria-label={t("Voltar ao portfólio", "Back to the portfolio")}
              className="group flex min-w-0 items-center gap-2 text-white hover:text-orange-brand transition-colors font-medium tracking-tight text-lg"
            >
              <svg
                className="w-4 h-4 shrink-0 text-orange-brand transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              {/* One flex item, or the row's gap would open a space inside the
                  wordmark itself. */}
              <span className="truncate">
                Lucas<span className="text-neutral-dim">Abreu</span>
              </span>
            </Link>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-6">
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-neutral-dim items-center">
            {sectionLinks.map((link) => (
              <Link key={link.id} href={section(link.id)} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-white/5 border border-neutral-dim/80 rounded-sm text-xs font-mono hover:border-orange-brand hover:text-orange-brand transition-colors text-white cursor-pointer group flex items-center gap-2"
          >
            <svg
              className="w-3 h-3 group-hover:text-orange-brand text-neutral-400 transition-colors"
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
      </div>

      {/* Second row, below md only. Plain links: no overlay, no open/closed
          state, no focus trap and no Escape handling to get right. */}
      <div className="flex gap-6 text-[11px] font-mono uppercase tracking-widest text-neutral-dim md:hidden">
        {sectionLinks.map((link) => (
          <Link key={link.id} href={section(link.id)} className="hover:text-white transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
