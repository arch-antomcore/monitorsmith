import { useEffect } from 'react';

export default function AdSenseUnit({
  slot = "0000000000",
  client = "ca-pub-5926952327268950",
  format = "auto",
  responsive = true,
  className = "",
  style = {},
}) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Ignore Google AdSense push error if blocked by AdBlocker
    }
  }, []);

  return (
    <div
      className={`ms-ad-container ${className}`}
      style={{
        margin: '24px auto',
        padding: '12px 16px 16px',
        maxWidth: '920px',
        width: '100%',
        borderRadius: '16px',
        background: 'rgba(13, 16, 23, 0.55)',
        border: '1px dashed rgba(52, 211, 153, 0.3)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
        <span
          className="ms-ad-label"
          style={{
            fontSize: '0.64rem',
            color: 'rgba(52, 211, 153, 0.85)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}
        >
          📢 Espaço de Anúncio AdSense • Publicidade Patrocinada
        </span>
      </div>
      <div style={{ position: 'relative', minHeight: '90px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', background: 'rgba(0,0,0,0.2)' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px', borderRadius: '10px', overflow: 'hidden' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
