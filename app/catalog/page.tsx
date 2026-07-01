import { Suspense } from 'react';
import Link from 'next/link';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Tagline } from '@/components/Tagline';
import { Reveal } from '@/components/Reveal';
import { CatalogGrid } from '@/components/CatalogGrid';
import { MattressConfigurator } from '@/components/MattressConfigurator';

export const metadata = {
  title: 'Каталог матрасов — City Mattress',
  description:
    'Полный каталог матрасов City Mattress: ортопедические, эко, латексные и кокосовые модели для здорового сна.',
};

export default function CatalogPage() {
  return (
    <>
      {/* ШАПКА КАТАЛОГА */}
      <Container component="section" pt={{ base: 32, md: 48 }} pb={{ base: 8, md: 16 }}>
        <Breadcrumbs separator="›" mb="xl">
          <Anchor component={Link} href="/" c="dimmed" fz="sm">
            Главная
          </Anchor>
          <Text fz="sm" fw={600}>
            Каталог
          </Text>
        </Breadcrumbs>

        <Reveal>
          <Stack gap="sm" maw={680}>
            <Tagline c="dark">Каталог</Tagline>
            <Title order={1}>Матрасы для здорового сна</Title>
            <Text c="dimmed" fz="lg" style={{ lineHeight: 1.6 }}>
              Выберите матрас под свой вес, привычки сна и бюджет. Каждая модель
              проходит проверку качества и едет с гарантией десять лет.
            </Text>
          </Stack>
        </Reveal>
      </Container>

      {/* СЕТКА ТОВАРОВ */}
      <Container component="section" pb={{ base: 56, md: 96 }} pt="lg">
        <Suspense fallback={<Loader color="brand.7" />}>
          <CatalogGrid />
        </Suspense>
      </Container>

      {/* КОНСТРУКТОР ВЫБОРА */}
      <Box component="section" className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <MattressConfigurator />
        </Container>
      </Box>
    </>
  );
}
