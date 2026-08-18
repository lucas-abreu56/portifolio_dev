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
    id: "03", // Original list: Card 1 (Artools)
    image: "/assets/images/artools.png",
    href: "https://artools-precision-pen-nu.vercel.app/",
    category: "web",
    en: {
      tag: "[01] // Animated Landing Page",
      title: "Artools",
      description: "Animated landing page for the \"best pen in the world\"."
    },
    pt: {
      tag: "[01] // Landing Page Animada",
      title: "Artools",
      description: "Landing Page animada da \"melhor caneta do mundo\"."
    }
  },
  {
    id: "04", // Original list: Card 2 (Zingen)
    image: "/assets/images/zingen.png",
    href: "https://lucas-abreu56.github.io/zingen/",
    category: "web",
    en: {
      tag: "[02] // Web App",
      title: "Zingen",
      description: "Landing Page for a family Karaoke app."
    },
    pt: {
      tag: "[02] // Web App",
      title: "Zingen",
      description: "Landing Page de aplicativo de Karaôke para toda a família."
    }
  },
  {
    id: "05", // Original list: Card 3 (Travelgram)
    image: "/assets/images/Thumbnail_Project-01.png",
    href: "https://lucas-abreu56.github.io/travelgram-perfil-de-viagens/",
    category: "web",
    en: {
      tag: "[03] // Social",
      title: "Travelgram",
      description: "Social network for recording trips around the world."
    },
    pt: {
      tag: "[03] // Social",
      title: "Travelgram",
      description: "Rede social para registros de viagens pelo mundo."
    }
  },
  {
    id: "06", // Original list: Card 4 (Tech News)
    image: "/assets/images/Thumbnail_Project-02.png",
    href: "https://lucas-abreu56.github.io/projeto-portal-de-noticias/",
    category: "web",
    en: {
      tag: "[04] // Portal",
      title: "Tech News",
      description: "Homepage of a technology news portal."
    },
    pt: {
      tag: "[04] // Portal",
      title: "Tech News",
      description: "Homepage de um portal de notícias sobre a área de tecnologia."
    }
  },
  {
    id: "07", // Original list: Card 5 (AluraBooks)
    image: "/assets/images/alura-books.png",
    href: "https://lucas-abreu56.github.io/alurabooks/",
    category: "web",
    en: {
      tag: "[05] // E-commerce",
      title: "AluraBooks",
      description: "Responsive online bookstore for reading and selling books."
    },
    pt: {
      tag: "[05] // E-commerce",
      title: "AluraBooks",
      description: "Livraria online responsiva para leitura e venda de livros."
    }
  }
];
