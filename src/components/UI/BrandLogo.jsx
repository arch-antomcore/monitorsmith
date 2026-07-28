import React from 'react';

/**
 * BrandLogo — O Ícone Oficial do Projeto MonitorSmith.
 * Extraído para ser reutilizado na navbar, footer e modais da aplicação.
 */
export default function BrandLogo({ size = 30, className = '', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
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
      <rect x="8.5" y="8.5" width="47" height="47" rx="10" stroke="#F59E0B" strokeOpacity=".35" strokeWidth="1.5" />
      <path d="M17 44V21l15 15 15-15v23" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 48h30" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="#F59E0B" />
      <circle cx="52" cy="12" r="1.5" fill="#F59E0B" />
    </svg>
  );
}
