import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileFocusTrigger from "@/components/MobileFocusTrigger";

export default function Home() {
  return (
    <>
      <MobileFocusTrigger />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <LiveDemoSection />
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
