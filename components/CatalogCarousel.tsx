'use client';

import Link from 'next/link';
import { Carousel } from '@mantine/carousel';
import { Card, Stack, Text } from '@mantine/core';
import { Placeholder } from './Placeholder';

const items = [
  { name: 'Матрас Comfort', hard: 'Средняя жёсткость', price: '2990 ₽' },
  { name: 'Матрас Premium', hard: 'Высокая жёсткость', price: '4490 ₽' },
  { name: 'Матрас Deluxe', hard: 'Мягкая жёсткость', price: '3990 ₽' },
  { name: 'Матрас Ortho', hard: 'Высокая жёсткость', price: '5290 ₽' },
  { name: 'Матрас Eco', hard: 'Средняя жёсткость', price: '3490 ₽' },
  { name: 'Матрас Kids', hard: 'Мягкая жёсткость', price: '2490 ₽' },
];

export function CatalogCarousel() {
  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%', md: '33.3333%' }}
      slideGap="lg"
      align="start"
      controlsOffset="xs"
      withIndicators
      height="auto"
      styles={{
        indicators: { bottom: -36 },
        indicator: {
          width: 8,
          height: 8,
          backgroundColor: 'var(--mantine-color-gray-4)',
        },
      }}
    >
      {items.map((it) => (
        <Carousel.Slide key={it.name}>
          <Card
            component={Link}
            href="/product"
            radius="lg"
            p="md"
            style={{ height: '100%' }}
          >
            <Placeholder h={300} radius="md" />
            <Stack gap={2} mt="md">
              <Text fw={700}>{it.name}</Text>
              <Text fz="sm" c="dimmed">
                {it.hard}
              </Text>
              <Text fw={700} mt={4}>
                {it.price}
              </Text>
            </Stack>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
