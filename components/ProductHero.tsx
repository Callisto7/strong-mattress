'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Rating,
  Select,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconArrowsMaximize,
  IconBarbell,
  IconGitCompare,
  IconHeart,
  IconRuler2,
} from '@tabler/icons-react';
import { formatPrice, productLoad, products, type Product } from './products';

const WHATSAPP_URL = 'https://wa.me/74951234567';

const fallbackGallery = [
  '/images/mattress-1.jpg',
  '/images/mattress-7.jpg',
  '/images/mattress-8.jpg',
  '/images/mattress-4.jpg',
];

const sizes = [
  'Односпальный 90×200',
  'Полуторный 120×200',
  'Двуспальный 160×200',
  'Кинг-сайз 180×200',
];

const defaultProduct: Product =
  products.find((p) => p.id === 'premium') ?? products[0];

export function ProductHero({ product = defaultProduct }: { product?: Product }) {
  const gallery = [
    product.image,
    ...fallbackGallery.filter((g) => g !== product.image),
  ].slice(0, 4);

  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>('Двуспальный 160×200');

  const specs = [
    { icon: IconBarbell, label: 'Нагрузка', value: `${productLoad(product)} кг` },
    { icon: IconArrowsMaximize, label: 'Жёсткость', value: product.firmness },
    { icon: IconRuler2, label: 'Высота', value: `${product.height} см` },
  ];

  const buildOrder = (kind: string) =>
    `${WHATSAPP_URL}?text=${encodeURIComponent(
      `Здравствуйте! ${kind} матрас «${product.name}» (${formatPrice(product.price)}), ` +
        `размер: ${size ?? 'уточню'}.`,
    )}`;

  return (
    <Grid gutter={48}>
      {/* ГАЛЕРЕЯ */}
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group align="flex-start" gap="md" wrap="nowrap">
          <Stack gap="sm" visibleFrom="xs">
            {gallery.map((src, i) => (
              <Box
                key={src}
                onClick={() => setActive(i)}
                style={{
                  cursor: 'pointer',
                  width: 72,
                  height: 72,
                  position: 'relative',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                  outline:
                    active === i
                      ? '2px solid var(--mantine-color-brand-7)'
                      : '1px solid var(--border-color)',
                  outlineOffset: active === i ? 2 : 0,
                  transition: 'outline-color 0.2s ease',
                }}
              >
                <Image
                  src={src}
                  alt={`${product.name} — фото ${i + 1}`}
                  fill
                  sizes="72px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Stack>
          <Box
            className="zoom-img"
            style={{
              flex: 1,
              position: 'relative',
              height: 460,
              borderRadius: 'var(--mantine-radius-lg)',
              overflow: 'hidden',
            }}
          >
            <Image
              key={gallery[active]}
              src={gallery[active]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
            {product.badge && (
              <Badge
                color="brand.7"
                radius="sm"
                size="lg"
                style={{ position: 'absolute', top: 16, left: 16 }}
              >
                {product.badge}
              </Badge>
            )}
          </Box>
        </Group>
      </Grid.Col>

      {/* ИНФОРМАЦИЯ */}
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack gap="lg">
          <div>
            <Title order={1} fz={{ base: 32, md: 40 }}>
              {product.name}
            </Title>
            <Group gap="sm" align="baseline" mt="xs">
              <Text fz={30} fw={800}>
                {formatPrice(product.price)}
              </Text>
              {product.oldPrice && (
                <Text fz="lg" c="dimmed" td="line-through">
                  {formatPrice(product.oldPrice)}
                </Text>
              )}
            </Group>
          </div>

          <div>
            <Text fw={600} fz="sm" mb={6}>
              Размер
            </Text>
            <Select
              value={size}
              onChange={setSize}
              data={sizes}
              size="md"
              allowDeselect={false}
            />
            <Anchor href={buildOrder('Нужен нестандартный размер для матраса')} target="_blank" c="dimmed" fz="sm" mt={6} inline>
              Нужен нестандартный размер?
            </Anchor>
          </div>

          {/* Характеристики с иконками */}
          <Stack gap="sm">
            {specs.map((s) => (
              <Group key={s.label} gap="sm">
                <ThemeIcon variant="light" color="brand.7" radius="md" size={32}>
                  <s.icon size={18} stroke={1.7} />
                </ThemeIcon>
                <Text fz="sm" c="dimmed">
                  {s.label}
                </Text>
                <Text fz="sm" fw={600}>
                  {s.value}
                </Text>
              </Group>
            ))}
          </Stack>

          <Group gap="sm" wrap="wrap">
            <Button
              component="a"
              href={buildOrder('Хочу заказать')}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              color="brand.8"
            >
              Добавить в корзину
            </Button>
            <Button
              component="a"
              href={buildOrder('Купить в один клик:')}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              variant="outline"
              color="dark"
            >
              Купить в один клик
            </Button>
          </Group>

          <Group gap="lg">
            <Group gap="xs">
              <Rating value={product.rating} fractions={2} readOnly size="sm" />
              <Text fz="sm" c="dimmed">
                {product.rating} • {product.reviews} отзывов
              </Text>
            </Group>
            <Group gap="xs" ml="auto">
              <ActionIcon variant="subtle" color="gray" radius="xl" aria-label="В избранное">
                <IconHeart size={20} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" radius="xl" aria-label="К сравнению">
                <IconGitCompare size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
