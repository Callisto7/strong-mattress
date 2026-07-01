'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Divider,
  Grid,
  GridCol,
  Group,
  Modal,
  NumberInput,
  Rating,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowsDiff, IconCheck, IconX } from '@tabler/icons-react';
import { products, formatPrice, type Firmness } from './products';
import { categories } from './categories';

const firmnessValues: Firmness[] = ['Мягкая', 'Средняя', 'Жёсткая'];

const sortOptions = [
  { value: 'price', label: 'Цене' },
  { value: 'popular', label: 'Популярности' },
  { value: 'new', label: 'Новинкам' },
  { value: 'rating', label: 'Рейтингу' },
];

const PRICE_MIN = Math.min(...products.map((p) => p.price));
const PRICE_MAX = Math.max(...products.map((p) => p.price));
const MAX_COMPARE = 4;

function parsePrice(bucket: string | null): [number, number] {
  if (!bucket) return [PRICE_MIN, PRICE_MAX];
  const [lo, hi] = bucket.split('-');
  return [lo ? Number(lo) : PRICE_MIN, hi ? Number(hi) : PRICE_MAX];
}

export function CatalogGrid() {
  const searchParams = useSearchParams();
  const catSlug = searchParams.get('cat');
  const category = categories.find((c) => c.slug === catSlug);
  const emptyCategory = category && category.slug !== 'mattresses';

  const initialFirm = searchParams.get('firm');
  const typeFilter = (searchParams.get('type') || '').toLowerCase();
  const [initLo, initHi] = parsePrice(searchParams.get('price'));

  const [firm, setFirm] = useState<string[]>(
    initialFirm && firmnessValues.includes(initialFirm as Firmness)
      ? [initialFirm]
      : [],
  );
  const [priceLo, setPriceLo] = useState<number | string>(initLo);
  const [priceHi, setPriceHi] = useState<number | string>(initHi);
  const [sort, setSort] = useState('popular');
  const [compare, setCompare] = useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const resetFilters = () => {
    setFirm([]);
    setPriceLo(PRICE_MIN);
    setPriceHi(PRICE_MAX);
  };

  const shown = products
    .filter((p) => firm.length === 0 || firm.includes(p.firmness))
    .filter((p) => !typeFilter || p.type.toLowerCase().includes(typeFilter))
    .filter(
      (p) => p.price >= Number(priceLo || 0) && p.price <= Number(priceHi || PRICE_MAX),
    )
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'new')
        return Number(b.badge === 'Новинка') - Number(a.badge === 'Новинка');
      return b.reviews - a.reviews;
    });

  const compareProducts = products.filter((p) => compare.includes(p.id));

  const toggleCompare = (id: string) =>
    setCompare((c) =>
      c.includes(id)
        ? c.filter((x) => x !== id)
        : c.length >= MAX_COMPARE
          ? c
          : [...c, id],
    );

  const rows: {
    label: string;
    render: (p: (typeof products)[number]) => React.ReactNode;
  }[] = [
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

  if (emptyCategory && category) {
    return (
      <Center mih={280}>
        <Stack align="center" gap="sm" maw={460} ta="center">
          <ThemeIcon size={64} radius="xl" variant="light" color="brand.7">
            <category.icon size={34} stroke={1.6} />
          </ThemeIcon>
          <Title order={3}>{category.label} — скоро в продаже</Title>
          <Text c="dimmed">
            Мы готовим раздел «{category.label}». Пока загляните в каталог
            матрасов — он уже полностью доступен.
          </Text>
          <Button
            component={Link}
            href="/catalog?cat=mattresses"
            color="brand.7"
            radius="md"
            mt="xs"
          >
            Смотреть матрасы
          </Button>
        </Stack>
      </Center>
    );
  }

  return (
    <>
      {category && (
        <Title order={2} mb="lg">
          {category.label}
        </Title>
      )}

      <Grid gutter={{ base: 'lg', md: 40 }}>
        {/* САЙДБАР ФИЛЬТРОВ */}
        <GridCol span={{ base: 12, md: 3 }}>
          <Card withBorder radius="lg" p="lg">
            <Stack gap="lg">
              <div>
                <Text fw={700} fz="sm" mb="sm">
                  Цена, ₽
                </Text>
                <Group gap="xs" wrap="nowrap">
                  <NumberInput
                    value={priceLo}
                    onChange={setPriceLo}
                    min={0}
                    step={1000}
                    hideControls
                    size="sm"
                    aria-label="Цена от"
                    thousandSeparator=" "
                  />
                  <Text c="dimmed">—</Text>
                  <NumberInput
                    value={priceHi}
                    onChange={setPriceHi}
                    min={0}
                    step={1000}
                    hideControls
                    size="sm"
                    aria-label="Цена до"
                    thousandSeparator=" "
                  />
                </Group>
              </div>

              <Divider />

              <div>
                <Text fw={700} fz="sm" mb="sm">
                  Жёсткость
                </Text>
                <Checkbox.Group value={firm} onChange={setFirm}>
                  <Stack gap="xs">
                    {firmnessValues.map((f) => (
                      <Checkbox key={f} value={f} label={f} color="brand.7" />
                    ))}
                  </Stack>
                </Checkbox.Group>
              </div>

              <Button variant="light" color="gray" radius="md" onClick={resetFilters}>
                Сбросить всё
              </Button>
            </Stack>
          </Card>
        </GridCol>

        {/* ТОВАРЫ */}
        <GridCol span={{ base: 12, md: 9 }}>
          {/* Строка сортировки */}
          <Group gap="md" mb="lg" wrap="wrap">
            <Text fz="sm" c="dimmed">
              Сортировать по:
            </Text>
            {sortOptions.map((o) => {
              const isActive = sort === o.value;
              return (
                <UnstyledButton
                  key={o.value}
                  onClick={() => setSort(o.value)}
                  fz="sm"
                  fw={isActive ? 700 : 500}
                  c={isActive ? 'brand.7' : 'dark'}
                  style={{
                    borderBottom: isActive
                      ? '2px solid var(--mantine-color-brand-7)'
                      : '2px solid transparent',
                    paddingBottom: 2,
                  }}
                >
                  {o.label}
                </UnstyledButton>
              );
            })}
            <Text fz="sm" c="dimmed" ml="auto">
              Найдено: {shown.length}
            </Text>
          </Group>

          {shown.length === 0 ? (
            <Center mih={200}>
              <Stack align="center" gap="xs">
                <Text fw={600}>Ничего не найдено</Text>
                <Text c="dimmed" fz="sm">
                  Попробуйте изменить фильтры.
                </Text>
                <Button variant="light" color="gray" onClick={resetFilters} mt="xs">
                  Сбросить всё
                </Button>
              </Stack>
            </Center>
          ) : (
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }} spacing="lg">
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
                            aria-label={
                              selected ? 'Убрать из сравнения' : 'Добавить к сравнению'
                            }
                            style={{ position: 'absolute', top: 12, right: 12 }}
                          >
                            {selected ? (
                              <IconCheck size={18} />
                            ) : (
                              <IconArrowsDiff size={18} />
                            )}
                          </ActionIcon>
                        </Box>

                        <Stack p="lg" gap="sm" style={{ flex: 1 }}>
                          <Group
                            justify="space-between"
                            align="flex-start"
                            wrap="nowrap"
                          >
                            <div>
                              <Text
                                component={Link}
                                href={`/product/${p.id}`}
                                fz="lg"
                                fw={700}
                                c="dark"
                              >
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
                            <Button
                              component={Link}
                              href={`/product/${p.id}`}
                              variant="filled"
                              color="brand.7"
                              radius="md"
                              fullWidth
                            >
                              Подробнее
                            </Button>
                          </div>
                        </Stack>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </SimpleGrid>
          )}
        </GridCol>
      </Grid>

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
              <Button size="sm" radius="xl" onClick={open} disabled={compare.length < 2}>
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
                      href={`/product/${p.id}`}
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
    </>
  );
}
