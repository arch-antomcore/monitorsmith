// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

// Delivered by Originkit · stack: nextjs
"use client";

"use client";

import { motion, useReducedMotion } from "motion/react";

/** Asset root — flat files in package assets/. */
const A = "/originkit/hero-11";

/** ease-out-cubic */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const FEATURES = [
  { title: "11+ Ferramentas", subtitle: "100% Gratuitas" },
  { title: "Diagnóstico 24/7", subtitle: "Execução Local" },
] as const;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matheus-peres-da-silva/",
    icon: `${A}/icons-linkedin.svg`,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: `${A}/icons-x.svg`,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: `${A}/icons-instagram.svg`,
  },
] as const;

export const FeatureRail = () => {
  return (
    <motion.aside
      aria-label="Service highlights"
      className="relative z-20 flex w-full max-w-[170px] flex-col items-start gap-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.4 }}
    >
      {FEATURES.map((feature) => (
        <div
          key={feature.title}
          className="flex w-full flex-col items-start gap-1 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-[#F59E0B]/40 hover:bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <p className="font-sans font-bold text-[17px] leading-snug tracking-tight text-white whitespace-nowrap">
            {feature.title.includes("11+") ? (
              <>
                <span className="text-[#F59E0B] font-extrabold">11+</span> Ferramentas
              </>
            ) : feature.title.includes("24/7") ? (
              <>
                Diagnóstico <span className="text-[#F59E0B] font-extrabold">24/7</span>
              </>
            ) : (
              feature.title
            )}
          </p>
          <p className="font-sans text-[12px] font-medium leading-normal tracking-wide text-white/70">
            {feature.subtitle}
          </p>
        </div>
      ))}

      <ul className="flex items-start gap-3">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              tabIndex={0}
              className="relative inline-flex size-8 items-center justify-center overflow-clip rounded-full border border-solid border-[#999] bg-white/5 p-2 shadow-[0_0_0_1.5px_rgba(0,0,0,0.25),0_6px_12px_0_rgba(0,0,0,0.2)] touch-manipulation transition-transform duration-200 ease hover:scale-110 hover:border-[#F59E0B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05))",
              }}
            >
              <img
                src={social.icon}
                alt=""
                width={14}
                height={14}
                className="size-3.5"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
};
