import React from 'react';

/**
 * Reusable BrandLogo Component for Royal Wheels Delhi
 * Supports 'light' (white/emerald for dark surfaces) and 'dark' (slate/emerald for light surfaces)
 */
export default function BrandLogo({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = ''
}) {
  const isLight = variant === 'light';

  // Size dimensions
  const dimensions = {
    sm: { icon: 32, titleSize: 15, subSize: 8, gap: 8 },
    md: { icon: 42, titleSize: 19, subSize: 9.5, gap: 10 },
    lg: { icon: 54, titleSize: 24, subSize: 11, gap: 14 }
  }[size] || { icon: 42, titleSize: 19, subSize: 9.5, gap: 10 };

  const textColor = isLight ? '#f8fafc' : '#0f172a';
  const accentColor = '#059669'; // Royal Emerald
  const goldColor = '#f59e0b'; // Royal Gold Accent
  const subTextColor = isLight ? '#94a3b8' : '#64748b';

  return (
    <div
      className={`brand-logo-component ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${dimensions.gap}px`,
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      {/* Luxury Royal Wheel & Crown Emblem */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(5, 150, 105, 0.25))' }}
      >
        {/* Outer Circular Ring with subtle gradient */}
        <defs>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Outer Shield / Circle */}
        <circle cx="32" cy="32" r="30" stroke="url(#emeraldGrad)" strokeWidth="2.5" fill={isLight ? '#090d16' : '#ffffff'} />
        <circle cx="32" cy="32" r="26" stroke={isLight ? '#1e293b' : '#e2e8f0'} strokeWidth="1" strokeDasharray="2 3" />

        {/* Royal Crown on Top */}
        <path
          d="M23 20L20 28H44L41 20L32 25L23 20Z"
          fill="url(#goldGrad)"
          stroke="#b45309"
          strokeWidth="0.5"
        />
        <circle cx="23" cy="19" r="1.5" fill="#fef08a" />
        <circle cx="32" cy="24" r="1.5" fill="#fef08a" />
        <circle cx="41" cy="19" r="1.5" fill="#fef08a" />

        {/* Central Luxury Wheel Hub */}
        <circle cx="32" cy="37" r="13" stroke="url(#emeraldGrad)" strokeWidth="2" fill="none" />
        <circle cx="32" cy="37" r="4.5" fill="url(#goldGrad)" />
        <circle cx="32" cy="37" r="2" fill="#ffffff" />

        {/* Wheel Spokes */}
        <line x1="32" y1="24" x2="32" y2="32.5" stroke="url(#emeraldGrad)" strokeWidth="1.75" strokeLinecap="round" />
        <line x1="32" y1="41.5" x2="32" y2="50" stroke="url(#emeraldGrad)" strokeWidth="1.75" strokeLinecap="round" />
        <line x1="19" y1="37" x2="27.5" y2="37" stroke="url(#emeraldGrad)" strokeWidth="1.75" strokeLinecap="round" />
        <line x1="36.5" y1="37" x2="45" y2="37" stroke="url(#emeraldGrad)" strokeWidth="1.75" strokeLinecap="round" />
        
        {/* Diagonal Spokes */}
        <line x1="23" y1="28" x2="29" y2="34" stroke="url(#emeraldGrad)" strokeWidth="1.25" strokeLinecap="round" opacity="0.8" />
        <line x1="41" y1="46" x2="35" y2="40" stroke="url(#emeraldGrad)" strokeWidth="1.25" strokeLinecap="round" opacity="0.8" />
        <line x1="41" y1="28" x2="35" y2="34" stroke="url(#emeraldGrad)" strokeWidth="1.25" strokeLinecap="round" opacity="0.8" />
        <line x1="23" y1="46" x2="29" y2="40" stroke="url(#emeraldGrad)" strokeWidth="1.25" strokeLinecap="round" opacity="0.8" />
      </svg>

      {/* Brand Name Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span
            style={{
              fontSize: `${dimensions.titleSize}px`,
              fontWeight: 800,
              color: textColor,
              letterSpacing: '0.04em',
              fontFamily: 'inherit',
              textTransform: 'uppercase'
            }}
          >
            ROYAL WHEELS
          </span>
          <span
            style={{
              fontSize: `${dimensions.titleSize * 0.72}px`,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            DELHI
          </span>
        </div>

        {showTagline && (
          <span
            style={{
              fontSize: `${dimensions.subSize}px`,
              fontWeight: 600,
              color: subTextColor,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: '2px'
            }}
          >
            ✦ Luxury Fleet & Chauffeur Rentals ✦
          </span>
        )}
      </div>
    </div>
  );
}
