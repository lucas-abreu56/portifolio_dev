"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/data/projects";
import ProjectSlider from "./ProjectSlider";

export default function ProjectsSection() {
  const { t } = useLanguage();

  const automationProjects = projects.filter((p) => p.category === "automation");
  const webProjects = projects.filter((p) => p.category === "web");

  return (
    <section
      id="projects"
      className="py-24 pl-6 lg:pl-12 w-full max-w-[100vw] overflow-hidden border-t border-white/5 relative z-20"
    >
      {/* SUB-SECTION 1: AUTOMATION & AI AGENTS */}
      <ProjectSlider
        categoryTag={t("Automação & Agentes de IA", "Automation & AI Agents")}
        title={t("Projetos em destaque", "Featured Projects")}
        projects={automationProjects}
        alwaysShowArrows={false} // Match original `flex md:hidden`
      />

      {/* Divider */}
      <div className="max-w-[90rem] mx-auto pr-6 lg:pr-12 mt-12 border-t border-white/5" />

      {/* SUB-SECTION 2: WEBSITES & INTERFACES */}
      <div className="pt-12">
        <ProjectSlider
          categoryTag={t("Websites & Interfaces", "Websites & Interfaces")}
          title={t("Interfaces", "Interfaces")}
          projects={webProjects}
          alwaysShowArrows={true} // Match original `flex`
        />
      </div>
    </section>
  );
}
