/**
 * Marca compacta do MonitorSmith, compartilhada pela navegação e pelos diálogos.
 */
export default function BrandLogo({ size = 30, className = '', style = {} }) {
  return (
    <img
      src="/logo-transparent.png"
      alt=""
      height={size}
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        flexShrink: 0,
        width: 'auto',
        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))',
        ...style,
      }}
    />
  );
}
