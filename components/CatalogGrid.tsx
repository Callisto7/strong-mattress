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
  type: string;
  height: number;
  firmness: Firmness;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
};

// Демо-данные: типы, диапазоны цен и высоты ориентированы на реальный
// рынок (matras-city.ru). Названия и фото — собственные.
const products: Product[] = [
  {
    id: 'eko-lite',
    name: 'Strong Эко Лайт',
    image: '/images/mattress-3.jpg',
    type: 'Беспружинный',
    height: 18,
    firmness: 'Средняя',
    price: 9990,
    rating: 4.6,
    reviews: 96,
  },
  {
    id: 'komfort',
    name: 'Strong Комфорт',
    image: '/images/mattress-1.jpg',
    type: 'Беспружинный',
    height: 21,
    firmness: 'Средняя',
    price: 12490,
    rating: 4.7,
    reviews: 128,
  },
  {
    id: 'komfort-bio',
    name: 'Strong Комфорт Био',
    image: '/images/mattress-6.jpg',
    type: 'Независимый блок',
    height: 20,
    firmness: 'Жёсткая',
    price: 14490,
    rating: 4.7,
    reviews: 154,
  },
  {
    id: 'energy',
    name: 'Strong Энерджи',
    image: '/images/mattress-2.jpg',
    type: 'Независимый блок',
    height: 22,
    firmness: 'Средняя',
    price: 20020,
    rating: 4.9,
    reviews: 342,
    badge: 'Хит',
  },
  {
    id: 'kokos',
    name: 'Strong Кокос',
    image: '/images/mattress-5.jpg',
    type: 'Беспружинный · кокос',
    height: 20,
    firmness: 'Жёсткая',
    price: 23270,
    rating: 4.7,
    reviews: 187,
  },
  {
    id: 'dream',
    name: 'Strong Дрим',
    image: '/images/mattress-4.jpg',
    type: 'Память формы',
    height: 24,
    firmness: 'Мягкая',
    price: 31340,
    rating: 4.9,
    reviews: 264,
    badge: 'Новинка',
  },
  {
    id: 'premium',
    name: 'Strong Премиум',
    image: '/images/mattress-7.jpg',
    type: 'Независимый блок · латекс',
    height: 26,
    firmness: 'Средняя',
    price: 34900,
    oldPrice: 40010,
    rating: 4.9,
    reviews: 401,
    badge: '−13%',
  },
  {
    id: 'kids',
    name: 'Strong Кидс',
    image: '/images/mattress-8.jpg',
    type: 'Беспружинный · детский',
    height: 16,
    firmness: 'Средняя',
    price: 8750,
    rating: 4.8,
    reviews: 73,
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
                    <div>
                      <Text fz="lg" fw={700}>
                        {p.name}
                      </Text>
                      <Text fz="xs" c="dimmed" mt={2}>
                        {p.type} · {p.height} см
                      </Text>
                    </div>
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
