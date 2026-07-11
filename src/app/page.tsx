"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AISection from "@/components/AISection";
import VideoSection from "@/components/VideoSection";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import TrialModal from "@/components/TrialModal";

export default function Home() {
  const [trialOpen, setTrialOpen] = useState(false);
  const openTrial = () => setTrialOpen(true);

  return (
    <>
      <Navbar onOpenTrial={openTrial} />
      <main>
        <Hero onOpenTrial={openTrial} />
        <Features />
        <AISection />
        <VideoSection />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer onOpenTrial={openTrial} />
      <TrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />
    </>
  );
}
