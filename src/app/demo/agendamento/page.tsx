import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchedulingDemoScreen from "@/components/demo/SchedulingDemoScreen";

export const metadata: Metadata = {
  title: "Agente de Agendamento — Demo | Lucas Abreu",
  description:
    "Demonstração ao vivo de um agente de agendamento: consulta horários, cria, remarca e cancela reservas pela API do Cal.com.",
};

export default function SchedulingDemoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* The grid overlay comes from the root layout, which wraps every
            route. Repeating it here stacked a second 0.03 layer and made this
            page's lines twice as bright as the rest of the site. */}
        <div className="relative z-10">
          <SchedulingDemoScreen />
        </div>
      </main>
      <Footer />
    </>
  );
}
