import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchedulingDemoScreen from "@/components/demo/SchedulingDemoScreen";

// Server-rendered, so it ships in DEFAULT_LANGUAGE and agrees with the
// <html lang> the same render emits. SchedulingDemoScreen swaps both when the
// visitor has chosen Portuguese.
export const metadata: Metadata = {
  title: "Scheduling Agent — Demo | Lucas Abreu",
  description:
    "A live scheduling agent: it looks up open slots, books, reschedules and cancels through the Cal.com API.",
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
