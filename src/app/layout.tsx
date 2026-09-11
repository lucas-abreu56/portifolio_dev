import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LenisProvider from "@/components/LenisProvider";
import Script from "next/script";
import { socials } from "@/data/socials";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const SITE_URL = "https://www.lucasschwingel.com";
const TITLE = "Lucas Abreu - Automation & AI";
const DESCRIPTION =
  "Lucas Abreu's Portfolio - Developer of Automations & AI Agents";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/logos/dev-to-logo.svg",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/images/og-image.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Abreu",
  url: SITE_URL,
  jobTitle: "Developer of Automations & AI Agents",
  sameAs: socials
    .filter((s) => s.label !== "E-mail")
    .map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} text-neutral-300 min-h-screen flex flex-col overflow-x-hidden selection:bg-orange-brand/30 selection:text-white antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          <LenisProvider>
            {/* Background Grid Pattern Overlay */}
            <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
            {children}
          </LenisProvider>
        </LanguageProvider>

        {/* Iconify CDN (requested by user to be kept) */}
        <Script
          src="https://code.iconify.design/3/3.1.0/iconify.min.js"
          strategy="afterInteractive"
          integrity="sha384-GYcZF/Xz4/6ZHVch5eVcYcyWmSCvO3+ffsxF+B9hfRyc3XCkSws7SO5ZSGqHlUNH"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
