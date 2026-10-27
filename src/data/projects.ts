export interface ProjectTranslation {
  tag: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  image: string;
  href: string;
  category: "automation" | "web";
  en: ProjectTranslation;
  pt: ProjectTranslation;
}

// O agente de agendamento saiu desta lista em 13/09/2026. Ele nao e um projeto
// entre outros: e a peca em que a posicao inteira do portfolio se apoia, e
// como card virava um de seis, com a mesma moldura e o mesmo peso visual que
// uma pagina de convite de aniversario. Agora tem secao propria
// (LiveDemoSection), acima desta. Nao readicionar aqui.
export const projects: Project[] = [
  // SECTION 1: AUTOMATION & AI AGENTS
  {
    id: "01",
    image: "/assets/images/assistente-ia-2.jpg",
    href: "https://t.me/suporte_certificado_IB_bot",
    category: "automation",
    en: {
      tag: "[01] // AI Agent (RAG)",
      title: "AI Assistant",
      description: "Autonomous assistant on Telegram. Processes texts, audios, and images in real time using N8N, Gemini, and Vector Memory (RAG)."
    },
    pt: {
      tag: "[01] // Agente IA (RAG)",
      title: "Assistente IA",
      description: "Assistente autônomo no Telegram. Processa textos, áudios e imagens em tempo real utilizando N8N, Gemini e Memória Vetorial (RAG)."
    }
  },
  {
    id: "02",
    image: "/assets/images/dashboard-rp.png",
    href: "https://vagasrp.lucasschwingel.com/",
    category: "automation",
    en: {
      tag: "[02] // Automated Dashboard",
      title: "Jobs Dashboard",
      description: "Real-time market intelligence dashboard. Automated data pipeline with N8N, jobs API, and PostgreSQL (Supabase)."
    },
    pt: {
      tag: "[02] // Dashboard Automático",
      title: "Dashboard Vagas",
      description: "Dashboard de inteligência de mercado em tempo real. Pipeline de dados automatizado com N8N, API de vagas e PostgreSQL (Supabase)."
    }
  },
  // SECTION 2: WEBSITES & INTERFACES
  {
    // Opens the section: the most substantial web piece here — full-stack, live,
    // with an argument of its own. The LLM only picks titles and writes the
    // one-line reason; every fact on the card — poster, rating, cast, trailer,
    // where to watch — comes from TMDB. Filed under web because the visible
    // piece is the editorial interface, not the pipeline behind it.
    id: "05",
    image: "/assets/images/filmpro.jpg",
    href: "https://filmpro.lucasschwingel.com",
    category: "web",
    en: {
      tag: "[01] // Facts come from TMDB",
      title: "FilmPro",
      description: "Describe what you want to feel; an AI agent picks the films and writes one line on why each answers you. Every fact (poster, rating, cast, trailer, where to watch) comes from TMDB, never the model. Next.js 16, n8n, PostgreSQL."
    },
    pt: {
      tag: "[01] // Os fatos vêm do TMDB",
      title: "FilmPro",
      description: "Você descreve o que quer sentir; um agente de IA escolhe os filmes e escreve, em uma frase, por que cada um responde ao pedido. Todo fato (pôster, nota, elenco, trailer, onde assistir) vem do TMDB, nunca do modelo. Next.js 16, n8n, PostgreSQL."
    }
  },
  {
    id: "06",
    image: "/assets/images/festiq.jpg",
    href: "https://festiq.lucasschwingel.com",
    category: "web",
    en: {
      tag: "[02] // From Spotify to poster",
      title: "Festiq",
      description: "Turns your top Spotify artists into festival posters (9:16 and 1:1) ready to export as PNG. Five visual themes, artist photos via Deezer, and a typographic engine that balances rows without truncating names. Next.js 15, OAuth PKCE."
    },
    pt: {
      tag: "[02] // Do Spotify para o cartaz",
      title: "Festiq",
      description: "Transforma os artistas mais ouvidos no Spotify em cartazes de festival (9:16 e 1:1) prontos para baixar em PNG. Cinco temas visuais, fotos reais via Deezer e motor tipográfico que equaliza fileiras sem cortar nomes. Next.js 15, OAuth PKCE."
    }
  },
  {
    id: "07",
    image: "/assets/images/eleicoesrs.jpg",
    href: "https://eleicoesrs2026.lucasschwingel.com",
    category: "web",
    en: {
      tag: "[03] // Official TSE audit",
      title: "RS 2026 Elections",
      description: "Analytical and cartographic dashboard for the presidential runoff in Rio Grande do Sul. Maps 497 cities and over 8,000 polling stations using official TSE open data, voting machine bulletin decoding (ASN.1 BER), and post-5 PM vote audit. Next.js 14, Leaflet, Python."
    },
    pt: {
      tag: "[03] // Auditoria oficial do TSE",
      title: "Eleições RS 2026",
      description: "Painel analítico e cartográfico do segundo turno presidencial no Rio Grande do Sul. Mapeia os 497 municípios e mais de 8 mil seções eleitorais com dados abertos do TSE, decodificação de boletins de urna (ASN.1 BER) e apuração de votos pós-17h. Next.js 14, Leaflet, Python."
    }
  },
  {
    id: "03",
    image: "/assets/images/convite-win98.jpg",
    href: "https://convite.lucasschwingel.com/",
    category: "web",
    en: {
      tag: "[04] // Windows 98 in the browser",
      title: "Lucas.exe",
      description: "A birthday invitation built as a Windows 98 desktop, with draggable windows, CRT boot and system sounds. RSVP and guest list persist in Postgres through n8n."
    },
    pt: {
      tag: "[04] // Windows 98 no navegador",
      title: "Lucas.exe",
      description: "Um convite de aniversário feito como área de trabalho do Windows 98, com janelas arrastáveis, boot de CRT e sons do sistema. RSVP e lista de convidados em Postgres via n8n."
    }
  },
  {
    // Named for what it is. Calling this an "animated landing page" described
    // the result and hid the method; the method is the interesting part, and
    // it is one of the three services the bento grid sells.
    id: "04",
    image: "/assets/images/artools.png",
    href: "https://artools.lucasschwingel.com/",
    category: "web",
    en: {
      tag: "[05] // Generated with AI",
      title: "Artools",
      description: "Landing page for a fictional product, generated end to end with AI: layout, copy, images and video. GSAP and Lenis animations, directed entirely through prompt engineering."
    },
    pt: {
      tag: "[05] // Gerado com IA",
      title: "Artools",
      description: "Landing page de um produto fictício, gerada de ponta a ponta com IA: layout, texto, imagens e vídeo. Animações em GSAP e Lenis, dirigidas inteiramente por engenharia de prompt."
    }
  }
];
