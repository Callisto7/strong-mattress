import Link from 'next/link';
import { rem } from '@mantine/core';

export function Logo({
  size = 28,
  color = 'inherit',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Link
      href="/"
      style={{
        fontFamily: 'var(--font-logo), cursive',
        fontSize: rem(size),
        lineHeight: 1,
        color,
        display: 'inline-block',
      }}
      aria-label="City Mattress — на главную"
    >
      Logo
    </Link>
  );
}
