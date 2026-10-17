"use client";

import React from "react";
import { LandingHero } from "@/components/landing/hero";
import { FeatureWalkthrough } from "@/components/landing/feature-walkthrough";
import { EffortlessPlanning } from "@/components/landing/effortless-planning";
import { BentoFeatures } from "@/components/landing/bento-features";
import { SmartExecution } from "@/components/landing/smart-execution";
import { LandingPricing } from "@/components/landing/pricing";
import { DarkCtaBanner } from "@/components/landing/dark-cta-banner";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-sky-100 selection:text-sky-900 flex flex-col">
      <main className="flex-1">
        <LandingHero />
        <FeatureWalkthrough />
        <EffortlessPlanning />
        <BentoFeatures />
        <SmartExecution />
        <LandingPricing />
        <DarkCtaBanner />
      </main>
      <LandingFooter />
    </div>
  );
}
