"use client";

import * as React from "react";
import { Send, Sun, Moon } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Input, Switch, Label, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./primitives";
import PrivacyModal from "./PrivacyModal";
import AboutModal from "./AboutModal";
import TermsModal from "./TermsModal";

export function FooterSection() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark", "ms-studio-dark");
        document.documentElement.classList.remove("ms-studio-light");
      } else {
        document.documentElement.classList.remove("dark", "ms-studio-dark");
        document.documentElement.classList.add("ms-studio-light");
      }
    }
  }, [isDarkMode]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4500);
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050506] text-white/80 transition-colors duration-300 overflow-hidden font-sans">
      <div className="container mx-auto px-4 py-16 md:px-8 lg:px-12 max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Newsletter / Stay Connected */}
          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white font-mono">Fique por Dentro</h2>
            <p className="mb-6 text-sm text-white/65 leading-relaxed">
              Receba atualizações do MonitorSmith, novas ferramentas de teste e dicas profissionais de calibração.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-in fade-in-0">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Inscrição confirmada! Você está no nosso radar.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="pr-12 text-sm backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  aria-label="Inscrever no newsletter"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-transform hover:scale-105 active:scale-95 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)] cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span className="sr-only">Inscrever</span>
                </button>
              </form>
            )}
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase font-mono">Ferramentas Rápidas</h3>
            <nav className="space-y-2.5 text-sm text-white/70">
              <a href="#monitor-tools-home" className="block transition-colors hover:text-amber-400">
                Todas as Ferramentas
              </a>
              <a href="#dead-pixel" className="block transition-colors hover:text-amber-400">
                Teste de Dead Pixels
              </a>
              <a href="#black" className="block transition-colors hover:text-amber-400">
                Tela Preta OLED & Burn-in
              </a>
              <a href="#cleaner" className="block transition-colors hover:text-amber-400">
                Inspeção para Limpeza
              </a>
              <a href="#white" className="block transition-colors hover:text-amber-400">
                Luz para Videochamadas
              </a>
              <a href="#clock" className="block transition-colors hover:text-amber-400">
                Relógio em Tela Cheia
              </a>
            </nav>
          </div>

          {/* Column 3: Contact Us / Studio Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase font-mono">EXVORN.TECH</h3>
            <address className="space-y-2.5 text-sm text-white/70 not-italic leading-relaxed">
              <p className="font-medium text-white/90">MonitorSmith — Hardware Studio</p>
              <p>Suíte web 100% gratuita para teste, calibração e inspeção de displays.</p>
              <p>Funciona nativamente offline em Windows, iOS, Android, macOS e Linux (PWA).</p>
              <p className="pt-2">
                <a href="mailto:contato@exvorn.tech" className="font-mono text-xs text-amber-400 hover:underline">
                  contato@exvorn.tech
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Follow Us & Mode Toggle */}
          <div className="relative">
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase font-mono">Conecte-se</h3>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.linkedin.com/in/matheus-peres-da-silva/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn de Matheus Peres da Silva"
                      className="flex items-center gap-2 rounded-full border border-blue-500/35 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/60 px-3.5 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] group"
                    >
                      <IconBrandLinkedin className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Matheus Peres da Silva</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Conecte-se com o criador no LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://github.com/arch-antomcore/monitorsmith"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.1] hover:border-white/30 text-white/80 hover:text-white transition-all w-8 h-8 flex items-center justify-center shadow-sm"
                    >
                      <IconBrandGithub className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Explore o repositório no GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-3 pt-1">
              <Sun className="h-4 w-4 text-amber-400 shrink-0" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4 text-white/80 shrink-0" />
              <Label htmlFor="dark-mode" className="cursor-pointer text-xs font-medium text-white/70 select-none">
                Modo Studio Escuro
              </Label>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-center md:flex-row">
          <p className="text-xs text-white/60 font-mono">
            © 2026 EXVORN.TECH — MonitorSmith. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <AboutModal label="Sobre (About)" className="transition-colors hover:text-amber-400 cursor-pointer text-left bg-transparent border-none p-0 font-sans text-xs text-white/70 hover:underline" />
            <PrivacyModal label="Política de Privacidade" className="transition-colors hover:text-amber-400 cursor-pointer text-left bg-transparent border-none p-0 font-sans text-xs text-white/70 hover:underline" />
            <TermsModal label="Termos de Serviço" className="transition-colors hover:text-amber-400 cursor-pointer text-left bg-transparent border-none p-0 font-sans text-xs text-white/70 hover:underline" />
            <a href="#monitor-tools-home" className="transition-colors hover:text-amber-400 hover:underline">
              Configurações PWA
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default FooterSection;
