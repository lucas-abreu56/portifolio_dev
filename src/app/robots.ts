import type { MetadataRoute } from "next";

const BASE_URL = "https://www.lucasschwingel.com";

// Regra deste site: liberar `search` e `ai-input` (um agente lendo a página
// na hora porque alguém perguntou), bloquear `ai-train` (raspagem para
// treinar modelo). GPTBot é o crawler mais claramente ai-train hoje;
// ClaudeBot, ChatGPT-User, PerplexityBot e Google-Extended são
// majoritariamente ai-input e ficam livres pela regra geral abaixo.
//
// O bloqueio na borda do Cloudflare que anulava esta regra saiu: medido em
// 12/09/2026, ClaudeBot, PerplexityBot, Google-Extended e GPTBot recebem 200
// em https://www.lucasschwingel.com/. Esta regra agora vale de fato — é o
// robots.txt que decide, não o painel. (Antes, 11/09/2026, todos tomavam 403
// do Cloudflare antes de chegar à Vercel.)
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
