'use client';

import { createTheme, MantineColorsTuple, rem } from '@mantine/core';

const brand: MantineColorsTuple = [
  '#edf2f8', // 0
  '#d6e0ec', // 1
  '#b3c6db', // 2
  '#8ca8c5', // 3
  '#678aac', // 4
  '#486d8b', // 5
  '#2f5375', // 6
  '#20395c', // 7 — основной брендовый
  '#172b46', // 8 — hover/active
  '#0d1a2c', // 9 — самый темный
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
