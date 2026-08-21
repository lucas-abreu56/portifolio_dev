"use client";

import React from "react";
import { Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimateOnScroll from "./AnimateOnScroll";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { language } = useLanguage();
  const info = language === "pt" ? project.pt : project.en;

  // Projects hosted here are routed client-side and stay in the tab; anything
  // off-site keeps opening in a new one so the portfolio is not navigated away.
  const isInternal = project.href.startsWith("/");

  // Calculate stagger delays based on the index of the card inside the slider
  const delayOffset = index * 0.4;
  const headerDelay = `${(0.2 + delayOffset).toFixed(1)}s`;
  const shimmerDelay = `${(0.3 + delayOffset).toFixed(1)}s`;
  const titleDelay = `${(0.4 + delayOffset).toFixed(1)}s`;
  const descDelay = `${(0.5 + delayOffset).toFixed(1)}s`;

  const cardClassName = "block flex-shrink-0 snap-center";

  const card = (
      <div
        className="slide-container group flex flex-col justify-between overflow-hidden bg-surface border border-white/10 relative shadow-2xl floating-card w-[85vw] md:w-[400px] lg:w-[450px]"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Background Image */}
        <Image
          src={project.image}
          alt={info.title}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 400px, 450px"
          className="object-cover opacity-50 group-hover:opacity-100 transition-[opacity,transform] duration-700 group-hover:scale-105 z-0 will-change-[transform,opacity]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10 pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 bg-grid-pattern-small opacity-20" />

        {/* Content Container */}
        <div className="p-6 md:p-8 relative z-20 flex flex-col h-full justify-between">
          
          {/* Card Header (Tag + Arrow Button) */}
          <AnimateOnScroll
            className="flex items-start justify-between"
            style={{ animation: `fadeSlideIn 0.8s ease-out ${headerDelay} both` }}
          >
            <span className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest bg-[#111] border border-white/10 px-3 py-1 rounded-sm">
              {info.tag}
            </span>
            <div className="p-2 bg-[#111] rounded-full border border-white/10 text-white transition-colors group-hover:bg-orange-brand group-hover:border-orange-brand">
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
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
            </div>
          </AnimateOnScroll>

          {/* Card Footer (Shimmer bars + Title + Description) */}
          <div className="mt-auto">
            {/* Shimmer clip bars */}
            <AnimateOnScroll
              className="flex gap-1 h-3 mb-4 max-w-[80px]"
              style={{ animation: `fadeSlideIn 0.8s ease-out ${shimmerDelay} both` }}
            >
              <div className="flex-1 bg-white/20 rounded-sm animate-clip" style={{ animationDelay: "0s" }} />
              <div className="flex-1 bg-white/40 rounded-sm animate-clip" style={{ animationDelay: "0.2s" }} />
              <div className="flex-1 bg-orange-brand rounded-sm animate-clip" style={{ animationDelay: "0.4s" }} />
            </AnimateOnScroll>

            {/* Title */}
            <AnimateOnScroll
              style={{ animation: `fadeSlideIn 0.8s ease-out ${titleDelay} both` }}
            >
              <h3 className="leading-[1] text-5xl md:text-6xl tracking-tighter text-white mb-4 group-hover:text-orange-brand transition-colors text-glow">
                {info.title}
              </h3>
            </AnimateOnScroll>

            {/* Description */}
            <AnimateOnScroll
              style={{ animation: `fadeSlideIn 0.8s ease-out ${descDelay} both` }}
            >
              <p className="uppercase leading-relaxed text-[10px] md:text-xs text-neutral-300 tracking-wide font-mono max-w-[90%] border-l-2 border-orange-brand pl-4 bg-black/40 p-3">
                {info.description}
              </p>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Hover beam border at the bottom */}
        <div className="beam-border-h" style={{ bottom: 0 }} />
      </div>
  );

  return isInternal ? (
    <Link href={project.href} className={cardClassName}>
      {card}
    </Link>
  ) : (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClassName}
    >
      {card}
    </a>
  );
}
