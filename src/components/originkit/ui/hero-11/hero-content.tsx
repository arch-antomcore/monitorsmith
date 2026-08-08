// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

// Delivered by Originkit · stack: nextjs
"use client";

"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/originkit/ui/hero-11/button";
import { gsap, SplitText } from "@/lib/gsapHelper";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

type HeroContentProps = {
  onGetStarted: () => void;
};

export const HeroContent = ({ onGetStarted }: HeroContentProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current || typeof window === "undefined") return;
    let splitInstance: any = null;
    const ctx = gsap.context(() => {
      splitInstance = new SplitText(titleRef.current, { type: "words,chars" });
      gsap.fromTo(
        splitInstance.chars,
        { opacity: 0, y: 24, rotateX: -45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.025,
          ease: "power4.out",
          delay: 0.15,
        }
      );
    });
    return () => {
      ctx.revert();
      splitInstance?.revert();
    };
  }, []);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      type: "tween" as const,
      duration: 0.45,
      ease: EASE_OUT,
      delay,
    },
  });

  return (
    <div className="relative z-20 flex w-full max-w-[560px] desktop-sm:max-w-[620px] flex-col items-center gap-6 text-center desktop-sm:items-start desktop-sm:gap-8 desktop-sm:text-left">
      <div className="flex w-full flex-col items-center gap-4 text-white desktop-sm:items-start desktop-sm:gap-5">
        {/* Status Badge Chip */}
        <motion.div
          {...reveal(0.08)}
          className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3.5 py-1 text-[12px] font-mono tracking-widest text-[#F59E0B] backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)] uppercase"
        >
          <span className="size-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] animate-pulse" aria-hidden="true" />
          SUÍTE MONITORSMITH v2.0
        </motion.div>

        <div className="flex w-full flex-col items-center gap-3 desktop-sm:items-start desktop-sm:gap-5">
          <h1
            ref={titleRef}
            className="w-full max-w-[540px] ipad:max-w-[600px] font-sans font-extrabold text-[40px] sm:text-[48px] ipad:text-[56px] leading-[1.08] tracking-[-0.035em] text-pretty text-white desktop-sm:max-w-none desktop-sm:text-[58px] desktop-sm:leading-[1.04] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            Ferramentas visuais para seus monitores.
          </h1>

          <motion.p
            {...reveal(0.24)}
            className="max-w-[460px] ipad:max-w-[500px] font-sans text-[15px] ipad:text-[17px] font-normal leading-[1.55] tracking-[-0.01em] text-white/80 desktop-sm:max-w-[540px] desktop-sm:text-[16.5px]"
          >
            Diagnóstico de pixels, teste de vazamento de luz, iluminação de apoio, chroma key e utilitários focados em desempenho e qualidade de imagem.
          </motion.p>
        </div>
      </div>

      <motion.div {...reveal(0.32)} className="pointer-events-auto">
        <Button aria-label="Explorar Ferramentas" onClick={onGetStarted}>
          Explorar Ferramentas
        </Button>
      </motion.div>
    </div>
  );
};
