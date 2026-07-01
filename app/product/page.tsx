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
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Tagline } from '@/components/Tagline';
import { Reveal } from '@/components/Reveal';
import { ProductHero } from '@/components/ProductHero';

export const metadata = {
  title: 'City Mattress премиум матрас — City Mattress',
};

const bullets = [
  'Слои пены и латекса работают как одно целое',
  'Высокоплотная пена адаптируется к телу вашему',
  'Пена высокой плотности обнимает тело без сопротивления',
];

export default function ProductPage() {
  return (
    <>
      <Container pt={{ base: 32, md: 48 }} pb={{ base: 56, md: 96 }}>
        <Breadcrumbs separator="›" mb="xl">
          <Anchor component={Link} href="/catalog" c="dimmed" fz="sm">
            Каталог
          </Anchor>
          <Anchor component={Link} href="/catalog" c="dimmed" fz="sm">
            Матрасы
          </Anchor>
          <Text fz="sm" fw={600}>
            City Mattress премиум
          </Text>
        </Breadcrumbs>

        <ProductHero />
      </Container>

      {/* КОНСТРУКЦИЯ */}
      <Container pb={{ base: 56, md: 96 }}>
        <Card radius="lg" withBorder p={0} style={{ overflow: 'hidden' }}>
          <Grid gutter={0}>
            <GridCol span={{ base: 12, md: 6 }}>
              <Box
                className="zoom-img"
                style={{ position: 'relative', minHeight: 360, height: '100%' }}
              >
                <Image
                  src="/images/mattress-5.jpg"
                  alt="Конструкция матраса City Mattress премиум"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <Stack p={{ base: 'xl', md: 48 }} gap="md" justify="center" h="100%">
                <Tagline c="dark">Конструкция</Tagline>
                <Title order={2}>
                  City Mattress премиум создан для идеального сна
                </Title>
                <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                  Каждый слой работает вместе, чтобы поддерживать позвоночник и
                  снимать давление. Высокоплотная пена адаптируется к форме тела,
                  а латекс обеспечивает упругость. Воздухопроницаемое покрытие
                  позволяет телу дышать всю ночь.
                </Text>
                <List spacing="xs" c="dimmed" fz="sm">
                  {bullets.map((b) => (
                    <ListItem key={b}>{b}</ListItem>
                  ))}
                </List>
                <Group mt="sm">
                  <Button variant="outline" color="dark">
                    Подробнее о матрасе
                  </Button>
                  <Button
                    variant="subtle"
                    color="dark"
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Смотреть видео
                  </Button>
                </Group>
              </Stack>
            </GridCol>
          </Grid>
        </Card>
      </Container>

      {/* СТАТИСТИКА (BENTO) */}
      <Box className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <Reveal>
            <Grid gutter={48} mb={48}>
              <GridCol span={{ base: 12, md: 6 }}>
                <Title order={2}>
                  City Mattress премиум матрас выбирают люди, которые ценят качество сна
                </Title>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                  Матрас прошёл тестирование и получил одобрение независимых
                  экспертов. Тысячи людей спят на City Mattress премиум и просыпаются
                  отдохнувшими. Это не просто матрас, это инвестиция в ваше
                  здоровье.
                </Text>
              </GridCol>
            </Grid>
          </Reveal>

          <Grid gutter="lg">
            <GridCol span={{ base: 12, md: 4 }}>
              <Card className="hover-card" radius="lg" withBorder p="xl" h="100%" bg="transparent">
                <Text fw={600}>Десять лет гарантии</Text>
              </Card>
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }}>
              <Box
                className="zoom-img"
                style={{
                  position: 'relative',
                  height: 180,
                  borderRadius: 'var(--mantine-radius-lg)',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/images/mattress-2.jpg"
                  alt="City Mattress премиум"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }}>
              <Card className="hover-card" radius="lg" withBorder p="xl" h="100%" bg="transparent">
                <Text fw={600} mb="xs">
                  Четыре запятая восемь звёзд рейтинг
                </Text>
                <Text fz={48} fw={800} ta="right">
                  4.8
                </Text>
                <Box
                  style={{ borderTop: '1px solid var(--border-color)' }}
                  pt="xs"
                >
                  <Text fz="xs" c="dimmed" ta="center">
                    Из пяти звёзд по отзывам покупателей
                  </Text>
                </Box>
              </Card>
            </GridCol>

            <GridCol span={{ base: 12, md: 4 }}>
              <Card className="hover-card" radius="lg" withBorder p="xl" h="100%" bg="transparent">
                <Text fz={64} fw={800} lh={1.1} ta="right">
                  10
                </Text>
                <Box
                  style={{ borderTop: '1px solid var(--border-color)' }}
                  mt="md"
                  pt="xs"
                >
                  <Text fz="xs" c="dimmed" ta="right">
                    Лет защиты от производственных дефектов
                  </Text>
                </Box>
              </Card>
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }}>
              <Card className="hover-card" radius="lg" withBorder p="xl" h="100%" bg="transparent">
                <Text fz={64} fw={800} lh={1.1} ta="center">
                  50000
                </Text>
                <Text fz="xs" c="dimmed" ta="center" mt="md">
                  Людей спят лучше с City Mattress премиум
                </Text>
              </Card>
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }}>
              <Box
                className="zoom-img"
                style={{
                  position: 'relative',
                  height: 180,
                  borderRadius: 'var(--mantine-radius-lg)',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/images/mattress-8.jpg"
                  alt="City Mattress премиум в интерьере"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </GridCol>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
