"use client";

import React from "react";

interface ShimmerButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function ShimmerButton({ href, children, icon }: ShimmerButtonProps) {
  return (
    <a
      className="group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden bg-transparent pt-4 pr-8 pb-4 pl-8 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)] w-max"
      href={href}
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": "#F97316",
          "--speed": "3s",
        } as React.CSSProperties
      }
    >
      {/* Background conic gradient rotating */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-[spin_3s_linear_infinite]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))",
            }}
          />
        </div>
      </div>
      {/* Dark overlay with spacing */}
      <div className="absolute inset-[1px] -z-10 bg-[#050505] transition-colors duration-300 group-hover:bg-[#111]" />
      <span>{children}</span>
      {icon}
    </a>
  );
}
