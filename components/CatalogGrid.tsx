'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';

type Firmness = 'Мягкая' | 'Средняя' | 'Жёсткая';

type Product = {
  id: string;
  name: string;
  image: string;
  firmness: Firmness;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
};

const products: Product[] = [
  {
    id: 'klassik',
    name: 'Strong Классик',
    image: '/images/mattress-1.jpg',
    firmness: 'Средняя',
    price: 12990,
    rating: 4.7,
    reviews: 128,
  },
  {
    id: 'ortoped',
    name: 'Strong Ортопед',
    image: '/images/mattress-2.jpg',
    firmness: 'Жёсткая',
    price: 18990,
    rating: 4.9,
    reviews: 342,
    badge: 'Хит',
  },
  {
    id: 'eko',
    name: 'Strong Эко',
    image: '/images/mattress-3.jpg',
    firmness: 'Мягкая',
    price: 15490,
    rating: 4.6,
    reviews: 96,
    badge: 'Новинка',
  },
  {
    id: 'lateks',
    name: 'Strong Латекс',
    image: '/images/mattress-4.jpg',
    firmness: 'Средняя',
    price: 21990,
    rating: 4.8,
    reviews: 210,
  },
  {
    id: 'kokos',
    name: 'Strong Кокос',
    image: '/images/mattress-5.jpg',
    firmness: 'Жёсткая',
    price: 16990,
    rating: 4.7,
    reviews: 154,
  },
  {
    id: 'oblako',
    name: 'Strong Облако',
    image: '/images/mattress-6.jpg',
    firmness: 'Мягкая',
    price: 24990,
    oldPrice: 28990,
    rating: 4.9,
    reviews: 401,
    badge: '−14%',
  },
];

const filters: Array<'Все' | Firmness> = [
  'Все',
  'Мягкая',
  'Средняя',
  'Жёсткая',
];

const formatPrice = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;

export function CatalogGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>('Все');

  const shown = products.filter(
    (p) => active === 'Все' || p.firmness === active,
  );

  return (
    <Stack gap="xl">
      <Group gap="xs">
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <UnstyledButton
              key={f}
              onClick={() => setActive(f)}
              px="md"
              py={8}
              fz="sm"
              fw={600}
              style={{
                borderRadius: 999,
                border: '1px solid var(--border-color)',
                background: isActive
                  ? 'var(--mantine-color-brand-7)'
                  : 'transparent',
                color: isActive ? '#fff' : 'var(--mantine-color-dark-6)',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {f}
            </UnstyledButton>
          );
        })}
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%' }}
            >
              <Card
                className="hover-card"
                radius="lg"
                withBorder
                p={0}
                h="100%"
                style={{ overflow: 'hidden', display: 'flex' }}
              >
                <Box
                  className="zoom-img"
                  style={{ position: 'relative', height: 220 }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  {p.badge && (
                    <Badge
                      color="brand.7"
                      radius="sm"
                      style={{ position: 'absolute', top: 12, left: 12 }}
                    >
                      {p.badge}
                    </Badge>
                  )}
                </Box>

                <Stack p="lg" gap="sm" style={{ flex: 1 }}>
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Text fz="lg" fw={700}>
                      {p.name}
                    </Text>
                    <Badge variant="light" color="gray" radius="sm">
                      {p.firmness}
                    </Badge>
                  </Group>

                  <Group gap="xs">
                    <Rating value={p.rating} fractions={2} readOnly size="xs" />
                    <Text fz="xs" c="dimmed">
                      {p.rating} • {p.reviews} отзывов
                    </Text>
                  </Group>

                  <Group
                    justify="space-between"
                    align="flex-end"
                    mt="auto"
                    wrap="nowrap"
                  >
                    <div>
                      {p.oldPrice && (
                        <Text fz="xs" c="dimmed" td="line-through">
                          {formatPrice(p.oldPrice)}
                        </Text>
                      )}
                      <Text fz="xl" fw={800} lh={1.1}>
                        {formatPrice(p.price)}
                      </Text>
                    </div>
                    <Button
                      component={Link}
                      href="/product"
                      variant="light"
                      color="dark"
                      radius="md"
                    >
                      Подробнее
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </SimpleGrid>
    </Stack>
  );
}
