"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Wraps native scroll rather than replacing it, so position: sticky, anchors
// and the real scrollbar keep working. autoRaf and anchors both default to
// false in the library — without them nothing moves and the Navbar's
// #projects/#services/#contact links stop scrolling smoothly.
// respectReducedMotion defaults to true, so prefers-reduced-motion is honored
// by Lenis itself; no need to duplicate that check here.
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
