'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

// Client-only: the effect relies on SVG displacement filters + mouse tracking.
const LiquidGlass = dynamic(() => import('liquid-glass-react'), { ssr: false });

type GlassButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Set when the button sits on a light background */
  overLight?: boolean;
  ariaLabel?: string;
};

export function GlassButton({
  children,
  href,
  onClick,
  overLight = false,
  ariaLabel,
}: GlassButtonProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const label = (
    <span
      style={{
        display: 'inline-block',
        fontWeight: 600,
        fontSize: '0.9375rem',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        color: overLight ? '#0c2c1d' : '#fff',
      }}
    >
      {children}
    </span>
  );

  const content = mounted ? (
    <LiquidGlass
      displacementScale={64}
      blurAmount={0.06}
      saturation={130}
      aberrationIntensity={2}
      elasticity={0.28}
      cornerRadius={999}
      padding="13px 28px"
      overLight={overLight}
      onClick={onClick}
    >
      {label}
    </LiquidGlass>
  ) : (
    <span className="liquid-btn" data-over-light={overLight}>
      {label}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        style={{ display: 'inline-flex', textDecoration: 'none' }}
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{ display: 'inline-flex', cursor: 'pointer' }}
    >
      {content}
    </span>
  );
}
