/**
 * Marca compacta do MonitorSmith, compartilhada pela navegação e pelos diálogos.
 */
export default function BrandLogo({ size = 30, className = '', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        display: 'inline-block',
        flexShrink: 0,
        borderRadius: `${Math.round(size * 0.22)}px`,
        boxShadow: '0 0 14px rgba(245, 158, 11, 0.25)',
        ...style,
      }}
    >
      <rect width="64" height="64" rx="14" fill="#050506" />
      <path fill="#F59E0B" d="M14 47V17h8l10 14 10-14h8v30h-8V29L35 39h-6l-7-10v18H14Z" />
    </svg>
  );
}
