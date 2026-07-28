import React from "react";
import { 
  Sparkle, 
  TerminalWindow, 
  Sun, 
  Moon, 
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo
} from "@phosphor-icons/react";
import BrandLogo from "./BrandLogo";
import AboutModal from "./AboutModal";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";
import PwaModal from "./PwaModal";
import { resolveToolLaunch } from "../../constants/tools";

export function FooterSection({ onLaunch }) {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ms_studio_theme");
        if (saved) return saved === "dark";
      } catch {
        return true;
      }
    }
    return true;
  });

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add("dark", "ms-studio-dark");
        root.classList.remove("ms-studio-light", "light-mode");
        try { localStorage.setItem("ms_studio_theme", "dark"); } catch { /* Preferência não persistida. */ }
      } else {
        root.classList.remove("dark", "ms-studio-dark");
        root.classList.add("ms-studio-light", "light-mode");
        try { localStorage.setItem("ms_studio_theme", "light"); } catch { /* Preferência não persistida. */ }
      }
    }
  }, [isDarkMode]);

  const handleToolClick = (e, modeId, fallbackUrl) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return; // Permite abrir em nova aba nativamente
    }
    if (onLaunch) {
      e.preventDefault();
      if (modeId === 'home') {
        onLaunch('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const resolvedTool = resolveToolLaunch(modeId);
        onLaunch(resolvedTool ? {
          id: resolvedTool.toolId,
          launchMode: resolvedTool.mode,
          color: resolvedTool.preset.customColor,
          brightness: resolvedTool.preset.ambientBrightness,
        } : modeId);
      }
    } else if (fallbackUrl) {
      e.preventDefault();
      window.location.href = fallbackUrl;
    }
  };

  return (
    <footer className="FooterSection relative border-t border-white/[0.08] bg-[#050506] text-white/80 transition-colors duration-300 overflow-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-amber-500/[0.03] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          
          {/* Coluna 1: Marca & Missão */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <BrandLogo size={34} />
              <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                MONITOR<span className="text-amber-400">SMITH</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.08] text-white/70 font-mono border border-white/[0.05]">
                WEB SUITE
              </span>
            </div>
            
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Suíte de padrões para inspeção visual e utilitários de tela.
              Processamento local no navegador com APIs nativas da Web.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com/arch-antomcore/monitorsmith"
                target="_blank" 
                rel="noreferrer"
                aria-label="Repositório do MonitorSmith no GitHub"
                className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
              >
                <GithubLogo size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/matheus-peres-da-silva/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn EXVORN.TECH"
                className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
              >
                <LinkedinLogo size={18} />
              </a>
              <div className="h-4 w-[1px] bg-white/[0.1] mx-1" />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-white/80 hover:text-white transition-all"
                aria-label="Alternar tema claro e escuro"
              >
                {isDarkMode ? (
                  <>
                    <Moon size={15} className="text-amber-400" />
                    <span>Modo Escuro</span>
                  </>
                ) : (
                  <>
                    <Sun size={15} className="text-amber-500" />
                    <span>Modo Claro</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Coluna 2: Ferramentas Rápidas */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <TerminalWindow size={16} className="text-amber-400" />
              <span>Ferramentas Rápidas</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a 
                  href="#monitor-tools-home" 
                  onClick={(e) => handleToolClick(e, 'home', '#monitor-tools-home')} 
                  className="block transition-colors hover:text-amber-400"
                >
                  Todas as Ferramentas
                </a>
              </li>
              <li>
                <a 
                  href="/loop-de-marcas/" 
                  onClick={(e) => handleToolClick(e, 'sponsor-loop', '/loop-de-marcas/')} 
                  className="block transition-colors hover:text-amber-400 flex items-center gap-1.5"
                >
                  <span>Loop de Marcas</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-mono">Novo</span>
                </a>
              </li>
              <li>
                <a 
                  href="/teste-de-dead-pixel/" 
                  onClick={(e) => handleToolClick(e, 'dead-pixel', '/teste-de-dead-pixel/')} 
                  className="block transition-colors hover:text-amber-400"
                >
                  Teste de Dead Pixels
                </a>
              </li>
              <li>
                <a 
                  href="/tela-preta-oled/" 
                  onClick={(e) => handleToolClick(e, 'black', '/tela-preta-oled/')} 
                  className="block transition-colors hover:text-amber-400"
                >
                  Tela Preta e Inspeção OLED
                </a>
              </li>
              <li>
                <a 
                  href="/limpeza-de-monitor/" 
                  onClick={(e) => handleToolClick(e, 'cleaner', '/limpeza-de-monitor/')} 
                  className="block transition-colors hover:text-amber-400"
                >
                  Inspeção para Limpeza
                </a>
              </li>
              <li>
                <a 
                  href="/luz-para-videochamada/" 
                  onClick={(e) => handleToolClick(e, 'white', '/luz-para-videochamada/')} 
                  className="block transition-colors hover:text-amber-400"
                >
                  Luz para Videochamadas
                </a>
              </li>
              <li>
                <a 
                  href="/relogio-em-tela-cheia/" 
                  onClick={(e) => handleToolClick(e, 'clock', '/relogio-em-tela-cheia/')} 
                  className="block transition-colors hover:text-amber-400"
                >
                  Relógio em Tela Cheia
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Estúdio e display */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <Sparkle size={16} className="text-amber-400" />
              <span>Estúdio & Display</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href="/teste-de-monitor/" onClick={(e) => handleToolClick(e, 'calibration', '/teste-de-monitor/')} className="block transition-colors hover:text-amber-400">
                  Verificação Visual de Display
                </a>
              </li>
              <li>
                <a href="/tela-verde-chroma/" onClick={(e) => handleToolClick(e, 'green-screen', '/tela-verde-chroma/')} className="block transition-colors hover:text-amber-400">
                  Tela Verde para Chroma Key
                </a>
              </li>
              <li>
                <a href="/timer-de-foco/" onClick={(e) => handleToolClick(e, 'focus-timer', '/timer-de-foco/')} className="block transition-colors hover:text-amber-400">
                  Timer de Foco
                </a>
              </li>
              <li>
                <a href="/teleprompter-online/" onClick={(e) => handleToolClick(e, 'message', '/teleprompter-online/')} className="block transition-colors hover:text-amber-400">
                  Teleprompter & Mensagens
                </a>
              </li>
              <li className="pt-1">
                <span className="text-xs font-mono text-amber-400/80 uppercase tracking-wider block mb-1">Tecnologia</span>
                <span className="text-xs text-white/50 block">React • CSS • APIs Web nativas</span>
                <span className="text-xs text-white/50 block">Ferramentas executadas localmente</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter & Atualizações */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <EnvelopeSimple size={16} className="text-amber-400" />
              <span>Notas de Lançamento</span>
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Acompanhe versões, correções e novas ferramentas diretamente no repositório oficial do MonitorSmith.
            </p>
            <a
              href="https://github.com/arch-antomcore/monitorsmith"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-lg bg-white/[0.08] hover:bg-amber-500 hover:text-black border border-white/[0.08] hover:border-transparent text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <GithubLogo size={16} aria-hidden="true" />
              Acompanhar no GitHub
            </a>
            <span className="text-[10px] text-white/60 block">
              Newsletter por e-mail em preparação; nenhuma inscrição é coletada aqui.
            </span>
          </div>

        </div>

        {/* Linha Divisória Inferior */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 font-mono">
          <div className="flex items-center gap-1.5">
            <span>Desenvolvido com precisão pela</span>
            <a 
              href="https://exvorn.tech/"
              target="_blank" 
              rel="noreferrer"
              title="Site institucional da EXVORN.TECH"
              className="text-white hover:text-amber-400 transition-colors font-semibold underline underline-offset-4 decoration-amber-500/40"
            >
              EXVORN.TECH
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            <AboutModal label="Sobre (About)" className="hover:text-amber-400 transition-colors cursor-pointer text-white/70 underline underline-offset-4 decoration-white/20" />
            <PrivacyModal label="Política de Privacidade" className="hover:text-amber-400 transition-colors cursor-pointer text-white/70 underline underline-offset-4 decoration-white/20" />
            <TermsModal label="Termos de Serviço" className="hover:text-amber-400 transition-colors cursor-pointer text-white/70 underline underline-offset-4 decoration-white/20" />
            <PwaModal label="Instalar App & Offline" className="hover:text-amber-400 transition-colors cursor-pointer text-white/70 underline underline-offset-4 decoration-white/20" />
          </div>

          <div className="text-white/50">
            © {new Date().getFullYear()} MonitorSmith. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
