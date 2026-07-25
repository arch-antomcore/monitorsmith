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
    <div className={`ms-ad-container ${className}`} style={{ margin: '20px auto', textAlign: 'center', ...style }}>
      <span className="ms-ad-label" style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
        Publicidade
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
