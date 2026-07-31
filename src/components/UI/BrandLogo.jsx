/**
 * Marca compacta do MonitorSmith, compartilhada pela navegação e pelos diálogos.
 */
export default function BrandLogo({ size = 30, className = '', style = {} }) {
  return (
    <img
      src="/logo-transparent.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        flexShrink: 0,
        borderRadius: `${Math.round(size * 0.22)}px`,
        boxShadow: '0 0 14px rgba(245, 158, 11, 0.25)',
        ...style,
      }}
    />
  );
}
