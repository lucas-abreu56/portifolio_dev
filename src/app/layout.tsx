import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lucas Abreu - Automation & AI",
  description: "Lucas Abreu's Portfolio - Developer of Automations & AI Agents",
  icons: {
    icon: "/assets/logos/dev-to-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <head>
        {/* Flux Motion External Stylesheet (if present or added later in assets) */}
        <link
          href="/assets/flux-motion.aura.build/assets/css2_19fd9cc6b396.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} text-neutral-300 min-h-screen flex flex-col overflow-x-hidden selection:bg-orange-brand/30 selection:text-white antialiased`}
      >
        <LanguageProvider>
          {/* Background Grid Pattern Overlay */}
          <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
          {children}
        </LanguageProvider>

        {/* Iconify CDN (requested by user to be kept) */}
        <Script
          src="https://code.iconify.design/3/3.1.0/iconify.min.js"
          strategy="afterInteractive"
          integrity="sha384-GYcZF/Xz4/6ZHVch5eVcYcyWmSCvO3+ffsxF+B9hfRyc3XCkSws7SO5ZSGqHlUNH"
          crossOrigin="anonymous"
        />

        {/* Flux Motion script (requested by user to be kept) */}
        <Script
          src="/assets/flux-motion.aura.build/assets/resource_3fa48481346f.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
