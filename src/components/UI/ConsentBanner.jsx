import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof navigator !== 'undefined' && navigator.webdriver) {
        return; // Pula a exibição em testes E2E para não bloquear cliques
      }
      const consent = localStorage.getItem('ms_ad_consent');
      if (!consent) {
        // Delay showing the banner slightly so it doesn't block the initial fluid animations
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('ms_ad_consent', 'granted');
      window.dispatchEvent(new Event('ms_consent_update'));
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem('ms_ad_consent', 'rejected');
      window.dispatchEvent(new Event('ms_consent_update'));
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999999,
            padding: '1.5rem',
            background: 'rgba(10, 11, 15, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
            color: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ maxWidth: '840px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px', fontSize: '0.9rem', lineHeight: 1.6, color: '#b9bbc4' }}>
              <strong style={{ color: '#fff', fontSize: '1rem', display: 'block', marginBottom: '0.25rem' }}>Valorizamos sua privacidade</strong>
              Nós e nossos parceiros (como o Google AdSense) usamos cookies e tecnologias semelhantes para melhorar sua experiência, personalizar conteúdo e anúncios, e analisar nosso tráfego. Você pode escolher aceitar todos os cookies ou continuar apenas com os estritamente necessários. Leia nossa <a href="/privacidade/" style={{ color: '#fbbf24', textDecoration: 'underline' }}>Política de Privacidade</a> para mais detalhes.
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleReject}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                Apenas Essenciais
              </button>
              <button
                onClick={handleAccept}
                style={{
                  background: '#fbbf24',
                  border: '1px solid #fbbf24',
                  color: '#171006',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
