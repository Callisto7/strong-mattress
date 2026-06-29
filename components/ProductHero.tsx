'use client';

import { useState } from 'react';
import {
  Accordion,
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Rating,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Placeholder } from './Placeholder';

const details = [
  {
    t: 'Материалы',
    d: 'Матрас состоит из пены высокой плотности и слоя латекса. Каждый слой работает вместе для поддержки и комфорта. Конструкция обеспечивает равномерное распределение веса по всей поверхности.',
  },
  {
    t: 'Доставка',
    d: 'Предлагаем матрас в стандартных размерах от одноместного до королевского. Каждый размер имеет одинаковую высоту и качество материалов. Выберите размер, который подходит вашей кровати.',
  },
  {
    t: 'Возврат',
    d: 'Strong гарантирует матрас на десять лет от производственных дефектов. Если возникнут проблемы, мы заменим матрас без вопросов. Ваше спокойствие и удовлетворение для нас важны.',
  },
];

export function ProductHero() {
  const [active, setActive] = useState(0);
  const [hardness, setHardness] = useState('Средняя жёсткость');
  const [qty, setQty] = useState<string | number>(1);

  return (
    <Grid gutter={48}>
      {/* ГАЛЕРЕЯ */}
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group align="flex-start" gap="md" wrap="nowrap">
          <Stack gap="sm" visibleFrom="xs">
            {[0, 1, 2, 3].map((i) => (
              <Box
                key={i}
                onClick={() => setActive(i)}
                style={{ cursor: 'pointer', width: 64 }}
              >
                <Placeholder
                  h={64}
                  radius="md"
                  style={{
                    outline:
                      active === i
                        ? '2px solid var(--mantine-color-brand-7)'
                        : 'none',
                  }}
                />
              </Box>
            ))}
          </Stack>
          <Box style={{ flex: 1 }}>
            <Placeholder h={460} />
          </Box>
        </Group>
      </Grid.Col>

      {/* ИНФОРМАЦИЯ */}
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack gap="md">
          <Title order={1} fz={{ base: 36, md: 44 }}>
            Strong премиум матрас
          </Title>
          <Text fz={28} fw={700}>
            ₽18 990
          </Text>
          <Group gap="xs">
            <Rating value={4.5} fractions={2} readOnly size="sm" />
            <Text fz="sm" c="dimmed">
              4.8 из 5 звёзд • 342 отзыва
            </Text>
          </Group>
          <Text c="dimmed" style={{ lineHeight: 1.7 }}>
            Матрас Strong премиум создан из высокоплотной пены и натурального
            латекса для поддержки позвоночника. Воздухопроницаемое покрытие
            обеспечивает комфортный сон всю ночь.
          </Text>

          <div>
            <Text fw={600} fz="sm" mb={6}>
              Размер
            </Text>
            <Select
              placeholder="Выбрать"
              size="md"
              data={[
                'Односпальный 90×200',
                'Полуторный 120×200',
                'Двуспальный 160×200',
                'Кинг-сайз 180×200',
              ]}
            />
          </div>

          <div>
            <Text fw={600} fz="sm" mb={6}>
              Жёсткость
            </Text>
            <SegmentedControl
              value={hardness}
              onChange={setHardness}
              fullWidth
              data={[
                { label: 'Средняя жёсткость', value: 'Средняя жёсткость' },
                { label: 'Высокая жёсткость', value: 'Высокая жёсткость' },
                {
                  label: 'Низкая жёсткость',
                  value: 'Низкая жёсткость',
                  disabled: true,
                },
              ]}
            />
          </div>

          <div>
            <Text fw={600} fz="sm" mb={6}>
              Количество
            </Text>
            <NumberInput
              value={qty}
              onChange={setQty}
              min={1}
              max={10}
              w={120}
              size="md"
            />
          </div>

          <Button size="md" color="brand.8" fullWidth>
            Добавить в корзину
          </Button>
          <Button size="md" variant="outline" color="dark" fullWidth>
            Купить сейчас
          </Button>
          <Text fz="xs" c="dimmed" ta="center">
            Гарантия возврата денег
          </Text>

          <Accordion variant="default" mt="sm">
            {details.map((d) => (
              <Accordion.Item key={d.t} value={d.t}>
                <Accordion.Control fw={600}>{d.t}</Accordion.Control>
                <Accordion.Panel>
                  <Text c="dimmed" fz="sm" style={{ lineHeight: 1.6 }}>
                    {d.d}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
