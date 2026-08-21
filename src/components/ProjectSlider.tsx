"use client";

import React, { useRef } from "react";
import { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectSliderProps {
  categoryTag: string;
  title: string;
  projects: Project[];
  alwaysShowArrows?: boolean;
}

export default function ProjectSlider({
  categoryTag,
  title,
  projects,
  alwaysShowArrows = false,
}: ProjectSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      // Smooth scrolling is animation the reduced-motion stylesheet cannot
      // reach: it is driven from here, not from CSS. Someone who asked the
      // system for less movement would still get a 400px glide.
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      {/* Slider Header */}
      <div className="max-w-[90rem] mx-auto pr-6 lg:pr-12">
        <AnimateOnScroll
          className="flex flex-row items-end justify-between gap-4 md:gap-6 mb-12"
          style={{ animation: "fadeSlideIn 0.8s ease-out 0s both" }}
        >
          <div>
            <span className="block flex items-center gap-4 mb-6 text-xs font-mono tracking-widest uppercase text-orange-brand">
              <span className="w-12 h-[1px] bg-orange-brand"></span>
              <span>{categoryTag}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight">
              {title}
            </h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className={`${alwaysShowArrows ? "flex" : "flex md:hidden"} gap-2 md:gap-4 shrink-0`}>
            {/* Icon-only controls: without a name a screen reader announces
                these as "button", twice, with nothing to tell them apart. The
                arrows themselves are decorative once the button is named. */}
            <button
              onClick={() => scroll("left")}
              aria-label={t("Ver projetos anteriores", "See previous projects")}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-[#0A0A0A] text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-white/20 transition-all duration-200 group cursor-pointer"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label={t("Ver mais projetos", "See more projects")}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:scale-105 transition-transform cursor-pointer group"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Slider Content */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-16 pt-4 pr-6 lg:pr-12 md:pl-0 mx-auto max-w-[90rem]"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
