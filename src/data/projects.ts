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

export const projects: Project[] = [
  // SECTION 1: AUTOMATION & AI AGENTS
  {
    id: "00",
    image: "/assets/images/scheduling-demo.jpg",
    href: "/demo/agendamento",
    category: "automation",
    en: {
      tag: "[00] // Live demo",
      title: "Scheduling Agent",
      description: "Book an appointment by chatting. The agent reads availability, creates, reschedules and cancels through the Cal.com API — running live, in the browser."
    },
    pt: {
      tag: "[00] // Demo ao vivo",
      title: "Agente de Agendamento",
      description: "Marque uma consulta conversando. O agente consulta horários, cria, remarca e cancela pela API do Cal.com — ao vivo, no navegador."
    }
  },
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
    href: "https://vagas-rp.vercel.app/",
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
    id: "03",
    image: "/assets/images/convite-win98.jpg",
    href: "https://convite.lucasschwingel.com/",
    category: "web",
    en: {
      tag: "[01] // Windows 98 in the browser",
      title: "Lucas.exe",
      description: "A birthday invitation built as a Windows 98 desktop — draggable windows, CRT boot, system sounds. RSVP and guest list persist in Postgres through n8n."
    },
    pt: {
      tag: "[01] // Windows 98 no navegador",
      title: "Lucas.exe",
      description: "Um convite de aniversário feito como área de trabalho do Windows 98 — janelas arrastáveis, boot de CRT, sons do sistema. RSVP e lista de convidados em Postgres via n8n."
    }
  },
  {
    // Named for what it is. Calling this an "animated landing page" described
    // the result and hid the method; the method is the interesting part, and
    // it is one of the three services the bento grid sells.
    id: "04",
    image: "/assets/images/artools.png",
    href: "https://artools-precision-pen-nu.vercel.app/",
    category: "web",
    en: {
      tag: "[02] // Generated with AI",
      title: "Artools",
      description: "Landing page for a fictional product, generated end to end with AI — layout, copy, images and video. GSAP and Lenis animations, directed entirely through prompt engineering."
    },
    pt: {
      tag: "[02] // Gerado com IA",
      title: "Artools",
      description: "Landing page de um produto fictício, gerada de ponta a ponta com IA — layout, texto, imagens e vídeo. Animações em GSAP e Lenis, dirigidas inteiramente por engenharia de prompt."
    }
  }
];
