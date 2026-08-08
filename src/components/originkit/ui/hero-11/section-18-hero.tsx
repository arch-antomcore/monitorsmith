// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

// Delivered by Originkit · stack: nextjs
"use client";

"use client";

import { FeatureRail } from "@/components/originkit/ui/hero-11/feature-rail";
import {
  GlowBackground,
  GradientOverlay,
} from "@/components/originkit/ui/hero-11/glow-background";
import { HeroContent } from "@/components/originkit/ui/hero-11/hero-content";
import { Navbar } from "@/components/originkit/ui/hero-11/navbar";
import { PortraitStage } from "@/components/originkit/ui/hero-11/portrait-stage";
import FluidTrail from "@/components/originkit/ui/hero-11/fluidtrail";
import MagicCursor from "@/components/originkit/ui/spin-cursor";

type Section18HeroProps = {
  onGetStarted?: () => void;
  onBookNow?: () => void;
};

export const Section18Hero = ({ onGetStarted, onBookNow }: Section18HeroProps) => {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      document.getElementById("monitor-tools")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      document.getElementById("monitor-tools")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      aria-label="Visionary liquid distortion hero"
      className="relative isolate min-h-svh w-full overflow-hidden bg-[#040302]"
    >
      {/*
        Stack:
          base gradient  z-0
          liquid         z-5
          fluid trail    z-8
          gradient-2     z-10 (radial cutout over face)
          spin cursor    z-15
          nav / copy     z-20
      */}
      <GlowBackground />
      <PortraitStage />
      <div className="pointer-events-none absolute inset-0 z-[8] overflow-hidden mix-blend-screen opacity-90">
        <FluidTrail color="#F59E0B" mouseRadius={18} trailDuration={5.5} fade="outside" />
      </div>
      <GradientOverlay />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#F59E0B]/5 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden">
        <MagicCursor
          fillColor="#F59E0B"
          cursorSize={30}
          enableGlow={true}
          glowColor="#F59E0B"
          glowIntensity={60}
          label={false}
        />
      </div>

      <div className="relative mx-auto w-full max-w-none desktop-sm:max-w-[1440px]">
        <div className="relative mx-auto flex min-h-svh w-full max-w-[402px] flex-col ipad:max-w-none desktop-sm:max-w-none">
          <div className="pointer-events-none relative z-20 flex w-full flex-col">
            <div className="pointer-events-auto w-full">
              <Navbar onBookNow={handleBookNow} />
            </div>
          </div>

          <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center justify-end px-[18px] pb-[72px] desktop-sm:grid desktop-sm:grid-cols-[366px_1fr_129px] desktop-sm:items-end desktop-sm:justify-items-stretch desktop-sm:gap-0 desktop-sm:px-[100px] desktop-sm:pb-[114px]">
            <div className="pointer-events-auto desktop-sm:col-start-1 desktop-sm:justify-self-start">
              <HeroContent onGetStarted={handleGetStarted} />
            </div>

            <div className="pointer-events-auto hidden desktop-sm:col-start-3 desktop-sm:block desktop-sm:justify-self-end">
              <FeatureRail />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
