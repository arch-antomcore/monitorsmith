import React from "react";
import { 
  Sparkle, 
  TerminalWindow, 
  Sun, 
  Moon, 
  Cpu, 
  GithubLogo,
  LinkedinLogo
} from "@phosphor-icons/react";
import AboutModal from "./AboutModal";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";
import PwaModal from "./PwaModal";

export function FooterSection({ onLaunch }) {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ms_studio_theme");
      if (saved) return saved === "dark";
    }
    return true; // "á princípio deve iniciar já em modo escuro"
  });

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add("dark", "ms-studio-dark");
        root.classList.remove("ms-studio-light", "light-mode");
        localStorage.setItem("ms_studio_theme", "dark");
      } else {
        root.classList.remove("dark", "ms-studio-dark");
        root.classList.add("ms-studio-light", "light-mode");
        localStorage.setItem("ms_studio_theme", "light");
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
        onLaunch(modeId);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Coluna 1: Marca & Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-black font-bold">
                <Cpu size={20} weight="bold" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white font-mono">
                MONITOR<span className="text-amber-400">SMITH</span>
              </span>
            </div>
            
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Suíte profissional de calibração, diagnóstico e inspeção de telas. 
              Engenharia visual client-side com processamento zero-latency em GPU.
            </p>
          </div>

          {/* Coluna 2: Ferramentas Rápidas */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-white uppercase font-mono flex items-center gap-2">
              <TerminalWindow size={16} className="text-amber-400" />
              <span>Ferramentas Rápidas</span>
            </h3>
            <nav className="space-y-2.5 text-sm text-white/70">
              <a 
                href="#monitor-tools-home" 
                onClick={(e) => handleToolClick(e, 'home', '#monitor-tools-home')} 
                className="block transition-colors hover:text-amber-400"
              >
                Todas as Ferramentas
              </a>
              <a 
                href="/teste-de-dead-pixel/" 
                onClick={(e) => handleToolClick(e, 'dead-pixel', '/teste-de-dead-pixel/')} 
                className="block transition-colors hover:text-amber-400"
              >
                Teste de Dead Pixels
              </a>
              <a 
                href="/tela-preta-oled/" 
                onClick={(e) => handleToolClick(e, 'black', '/tela-preta-oled/')} 
                className="block transition-colors hover:text-amber-400"
              >
                Tela Preta OLED & Burn-In
              </a>
              <a 
                href="/limpeza-de-monitor/" 
                onClick={(e) => handleToolClick(e, 'cleaner', '/limpeza-de-monitor/')} 
                className="block transition-colors hover:text-amber-400"
              >
                Inspeção para Limpeza
              </a>
              <a 
                href="/luz-para-videochamada/" 
                onClick={(e) => handleToolClick(e, 'white', '/luz-para-videochamada/')} 
                className="block transition-colors hover:text-amber-400"
              >
                Luz para Videochamadas
              </a>
              <a 
                href="/relogio-em-tela-cheia/" 
                onClick={(e) => handleToolClick(e, 'clock', '/relogio-em-tela-cheia/')} 
                className="block transition-colors hover:text-amber-400"
              >
                Relógio em Tela Cheia
              </a>
            </nav>
          </div>

          {/* Coluna 3: EXVORN.TECH */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-white uppercase font-mono flex items-center gap-2">
              <Sparkle size={16} className="text-amber-400" />
              <span>EXVORN.TECH</span>
            </h3>
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

          {/* Coluna 4: Conecte-se & Tema */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase font-mono">Conecte-se</h3>
            
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/matheus-peres-da-silva/"
                target="_blank"
                rel="noopener noreferrer"
                title="Perfil do LinkedIn EXVORN.TECH"
                className="flex items-center gap-2 rounded-full border border-blue-500/35 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/60 px-3.5 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] group"
              >
                <LinkedinLogo size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span>EXVORN.TECH</span>
              </a>

              <a
                href="https://github.com/arch-antomcore/monitorsmith"
                target="_blank"
                rel="noopener noreferrer"
                title="Repositório no GitHub"
                className="rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.1] hover:border-white/30 text-white/80 hover:text-white transition-all w-8 h-8 flex items-center justify-center shadow-sm"
              >
                <GithubLogo size={16} />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-white/80 hover:text-white transition-all shadow-sm group cursor-pointer"
              >
                {isDarkMode ? (
                  <>
                    <Sun size={16} className="text-amber-400 group-hover:rotate-45 transition-transform" />
                    <span>Mudar para Modo Studio Claro</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} className="text-amber-500 group-hover:-rotate-12 transition-transform" />
                    <span>Mudar para Modo Studio Escuro</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Linha Inferior (Bottom Bar Original Limpa) */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-center md:flex-row">
          <p className="text-xs text-white/60 font-mono">
            © {new Date().getFullYear()} EXVORN.TECH — MonitorSmith. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <AboutModal label="Sobre (About)" className="transition-colors hover:text-amber-400 cursor-pointer bg-transparent border-none p-0 font-sans text-xs text-white/70 hover:underline" />
            <PrivacyModal label="Política de Privacidade" className="transition-colors hover:text-amber-400 cursor-pointer bg-transparent border-none p-0 font-sans text-xs text-white/70 hover:underline" />
            <TermsModal label="Termos de Serviço" className="transition-colors hover:text-amber-400 cursor-pointer bg-transparent border-none p-0 font-sans text-xs text-white/70 hover:underline" />
            <PwaModal label="Instalar App & Offline" className="transition-colors hover:text-amber-400 cursor-pointer bg-transparent border-none p-0 font-sans text-xs text-white/70 hover:underline" />
          </div>
        </div>

      </div>
    </footer>
  );
}

export default FooterSection;
