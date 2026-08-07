// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

// Delivered by Originkit · stack: nextjs
"use client";

"use client";

import type { KeyboardEvent } from "react";
import { Button } from "@/components/originkit/ui/hero-11/button";
import { gsap } from "@/lib/gsapHelper";

/** Asset root — flat files in package assets/. */
const A = "/originkit/hero-11";

const NAV_LINKS = [
  { label: "// Ferramentas", href: "#monitor-tools", aria: "Ferramentas" },
  { label: "// Guias", href: "#monitor-tools", aria: "Guias" },
  { label: "// Teclas", href: "#keyboard-shortcuts", aria: "Teclas de atalho" },
  { label: "// EXVORN", href: "https://exvorn.tech", aria: "EXVORN.TECH" },
] as const;

type NavbarProps = {
  onBookNow: () => void;
};

const Logo = () => (
  <a
    href="#monitor-tools-home"
    aria-label="MonitorSmith Início"
    className="inline-flex min-h-11 items-center gap-2.5 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
  >
    <img
      src={`${A}/nav-logo.svg`}
      alt=""
      width={22}
      height={22}
      className="size-[22px] shrink-0"
      aria-hidden="true"
    />
    <span className="font-sans text-[20px] font-bold leading-[25.5px] tracking-[-0.4px] text-white whitespace-nowrap">
      Monitor<span className="text-[#F59E0B]">Smith</span>
    </span>
  </a>
);

export const Navbar = ({ onBookNow }: NavbarProps) => {
  const handleNavClick = (href?: string) => {
    if (!href) return;
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    href?: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleNavClick(href);
  };

  return (
    <nav aria-label="Primary" className="relative z-30 w-full">
      {/* Mobile — Figma Nav: 402×58, p-16, logo + menu */}
      <div className="flex h-[58px] w-full items-center justify-between p-4 desktop-sm:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => handleNavClick("#monitor-tools")}
          aria-label="Abrir menu"
          className="inline-flex size-6 min-h-11 min-w-11 shrink-0 items-center justify-center touch-manipulation transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
        >
          <img
            src={`${A}/nav-menu.svg`}
            alt=""
            width={24}
            height={24}
            className="size-6"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Desktop — Figma: left 100 / top 36 / width 1231 within 1440 */}
      <div className="mx-auto hidden w-full max-w-[1440px] items-center justify-between px-[100px] pt-9 desktop-sm:flex">
        <ul className="flex items-center gap-6 font-tight text-[16px] leading-[25.5px] tracking-[-0.34px] text-white">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                tabIndex={0}
                aria-label={link.aria}
                onClick={() => handleNavClick(link.href)}
                onKeyDown={(event) => handleKeyDown(event, link.href)}
                className="inline-flex min-h-11 items-center cursor-pointer touch-manipulation whitespace-nowrap transition-colors duration-200 ease hover:text-[#F59E0B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end">
          <Button aria-label="Acessar Suíte" onClick={onBookNow}>
            Acessar Suíte
          </Button>
        </div>
      </div>
    </nav>
  );
};
