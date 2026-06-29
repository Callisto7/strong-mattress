'use client';

import { createTheme, MantineColorsTuple, rem } from '@mantine/core';

const brand: MantineColorsTuple = [
  '#e7f7ee',
  '#c8ecd7',
  '#a0ddba',
  '#74cd9b',
  '#50c082',
  '#37b772',
  '#27ad66', // 6 — bright green (navbar CTA)
  '#1f8a4c', // 7 — primary
  '#166b3a', // 8 — dark green (filled buttons)
  '#0c4d28', // 9
];

export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 7, dark: 6 },
  colors: { brand },
  fontFamily:
    'var(--font-body), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'var(--font-display), var(--font-body), sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: rem(56), lineHeight: '1.1' },
      h2: { fontSize: rem(40), lineHeight: '1.15' },
      h3: { fontSize: rem(28), lineHeight: '1.2' },
      h4: { fontSize: rem(22), lineHeight: '1.3' },
    },
  },
  defaultRadius: 'md',
  radius: {
    md: rem(12),
    lg: rem(20),
  },
  black: '#1a1a1a',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Container: {
      defaultProps: {
        size: 1200,
      },
    },
  },
});
