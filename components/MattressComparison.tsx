'use client';

import Link from 'next/link';
import {
  Badge,
  Box,
  Button,
  Center,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconCheck, IconMinus } from '@tabler/icons-react';
import { Tagline } from './Tagline';

type Cell = boolean | string;

const models = [
  { name: 'Strong Комфорт', price: '12 490 ₽' },
  { name: 'Strong Энерджи', price: '20 020 ₽', featured: true, badge: 'Хит' },
  { name: 'Strong Премиум', price: '34 900 ₽' },
];

const rows: { label: string; values: Cell[] }[] = [
  { label: 'Тип', values: ['Беспружинный', 'Независимый блок', 'Независимый блок · латекс'] },
  { label: 'Высота', values: ['21 см', '22 см', '26 см'] },
  { label: 'Жёсткость', values: ['Средняя', 'Средняя', 'Средне-мягкая'] },
  { label: 'Макс. нагрузка', values: ['120 кг', '140 кг', '160 кг'] },
  { label: 'Съёмный чехол', values: [true, true, true] },
  { label: 'Ортопедический эффект', values: [false, true, true] },
  { label: 'Бесплатная доставка', values: [false, true, true] },
  { label: 'Гарантия', values: ['3 года', '7 лет', '10 лет'] },
];

function renderCell(v: Cell) {
  if (typeof v === 'string') {
    return (
      <Text fz="sm" fw={600} ta="center">
        {v}
      </Text>
    );
  }
  return (
    <Center>
      {v ? (
        <IconCheck size={20} color="var(--mantine-color-brand-7)" />
      ) : (
        <IconMinus size={18} color="var(--mantine-color-gray-4)" />
      )}
    </Center>
  );
}

const featuredCol = (i: number) =>
  models[i].featured
    ? { background: 'rgba(31, 138, 76, 0.06)' }
    : undefined;

export function MattressComparison() {
  return (
    <Stack align="center" gap="xl">
      <Stack align="center" gap="sm" maw={620}>
        <Tagline>Сравнение</Tagline>
        <Title order={2} ta="center">
          Сравните матрасы Strong
        </Title>
        <Text c="dimmed" ta="center" style={{ lineHeight: 1.6 }}>
          Три популярные модели рядом — выберите подходящую по типу, высоте и
          поддержке
        </Text>
      </Stack>

      <Table.ScrollContainer minWidth={680} w="100%">
        <Table verticalSpacing="md" horizontalSpacing="lg" withRowBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              {models.map((m, i) => (
                <Table.Th
                  key={m.name}
                  style={{
                    textAlign: 'center',
                    borderTopLeftRadius: m.featured ? 16 : undefined,
                    borderTopRightRadius: m.featured ? 16 : undefined,
                    ...featuredCol(i),
                  }}
                >
                  <Stack align="center" gap={6}>
                    {m.badge ? (
                      <Badge color="brand.7" radius="sm">
                        {m.badge}
                      </Badge>
                    ) : (
                      <Box h={20} />
                    )}
                    <Title order={4} fw={700}>
                      {m.name}
                    </Title>
                    <Group gap={4} align="baseline" justify="center">
                      <Text fz={24} fw={800}>
                        {m.price}
                      </Text>
                    </Group>
                  </Stack>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((r) => (
              <Table.Tr key={r.label}>
                <Table.Td>
                  <Text fz="sm" c="dimmed">
                    {r.label}
                  </Text>
                </Table.Td>
                {r.values.map((v, i) => (
                  <Table.Td key={i} style={featuredCol(i)}>
                    {renderCell(v)}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
            <Table.Tr>
              <Table.Td />
              {models.map((m, i) => (
                <Table.Td
                  key={m.name}
                  style={{
                    borderBottomLeftRadius: m.featured ? 16 : undefined,
                    borderBottomRightRadius: m.featured ? 16 : undefined,
                    ...featuredCol(i),
                  }}
                >
                  <Button component={Link} href="/product" fullWidth radius="md">
                    Подробнее
                  </Button>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
