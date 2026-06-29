import type { Metadata } from 'next';
import { Inter, Comfortaa, Pacifico } from 'next/font/google';
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { theme } from './theme';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Strong — матрасы для идеального сна',
  description:
    'Strong создаёт матрасы, которые держат форму и поддерживают спину всю ночь. Качество, которое чувствуется с первого дня.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      {...mantineHtmlProps}
      className={`${inter.variable} ${comfortaa.variable} ${pacifico.variable}`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Header />
          <main>{children}</main>
          <Footer />
        </MantineProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
