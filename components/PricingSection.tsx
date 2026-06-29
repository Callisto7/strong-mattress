'use client';

import { Fragment, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Group,
  SegmentedControl,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { Tagline } from './Tagline';

const plans = [
  {
    name: 'Базовый',
    monthly: 19,
    desc: 'Для тех, кто ценит качество по доступной цене',
  },
  {
    name: 'Стандартный',
    monthly: 29,
    desc: 'Оптимальное соотношение цены и качества',
  },
  {
    name: 'Премиум',
    monthly: 49,
    desc: 'Максимальный комфорт и долговечность',
  },
];

type Cell = boolean | string;

const groups: { title: string; rows: { label: string; values: Cell[] }[] }[] = [
  {
    title: 'Основные характеристики',
    rows: [
      { label: 'Высота матраса в сантиметрах', values: ['18 см', '22 см', '28 см'] },
      { label: 'Слои натурального материала', values: [true, true, true] },
      { label: 'Гипоаллергенное покрытие', values: [true, true, true] },
      { label: 'Усиленная боковая поддержка', values: [false, true, true] },
      { label: 'Долговечность в годах', values: [false, false, true] },
    ],
  },
  {
    title: 'Дополнительные возможности',
    rows: [
      { label: 'Съёмное и моющееся покрытие', values: ['Да', 'Да', 'Да'] },
      { label: 'Вентиляция и воздухопроницаемость', values: [true, true, true] },
      {
        label: 'Ортопедическая поддержка позвоночника',
        values: [true, true, true],
      },
      { label: 'Гарантия производителя в годах', values: [false, true, true] },
      { label: 'Бесплатная доставка по стране', values: [false, false, true] },
    ],
  },
];

function renderCell(v: Cell) {
  if (typeof v === 'string') {
    return <Text fw={600}>{v}</Text>;
  }
  return v ? <IconCheck size={18} color="var(--mantine-color-dark-9)" /> : null;
}

export function PricingSection() {
  const [period, setPeriod] = useState('monthly');

  return (
    <Stack align="center" gap="xl">
      <Stack align="center" gap="xs">
        <Tagline>Сравнение</Tagline>
        <Title order={2} ta="center">
          Выбор матраса
        </Title>
        <Text c="dimmed" ta="center">
          Сравните характеристики и цены разных моделей для правильного выбора
        </Text>
      </Stack>

      <SegmentedControl
        value={period}
        onChange={setPeriod}
        radius="md"
        size="md"
        data={[
          { label: 'Месячно', value: 'monthly' },
          { label: 'Годично', value: 'yearly' },
        ]}
      />

      <Table.ScrollContainer minWidth={720} w="100%">
        <Table verticalSpacing="md" horizontalSpacing="lg">
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              {plans.map((p) => (
                <Table.Th key={p.name} style={{ textAlign: 'center' }}>
                  <Stack align="center" gap={6}>
                    <Title order={4} fw={600}>
                      {p.name}
                    </Title>
                    <Group gap={2} align="baseline" justify="center">
                      <Text fz={36} fw={800}>
                        ${period === 'monthly' ? p.monthly : p.monthly * 10}
                      </Text>
                      <Text c="dimmed" fz="sm">
                        {period === 'monthly' ? '/мес' : '/год'}
                      </Text>
                    </Group>
                    <Text fz="xs" c="dimmed" ta="center" maw={180}>
                      {p.desc}
                    </Text>
                    <Button mt="xs" size="sm" fullWidth>
                      Выбрать
                    </Button>
                  </Stack>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {groups.map((g) => (
              <Fragment key={g.title}>
                <Table.Tr>
                  <Table.Td colSpan={4} style={{ borderBottom: 'none' }}>
                    <Title order={4} fw={600} mt="lg">
                      {g.title}
                    </Title>
                  </Table.Td>
                </Table.Tr>
                {g.rows.map((r) => (
                  <Table.Tr key={r.label}>
                    <Table.Td>
                      <Text fz="sm" c="dimmed">
                        {r.label}
                      </Text>
                    </Table.Td>
                    {r.values.map((v, i) => (
                      <Table.Td key={i}>
                        <Center>{renderCell(v)}</Center>
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
              </Fragment>
            ))}
            <Table.Tr>
              <Table.Td />
              {plans.map((p) => (
                <Table.Td key={p.name}>
                  <Button fullWidth>Выбрать</Button>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
