export interface ServiceTranslation {
  title: string;
  description: string;
}

export interface Service {
  icon: string;
  en: ServiceTranslation;
  pt: ServiceTranslation;
}

export const services: Service[] = [
  {
    icon: "/assets/devices/api.logo.svg",
    en: {
      title: "Intelligent Automation",
      description: "Design and implementation of complex workflows using N8N and Python to integrate corporate systems and automate business routines."
    },
    pt: {
      title: "Automação Inteligente",
      description: "Desenho e implementação de fluxos complexos utilizando N8N e Python para integrar sistemas corporativos e automatizar rotinas de negócios."
    }
  },
  {
    icon: "/assets/devices/robot.svg",
    en: {
      title: "Agent Engineering",
      description: "Creation of autonomous virtual assistants integrated with Vector Stores (RAG) to provide intelligence connected to your company's data."
    },
    pt: {
      title: "Engenharia de Agentes",
      description: "Criação de assistentes virtuais autônomos integrados a Vector Stores (RAG) para fornecer inteligência conectada aos dados da sua empresa."
    }
  },
  {
    icon: "/assets/devices/websites.logo.svg",
    en: {
      title: "Specialized Prompting",
      description: "Refinement and structuring of advanced prompts to ensure AI executes precise decisions, follows strict rules, and formats tailored responses."
    },
    pt: {
      title: "Prompt Especializado",
      description: "Refinamento e estruturação de prompts avançados para garantir que a IA execute decisões precisas, siga regras estritas e formate respostas sob medida."
    }
  }
];
