'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

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
  const className = 'liquid-btn';

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={className}
        data-over-light={overLight}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      data-over-light={overLight}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
