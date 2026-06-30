import Link from 'next/link';
import Image from 'next/image';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Tagline } from '@/components/Tagline';
import { Reveal } from '@/components/Reveal';
import { CatalogGrid } from '@/components/CatalogGrid';
import { PricingSection } from '@/components/PricingSection';

export const metadata = {
  title: 'Каталог матрасов — Strong',
  description:
    'Полный каталог матрасов Strong: ортопедические, эко, латексные и кокосовые модели для здорового сна.',
};

export default function CatalogPage() {
  return (
    <>
      {/* ШАПКА КАТАЛОГА */}
      <Container component="section" pt={{ base: 32, md: 48 }} pb={{ base: 8, md: 16 }}>
        <Breadcrumbs separator="›" mb="xl">
          <Anchor component={Link} href="/" c="dimmed" fz="sm">
            Главная
          </Anchor>
          <Text fz="sm" fw={600}>
            Каталог
          </Text>
        </Breadcrumbs>

        <Reveal>
          <Stack gap="sm" maw={680}>
            <Tagline c="dark">Каталог</Tagline>
            <Title order={1}>Матрасы для здорового сна</Title>
            <Text c="dimmed" fz="lg" style={{ lineHeight: 1.6 }}>
              Выберите матрас под свой вес, привычки сна и бюджет. Каждая модель
              проходит проверку качества и едет с гарантией десять лет.
            </Text>
          </Stack>
        </Reveal>
      </Container>

      {/* СЕТКА ТОВАРОВ */}
      <Container component="section" pb={{ base: 56, md: 96 }} pt="lg">
        <CatalogGrid />
      </Container>

      {/* СРАВНЕНИЕ */}
      <Box component="section" className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <PricingSection />
        </Container>
      </Box>

      {/* CTA */}
      <Container component="section" py={{ base: 56, md: 96 }}>
        <Card radius="lg" withBorder p={0} style={{ overflow: 'hidden' }}>
          <Grid gutter={0}>
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack p={{ base: 'xl', md: 48 }} gap="md" h="100%" justify="center">
                <Title order={2}>Не знаете, какой матрас выбрать?</Title>
                <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                  Оставьте почту — пришлём короткий гид по подбору жёсткости и
                  размера под ваш сон
                </Text>
                <Group align="flex-end" gap="sm" wrap="nowrap">
                  <TextInput
                    placeholder="Введите ваш адрес электронной почты"
                    style={{ flex: 1 }}
                    size="md"
                    aria-label="Электронная почта"
                  />
                  <Button size="md" component={Link} href="/contacts">
                    Получить
                  </Button>
                </Group>
                <Text fz="xs" c="dimmed">
                  Нажимая кнопку, вы соглашаетесь с условиями использования сайта
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 5 }}>
              <Box
                className="zoom-img"
                style={{ position: 'relative', minHeight: 280, height: '100%' }}
              >
                <Image
                  src="/images/mattress-7.jpg"
                  alt="Подбор матраса Strong"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </GridCol>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
