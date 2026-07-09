"use client";

import { useEffect } from "react";

export function useMobileFocus() {
  useEffect(() => {
    const handleMobileFocus = () => {
      const cards = document.querySelectorAll(".slide-container, .hero-card");
      if (cards.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (window.innerWidth <= 768) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-focus");
              } else {
                entry.target.classList.remove("in-focus");
              }
            });
          }
        },
        {
          root: null,
          threshold: 0.75, // Activates when 75% visible on mobile
        }
      );

      cards.forEach((card) => observer.observe(card));

      return () => {
        cards.forEach((card) => observer.unobserve(card));
      };
    };

    // Small delay to ensure all components are fully rendered in the DOM
    const timer = setTimeout(handleMobileFocus, 500);

    return () => clearTimeout(timer);
  }, []);
}
