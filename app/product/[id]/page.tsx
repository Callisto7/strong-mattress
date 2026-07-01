import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  List,
  ListItem,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconTruck, IconCreditCard } from '@tabler/icons-react';
import { ProductHero } from '@/components/ProductHero';
import { RelatedProducts } from '@/components/RelatedProducts';
import { products, productLoad, formatPrice } from '@/components/products';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  return {
    title: product ? `${product.name} — City Mattress` : 'Матрас — City Mattress',
    description: product
      ? `${product.name}: ${product.type}, высота ${product.height} см, ${product.firmness.toLowerCase()} жёсткости.`
      : undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const specs: [string, string][] = [
    ['Тип', product.type],
    ['Высота', `${product.height} см`],
    ['Жёсткость', product.firmness],
    ['Максимальная нагрузка', `${productLoad(product)} кг`],
    ['Гарантия', '10 лет'],
    ['Цена', formatPrice(product.price)],
  ];

  return (
    <>
      <Container pt={{ base: 32, md: 48 }} pb={{ base: 40, md: 56 }}>
        <Breadcrumbs separator="›" mb="xl">
          <Anchor component={Link} href="/catalog" c="dimmed" fz="sm">
            Каталог
          </Anchor>
          <Anchor component={Link} href="/catalog?cat=mattresses" c="dimmed" fz="sm">
            Матрасы
          </Anchor>
          <Text fz="sm" fw={600}>
            {product.name}
          </Text>
        </Breadcrumbs>

        <ProductHero product={product} />
      </Container>

      {/* ТАБЫ + ДОСТАВКА/ОПЛАТА */}
      <Container pb={{ base: 56, md: 96 }}>
        <Grid gutter={48}>
          <GridCol span={{ base: 12, md: 7 }}>
            <Tabs defaultValue="description" color="brand.7">
              <TabsList mb="lg">
                <TabsTab value="description">Описание</TabsTab>
                <TabsTab value="specs">Характеристики</TabsTab>
                <TabsTab value="reviews">Отзывы о товаре</TabsTab>
              </TabsList>

              <TabsPanel value="description">
                <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                  {product.name} — {product.type.toLowerCase()} высотой{' '}
                  {product.height} см, {product.firmness.toLowerCase()} жёсткости.
                  Каждый слой работает вместе, чтобы поддерживать позвоночник и
                  снимать давление. Воздухопроницаемое покрытие позволяет телу
                  дышать всю ночь. Максимальная нагрузка на спальное место —{' '}
                  {productLoad(product)} кг. Гарантия 10 лет.
                </Text>
              </TabsPanel>

              <TabsPanel value="specs">
                <Stack gap={0}>
                  {specs.map(([k, v], i) => (
                    <Box key={k}>
                      <Group justify="space-between" py="sm">
                        <Text fz="sm" c="dimmed">
                          {k}
                        </Text>
                        <Text fz="sm" fw={600}>
                          {v}
                        </Text>
                      </Group>
                      {i < specs.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Stack>
              </TabsPanel>

              <TabsPanel value="reviews">
                <Text c="dimmed">
                  Рейтинг {product.rating} из 5 на основе {product.reviews}{' '}
                  отзывов покупателей.
                </Text>
              </TabsPanel>
            </Tabs>
          </GridCol>

          <GridCol span={{ base: 12, md: 5 }}>
            <Stack gap="xl">
              <Group align="flex-start" gap="md" wrap="nowrap">
                <ThemeIcon size={40} radius="md" variant="light" color="brand.7">
                  <IconTruck size={22} stroke={1.6} />
                </ThemeIcon>
                <div>
                  <Text fw={700}>Доставка</Text>
                  <List fz="sm" c="dimmed" spacing={4} mt={4}>
                    <ListItem>По городу — от 1 дня, возможен самовывоз</ListItem>
                    <ListItem>В регионы — транспортными компаниями</ListItem>
                    <ListItem>Поднимем на этаж и распакуем</ListItem>
                  </List>
                </div>
              </Group>

              <Group align="flex-start" gap="md" wrap="nowrap">
                <ThemeIcon size={40} radius="md" variant="light" color="brand.7">
                  <IconCreditCard size={22} stroke={1.6} />
                </ThemeIcon>
                <div>
                  <Text fw={700}>Оплата</Text>
                  <List fz="sm" c="dimmed" spacing={4} mt={4}>
                    <ListItem>Банковской картой онлайн</ListItem>
                    <ListItem>Наличными при получении</ListItem>
                    <ListItem>Перевод по реквизитам для юрлиц</ListItem>
                  </List>
                </div>
              </Group>
            </Stack>
          </GridCol>
        </Grid>
      </Container>

      {/* ПОХОЖИЕ ТОВАРЫ */}
      <Box className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <Title order={2} mb="xl" ta="center">
            Похожие товары
          </Title>
          <RelatedProducts currentId={product.id} />
        </Container>
      </Box>
    </>
  );
}
