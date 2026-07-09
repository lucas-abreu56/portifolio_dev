"use client";

import React from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  className = "",
  style,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useInViewAnimation(once);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
