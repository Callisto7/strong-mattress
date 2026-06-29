import Link from 'next/link';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
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
  Rating,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { Tagline } from '@/components/Tagline';
import { Placeholder } from '@/components/Placeholder';
import { CatalogCarousel } from '@/components/CatalogCarousel';
import { PricingSection } from '@/components/PricingSection';

export const metadata = {
  title: 'Каталог — Strong',
};

const includesLeft = [
  'Натуральные материалы высокого качества',
  'Ортопедическая поддержка позвоночника',
  'Гипоаллергенные свойства и безопасность',
  'Долговечность и надёжность конструкции',
];

const includesRight = [
  'Комфортный сон на протяжении лет',
  'Различные размеры и жёсткость',
  'Доступные цены для всех бюджетов',
  'Гарантия от производителя Strong',
];

const about = [
  {
    t: 'Материалы',
    d: 'Все матрасы Strong изготовлены из проверенных материалов, которые обеспечивают комфорт и долговечность. Мы используем только натуральные и безопасные компоненты для вашего здоровья.',
  },
  {
    t: 'Конструкция',
    d: 'Ортопедическая конструкция поддерживает позвоночник в правильном положении во время сна. Это снижает нагрузку на спину и шею, обеспечивая глубокий и восстанавливающий отдых.',
  },
  {
    t: 'Размеры',
    d: 'Матрасы доступны в различных размерах от односпальных до королевских. Каждый размер тщательно разработан для максимального комфорта и удобства использования.',
  },
  {
    t: 'Жёсткость',
    d: 'Выбирайте из мягких, средних и жёстких вариантов в зависимости от ваших предпочтений. Правильная жёсткость обеспечивает оптимальную поддержку и комфорт для вашего тела.',
  },
  {
    t: 'Гарантия',
    d: 'Все матрасы Strong защищены гарантией от производителя на производственные дефекты. Мы уверены в качестве нашей продукции и готовы её защищать.',
  },
  {
    t: 'Доставка',
    d: 'Быстрая и безопасная доставка по всей стране в течение трёх до семи дней. Бесплатная доставка при заказе от определённой суммы для вашего удобства.',
  },
  {
    t: 'Уход',
    d: 'Регулярная чистка и правильный уход продлевают жизнь матраса на долгие годы. Мы предоставляем рекомендации по уходу для сохранения качества изделия.',
  },
  {
    t: 'Возврат',
    d: 'Четырнадцать дней на возврат товара без вопросов, если матрас не подошёл. Полная гарантия возврата денег или обмена на другую модель.',
  },
];

export default function CatalogPage() {
  return (
    <Box pb={{ base: 56, md: 96 }}>
      <Container pt={{ base: 32, md: 48 }}>
        <Breadcrumbs separator="›" mb="xl">
          <Anchor component={Link} href="/" c="dimmed" fz="sm">
            Главная
          </Anchor>
          <Anchor component={Link} href="/catalog" c="dimmed" fz="sm">
            Каталог
          </Anchor>
          <Text fz="sm" fw={600}>
            Матрасы Strong
          </Text>
        </Breadcrumbs>

        {/* ВИТРИНА ТОВАРА */}
        <Grid gutter={48}>
          <GridCol span={{ base: 12, md: 7 }}>
            <Title order={2} mb="xs">
              Матрасы Strong
            </Title>
            <Text c="dimmed" mb="lg">
              Полный ассортимент качественных матрасов для здорового сна и отдыха
            </Text>
            <Card radius="lg" withBorder p="xl">
              <Text fw={700} mb="md">
                Включает
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {[includesLeft, includesRight].map((col, ci) => (
                  <List key={ci} spacing="md" center>
                    {col.map((item) => (
                      <ListItem
                        key={item}
                        icon={
                          <ThemeIcon
                            variant="transparent"
                            color="brand.7"
                            size={20}
                          >
                            <IconCheck size={18} />
                          </ThemeIcon>
                        }
                      >
                        <Text fz="sm">{item}</Text>
                      </ListItem>
                    ))}
                  </List>
                ))}
              </SimpleGrid>
            </Card>
          </GridCol>

          <GridCol span={{ base: 12, md: 5 }}>
            <Stack gap="md">
              <Placeholder h={300} variant="video" />
              <Group align="center" gap="md">
                <Text fz={28} fw={800}>
                  2990 ₽
                </Text>
                <div>
                  <Rating value={4.5} fractions={2} readOnly size="sm" />
                  <Text fz="xs" c="dimmed">
                    (4.8 звёзд) • 156 отзывов
                  </Text>
                </div>
              </Group>
              <Button size="md" color="brand.8" fullWidth>
                В корзину
              </Button>
              <Button size="md" variant="outline" color="dark" fullWidth>
                Купить
              </Button>
              <Text fz="xs" c="dimmed" ta="center">
                Гарантия возврата за 14 дней
              </Text>
            </Stack>
          </GridCol>
        </Grid>

        {/* О МАТРАСАХ */}
        <Title order={3} mt={{ base: 48, md: 80 }} mb="lg">
          О матрасах
        </Title>
        <Accordion variant="default" defaultValue="Материалы">
          {about.map((a) => (
            <AccordionItem key={a.t} value={a.t}>
              <AccordionControl fw={600}>{a.t}</AccordionControl>
              <AccordionPanel>
                <Text c="dimmed" fz="sm" style={{ lineHeight: 1.6 }}>
                  {a.d}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>

      {/* КАРУСЕЛЬ МОДЕЛЕЙ */}
      <Container py={{ base: 56, md: 96 }}>
        <Group justify="space-between" align="flex-end" mb={48}>
          <Stack gap="xs">
            <Tagline c="dark">Каталог</Tagline>
            <Title order={2}>Матрасы</Title>
            <Text c="dimmed" maw={520}>
              Выберите матрас, который подходит именно вам из нашего полного
              ассортимента
            </Text>
          </Stack>
          <Button variant="outline" color="dark" visibleFrom="sm">
            Все модели
          </Button>
        </Group>
        <CatalogCarousel />
      </Container>

      {/* СРАВНЕНИЕ */}
      <Box className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <PricingSection />
        </Container>
      </Box>
    </Box>
  );
}
