import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconArrowRight,
  IconAward,
  IconHeartHandshake,
} from '@tabler/icons-react';
import { Tagline } from '@/components/Tagline';
import { PageHero } from '@/components/PageHero';
import { GlassButton } from '@/components/GlassButton';

export const metadata = {
  title: 'О нас — Strong',
};

const stats = [
  { value: '15', title: 'Лет на рынке', text: 'Пятнадцать лет работы на рынке' },
  {
    value: '250000',
    title: 'Матрасов продано',
    text: 'Двести пятьдесят тысяч матрасов продано',
  },
  {
    value: '98%',
    title: 'Довольных клиентов',
    text: 'Девяносто восемь процентов довольных клиентов',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO / БАННЕР */}
      <PageHero
        image="/images/mattress-6.jpg"
        alt="Спальня с матрасом Strong"
        tagline="О компании"
        title="Strong матрасы для сна"
        text="Мы делаем матрасы, на которых люди спят спокойно и просыпаются отдохнувшими"
      >
        <Group gap="md">
          <GlassButton href="/catalog" ariaLabel="Открыть каталог">
            Каталог
          </GlassButton>
          <Button
            component={Link}
            href="/contacts"
            variant="outline"
            color="gray.0"
            c="white"
            size="md"
          >
            Контакты
          </Button>
        </Group>
      </PageHero>

      {/* ИСТОРИЯ */}
      <Container py={{ base: 56, md: 96 }}>
        <Tagline c="dark">История</Tagline>
        <Grid gutter={48} mt="md">
          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title order={2}>Как всё начиналось с Strong</Title>
              <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                Мы начали с простой идеи: матрас должен быть честным. Не
                маркетингом, не обещаниями, а настоящим качеством, которое люди
                чувствуют каждую ночь. Годы работы научили нас, что хороший сон —
                это не роскошь, это необходимость.
              </Text>

              <Group align="flex-start" gap="md" wrap="nowrap">
                <ThemeIcon variant="transparent" color="dark" size={28}>
                  <IconAward size={24} stroke={1.6} />
                </ThemeIcon>
                <div>
                  <Text fw={600} mb={4}>
                    Качество без компромиссов
                  </Text>
                  <Text c="dimmed" fz="sm" style={{ lineHeight: 1.7 }}>
                    Мы знаем, что матрас — это не просто мебель. Это место, где
                    человек проводит треть своей жизни. Поэтому мы не делаем
                    скидок на качество. Каждый материал выбирается тщательно,
                    каждый шов проверяется дважды.
                  </Text>
                </div>
              </Group>

              <Group align="flex-start" gap="md" wrap="nowrap">
                <ThemeIcon variant="transparent" color="dark" size={28}>
                  <IconHeartHandshake size={24} stroke={1.6} />
                </ThemeIcon>
                <div>
                  <Text fw={600} mb={4}>
                    Мы слушаем людей
                  </Text>
                  <Text c="dimmed" fz="sm" style={{ lineHeight: 1.7 }}>
                    За пятнадцать лет мы научились слушать. Слушать спины,
                    которые просят поддержки. Слушать людей, которые устали от
                    плохого сна. И мы меняемся, но не теряем главного — веру в
                    то, что хороший матрас меняет жизнь.
                  </Text>
                </div>
              </Group>

              <Group>
                <Button variant="outline" color="dark" component={Link} href="/catalog">
                  Каталог
                </Button>
                <Button
                  variant="subtle"
                  color="dark"
                  rightSection={<IconArrowRight size={16} />}
                  component={Link}
                  href="/contacts"
                >
                  Контакты
                </Button>
              </Group>
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <Box
              className="zoom-img"
              style={{
                position: 'relative',
                height: 520,
                borderRadius: 'var(--mantine-radius-lg)',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/mattress-1.jpg"
                alt="Матрас Strong в интерьере спальни"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </GridCol>
        </Grid>
      </Container>

      {/* ФАКТЫ */}
      <Box className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <Grid gutter={48} mb={48}>
            <GridCol span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <Tagline c="dark">Факты</Tagline>
                <Title order={2}>Цифры, которые говорят о нашей работе</Title>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }}>
              <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                Пятнадцать лет мы делаем одно и то же. Не меняем материалы, не
                ищем дешевизну. Просто делаем матрасы, которые работают.
                Четверть миллиона людей спят на них каждую ночь, и почти все
                остаются довольны.
              </Text>
              <Group mt="lg">
                <Button variant="outline" color="dark">
                  Подробнее
                </Button>
                <Button
                  variant="subtle"
                  color="dark"
                  rightSection={<IconArrowRight size={16} />}
                >
                  Узнать
                </Button>
              </Group>
            </GridCol>
          </Grid>

          <Grid gutter="lg">
            {stats.map((s) => (
              <GridCol key={s.title} span={{ base: 12, md: 4 }}>
                <Card radius="lg" withBorder p="xl" bg="transparent" h="100%">
                  <Text fz={64} fw={800} lh={1.1}>
                    {s.value}
                  </Text>
                  <Text fw={600} mt="md">
                    {s.title}
                  </Text>
                  <Text fz="sm" c="dimmed" mt={4}>
                    {s.text}
                  </Text>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container py={{ base: 56, md: 96 }}>
        <Card radius="lg" withBorder p={0} style={{ overflow: 'hidden' }}>
          <Grid gutter={0}>
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack p={{ base: 'xl', md: 48 }} gap="md" justify="center" h="100%">
                <Title order={2}>Найдите свой идеальный матрас</Title>
                <Text c="dimmed">
                  Посмотрите полный каталог или свяжитесь с нами для персональной
                  консультации
                </Text>
                <Group align="flex-end" gap="sm" wrap="nowrap">
                  <TextInput placeholder="Введите ваш email" style={{ flex: 1 }} size="md" />
                  <Button size="md">Отправить</Button>
                </Group>
                <Text fz="xs" c="dimmed">
                  Нажимая кнопку, вы соглашаетесь с нашими условиями
                  использования
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 5 }}>
              <Box
                className="zoom-img"
                style={{ position: 'relative', minHeight: 260, height: '100%' }}
              >
                <Image
                  src="/images/mattress-4.jpg"
                  alt="Матрас Strong"
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
