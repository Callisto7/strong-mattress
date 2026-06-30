'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Badge,
  Box,
  Card,
  Chip,
  Grid,
  GridCol,
  Group,
  Rating,
  SegmentedControl,
  Select,
  Slider,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Tagline } from './Tagline';
import { GlassButton } from './GlassButton';
import { products, formatPrice, type Firmness } from './products';

const typeKeywords: Record<string, string> = {
  Беспружинный: 'беспружинный',
  'Независимый блок': 'независимый',
  'Память формы': 'память',
  Кокос: 'кокос',
};

const sizes = [
  'Односпальный · 80×200',
  'Полутораспальный · 120×200',
  'Двуспальный · 160×200',
  'Кинг-сайз · 180×200',
];

export function MattressConfigurator() {
  const [firmness, setFirmness] = useState<'Любая' | Firmness>('Любая');
  const [type, setType] = useState<string>('Любой');
  const [size, setSize] = useState<string | null>(sizes[2]);
  const [budget, setBudget] = useState(25000);

  const { best, matchCount, relaxed } = useMemo(() => {
    const byFirmness = (p: (typeof products)[number]) =>
      firmness === 'Любая' || p.firmness === firmness;
    const byType = (p: (typeof products)[number]) =>
      type === 'Любой' ||
      p.type.toLowerCase().includes(typeKeywords[type] ?? '');
    const byBudget = (p: (typeof products)[number]) => p.price <= budget;

    const exact = products
      .filter((p) => byFirmness(p) && byType(p) && byBudget(p))
      .sort((a, b) => b.rating - a.rating || a.price - b.price);

    if (exact.length) {
      return { best: exact[0], matchCount: exact.length, relaxed: false };
    }

    // Смягчаем бюджет, затем тип, чтобы всегда показать рекомендацию
    const noBudget = products
      .filter((p) => byFirmness(p) && byType(p))
      .sort((a, b) => a.price - b.price);
    if (noBudget.length) {
      return { best: noBudget[0], matchCount: 0, relaxed: true };
    }
    const fallback = [...products].sort((a, b) => b.rating - a.rating);
    return { best: fallback[0], matchCount: 0, relaxed: true };
  }, [firmness, type, budget]);

  return (
    <Stack gap="xl">
      <Stack gap="sm" maw={620}>
        <Tagline c="dark">Конструктор</Tagline>
        <Title order={2}>Подберите матрас за минуту</Title>
        <Text c="dimmed" style={{ lineHeight: 1.6 }}>
          Укажите параметры — покажем подходящую модель Strong из каталога
        </Text>
      </Stack>

      <Grid gutter="lg" align="stretch">
        {/* Параметры */}
        <GridCol span={{ base: 12, md: 7 }}>
          <Card radius="lg" withBorder p="xl" h="100%">
            <Stack gap="xl">
              <div>
                <Text fw={600} fz="sm" mb="xs">
                  Тип матраса
                </Text>
                <Chip.Group value={type} onChange={(v) => setType(v as string)}>
                  <Group gap="xs">
                    {['Любой', ...Object.keys(typeKeywords)].map((t) => (
                      <Chip key={t} value={t} radius="sm" variant="outline">
                        {t}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </div>

              <div>
                <Text fw={600} fz="sm" mb="xs">
                  Жёсткость
                </Text>
                <SegmentedControl
                  value={firmness}
                  onChange={(v) => setFirmness(v as 'Любая' | Firmness)}
                  fullWidth
                  data={['Любая', 'Мягкая', 'Средняя', 'Жёсткая']}
                />
              </div>

              <div>
                <Text fw={600} fz="sm" mb="xs">
                  Размер
                </Text>
                <Select
                  value={size}
                  onChange={setSize}
                  data={sizes}
                  allowDeselect={false}
                  size="md"
                />
              </div>

              <div>
                <Group justify="space-between" mb="xs">
                  <Text fw={600} fz="sm">
                    Бюджет
                  </Text>
                  <Text fw={700} fz="sm" c="brand.7">
                    до {formatPrice(budget)}
                  </Text>
                </Group>
                <Slider
                  min={8000}
                  max={41000}
                  step={500}
                  value={budget}
                  onChange={setBudget}
                  label={formatPrice}
                  marks={[
                    { value: 10000, label: '10к' },
                    { value: 25000, label: '25к' },
                    { value: 40000, label: '40к' },
                  ]}
                />
              </div>
            </Stack>
          </Card>
        </GridCol>

        {/* Рекомендация */}
        <GridCol span={{ base: 12, md: 5 }}>
          <Card
            radius="lg"
            withBorder
            p={0}
            h="100%"
            className="hover-card"
            style={{ overflow: 'hidden', background: 'var(--section-bg)' }}
          >
            <Box className="zoom-img" style={{ position: 'relative', height: 200 }}>
              <Image
                src={best.image}
                alt={best.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
              <Badge
                color="dark"
                radius="sm"
                style={{ position: 'absolute', top: 12, left: 12 }}
              >
                {relaxed ? 'Ближайшая модель' : 'Рекомендуем'}
              </Badge>
            </Box>
            <Stack p="xl" gap="sm">
              <div>
                <Text fz="xl" fw={800}>
                  {best.name}
                </Text>
                <Text fz="sm" c="dimmed" mt={2}>
                  {best.type} · {best.height} см · {best.firmness}
                </Text>
              </div>
              <Group gap="xs">
                <Rating value={best.rating} fractions={2} readOnly size="xs" />
                <Text fz="xs" c="dimmed">
                  {best.rating} • {best.reviews} отзывов
                </Text>
              </Group>
              <Text fz={28} fw={800} lh={1.1}>
                {formatPrice(best.price)}
              </Text>
              <Text fz="xs" c="dimmed">
                {relaxed
                  ? 'Точных совпадений нет — показали самую близкую модель'
                  : `Подходящих моделей: ${matchCount}`}
              </Text>
              <Box mt="xs">
                <GlassButton href="/product" overLight ariaLabel="Открыть матрас">
                  Подробнее
                </GlassButton>
              </Box>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
    </Stack>
  );
}
