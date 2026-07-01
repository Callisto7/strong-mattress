'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Modal,
  Rating,
  SimpleGrid,
  Stack,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowsDiff, IconCheck, IconX } from '@tabler/icons-react';
import {
  products,
  formatPrice,
  type Firmness,
} from './products';

const filters: Array<'Все' | Firmness> = [
  'Все',
  'Мягкая',
  'Средняя',
  'Жёсткая',
];

const MAX_COMPARE = 4;

export function CatalogGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>('Все');
  const [compare, setCompare] = useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const shown = products.filter(
    (p) => active === 'Все' || p.firmness === active,
  );
  const compareProducts = products.filter((p) => compare.includes(p.id));

  const toggleCompare = (id: string) =>
    setCompare((c) =>
      c.includes(id)
        ? c.filter((x) => x !== id)
        : c.length >= MAX_COMPARE
          ? c
          : [...c, id],
    );

  const rows: { label: string; render: (p: (typeof products)[number]) => React.ReactNode }[] = [
    { label: 'Цена', render: (p) => <Text fw={800}>{formatPrice(p.price)}</Text> },
    { label: 'Тип', render: (p) => <Text fz="sm">{p.type}</Text> },
    { label: 'Высота', render: (p) => <Text fz="sm">{p.height} см</Text> },
    { label: 'Жёсткость', render: (p) => <Text fz="sm">{p.firmness}</Text> },
    {
      label: 'Рейтинг',
      render: (p) => (
        <Text fz="sm">
          {p.rating} • {p.reviews}
        </Text>
      ),
    },
  ];

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
          {shown.map((p) => {
            const selected = compare.includes(p.id);
            return (
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
                    <ActionIcon
                      onClick={() => toggleCompare(p.id)}
                      variant={selected ? 'filled' : 'white'}
                      color={selected ? 'brand.7' : 'dark'}
                      radius="md"
                      size="lg"
                      aria-label={selected ? 'Убрать из сравнения' : 'Добавить к сравнению'}
                      style={{ position: 'absolute', top: 12, right: 12 }}
                    >
                      {selected ? <IconCheck size={18} /> : <IconArrowsDiff size={18} />}
                    </ActionIcon>
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

                    <div style={{ marginTop: 'auto' }}>
                      {p.oldPrice && (
                        <Text fz="xs" c="dimmed" td="line-through">
                          {formatPrice(p.oldPrice)}
                        </Text>
                      )}
                      <Text fz="xl" fw={800} lh={1.1} mb="sm">
                        {formatPrice(p.price)}
                      </Text>
                      <Group gap="xs" grow>
                        <Button
                          component={Link}
                          href="/product"
                          variant="filled"
                          color="brand.7"
                          radius="md"
                        >
                          Подробнее
                        </Button>
                      </Group>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </SimpleGrid>

      {/* Плавающая панель сравнения */}
      <AnimatePresence>
        {compare.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              left: '50%',
              bottom: 24,
              transform: 'translateX(-50%)',
              zIndex: 200,
            }}
          >
            <Group
              gap="md"
              wrap="nowrap"
              px="lg"
              py="sm"
              style={{
                background: 'rgba(20, 24, 22, 0.82)',
                backdropFilter: 'blur(16px) saturate(160%)',
                WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.16)',
                boxShadow: '0 18px 50px -16px rgba(0,0,0,0.55)',
                color: '#fff',
              }}
            >
              <Text fz="sm" fw={600} c="white" style={{ whiteSpace: 'nowrap' }}>
                Выбрано {compare.length} из {MAX_COMPARE}
              </Text>
              <Button
                size="sm"
                radius="xl"
                onClick={open}
                disabled={compare.length < 2}
              >
                Сравнить
              </Button>
              <ActionIcon
                variant="subtle"
                color="gray.3"
                radius="xl"
                onClick={() => setCompare([])}
                aria-label="Очистить сравнение"
              >
                <IconX size={18} />
              </ActionIcon>
            </Group>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модалка сравнения */}
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        radius="lg"
        title={
          <Text fw={700} fz="lg">
            Сравнение матрасов
          </Text>
        }
        centered
      >
        <Table.ScrollContainer minWidth={320 + compareProducts.length * 200}>
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                {compareProducts.map((p) => (
                  <Table.Th key={p.id} style={{ minWidth: 180 }}>
                    <Stack gap={8} align="center">
                      <Box
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: 110,
                          borderRadius: 'var(--mantine-radius-md)',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="180px"
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                      <Text fw={700} ta="center">
                        {p.name}
                      </Text>
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
                  {compareProducts.map((p) => (
                    <Table.Td key={p.id} style={{ textAlign: 'center' }}>
                      {r.render(p)}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
              <Table.Tr>
                <Table.Td />
                {compareProducts.map((p) => (
                  <Table.Td key={p.id}>
                    <Button
                      component={Link}
                      href="/product"
                      fullWidth
                      radius="md"
                      onClick={close}
                    >
                      Подробнее
                    </Button>
                  </Table.Td>
                ))}
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Modal>
    </Stack>
  );
}
