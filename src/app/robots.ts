import type { MetadataRoute } from "next";

const BASE_URL = "https://www.lucasschwingel.com";

// Regra deste site: liberar `search` e `ai-input` (um agente lendo a página
// na hora porque alguém perguntou), bloquear `ai-train` (raspagem para
// treinar modelo). GPTBot é o crawler mais claramente ai-train hoje;
// ClaudeBot, ChatGPT-User, PerplexityBot e Google-Extended são
// majoritariamente ai-input e ficam livres pela regra geral abaixo.
//
// Isto por si só não libera nada na borda: o Cloudflare bloqueia esses
// user-agents antes da requisição chegar à Vercel (medido em 11/09/2026,
// ver docs/NOTES.local.md). Esta regra só tem efeito depois que o bloqueio
// no painel do Cloudflare for ajustado.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
