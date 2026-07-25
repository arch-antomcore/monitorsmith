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
        margin: '28px auto',
        padding: '16px 12px 12px',
        maxWidth: '920px',
        width: '100%',
        borderRadius: '16px',
        background: 'rgba(13, 16, 23, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        ...style,
      }}
    >
      <span
        className="ms-ad-label"
        style={{
          display: 'inline-block',
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '8px',
          fontFamily: 'monospace',
        }}
      >
        Publicidade • Anúncio Patrocinado
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px', borderRadius: '12px', overflow: 'hidden' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
