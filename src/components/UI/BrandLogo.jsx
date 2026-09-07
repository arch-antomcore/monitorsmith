/**
 * Marca compacta do MonitorSmith, compartilhada pela navegação e pelos diálogos.
 */
export default function BrandLogo({ size = 30, className = '', style = {} }) {
  return (
    <img
      src="/logo.png"
      alt=""
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        flexShrink: 0,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '20%',
        objectFit: 'contain',
        ...style,
      }}
    />
  );
}
