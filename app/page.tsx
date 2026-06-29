import Link from 'next/link';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Container,
  Grid,
  GridCol,
  Group,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconArrowRight,
  IconCheck,
  IconX,
  IconTruck,
  IconArrowUp,
  IconMapPin,
  IconTrash,
} from '@tabler/icons-react';
import { Tagline } from '@/components/Tagline';
import { Placeholder } from '@/components/Placeholder';
import { ScrollHorizontalSteps } from '@/components/ScrollHorizontalSteps';

const services = [
  {
    icon: IconTruck,
    title: 'Привезём на дом',
    text: 'Привезём матрас в упаковке, поднимем на нужный этаж и распакуем. Работаем аккуратно, без спешки и суеты.',
  },
  {
    icon: IconArrowUp,
    title: 'Поднимем на этаж',
    text: 'Старый матрас вывезем с собой, чтобы вам не было забот. Место будет чистым, как было до нашего приезда.',
  },
  {
    icon: IconMapPin,
    title: 'Доставка по России',
    text: 'Матрас приедет в течение недели, упакованным надёжно. Мы работаем с проверенными курьерами, которые знают своё дело.',
  },
  {
    icon: IconTrash,
    title: 'Вывоз старого',
    text: 'Заберём ваш старый матрас при доставке нового. Никаких хлопот, никаких вопросов, просто чистота в доме.',
  },
];

const faq = [
  {
    q: 'Какой матрас выбрать?',
    a: 'Выбор зависит от вашего веса, роста и предпочтений по жёсткости. Лёгким людям лучше спать на мягких матрасах, тяжёлые предпочитают жёсткие. Позвоните нам, и мы поможем выбрать.',
  },
  {
    q: 'Есть ли скидки для оптовых заказов?',
    a: 'Да, мы предлагаем скидки при заказе нескольких матрасов. Свяжитесь с нами для уточнения условий и расчёта цены.',
  },
  {
    q: 'Как долго служит матрас?',
    a: 'Матрас Strong служит десять лет и более. Всё зависит от ухода и использования. Мы даём десятилетнюю гарантию на все дефекты материала.',
  },
  {
    q: 'Можно ли вернуть матрас?',
    a: 'Да, вы можете вернуть матрас в течение ста дней без вопросов. Мы вернём полную сумму, если матрас вам не подошёл.',
  },
  {
    q: 'Как быстро доставляют?',
    a: 'Доставка занимает от трёх до семи дней по России. Мы работаем с надёжными курьерами и гарантируем сохранность матраса при доставке.',
  },
  {
    q: 'Нужна ли подготовка помещения?',
    a: 'Нет, матрас приходит упакованным и готовым к использованию. Просто распакуйте его и положите на кровать. Матрас расправится за несколько часов.',
  },
];

const plans = [
  {
    name: 'Стандарт',
    desc: 'Базовый матрас с хорошей поддержкой',
    specs: [
      ['Цена', '12000 ₽'],
      ['Гарантия', '10 лет'],
      ['Жёсткость', 'Средняя'],
      ['Доставка', 'Включена'],
    ],
    features: [
      ['Ортопедическая поддержка', true],
      ['Натуральные материалы', true],
      ['Возврат за сто дней', false],
      ['Консультация бесплатно', false],
    ],
  },
  {
    name: 'Премиум',
    desc: 'Матрас с улучшенной поддержкой',
    specs: [
      ['Цена', '18000 ₽'],
      ['Гарантия', '10 лет'],
      ['Жёсткость', 'Жёсткая'],
      ['Доставка', 'С подъёмом'],
    ],
    features: [
      ['Ортопедическая поддержка', true],
      ['Натуральные материалы', true],
      ['Возврат за сто дней', true],
      ['Консультация бесплатно', true],
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Box
        style={{
          background:
            'linear-gradient(115deg, #c9a227 0%, #6b7b4f 42%, #11705a 100%)',
          color: '#fff',
        }}
      >
        <Container py={{ base: 64, md: 120 }}>
          <Stack gap="xl" style={{ minHeight: 420 }} justify="space-between">
            <Title order={1} maw={620}>
              Матрасы Strong для идеального сна
            </Title>
            <Stack gap="lg" maw={520} style={{ alignSelf: 'flex-end' }}>
              <Text fz="md" style={{ opacity: 0.92 }}>
                Мы создаём матрасы, которые держат форму и поддерживают спину
                всю ночь. Качество, которое чувствуется с первого дня.
              </Text>
              <Group>
                <Button component={Link} href="/catalog" color="brand.6">
                  Каталог
                </Button>
                <Button
                  component={Link}
                  href="/about"
                  variant="outline"
                  color="gray.0"
                  c="white"
                >
                  Подробнее
                </Button>
              </Group>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ТРИ ОСНОВЫ */}
      <Container py={{ base: 56, md: 96 }}>
        <Stack align="center" gap="xs" mb={48}>
          <Tagline>Основное</Tagline>
          <Title order={2} ta="center">
            Три основы качества
          </Title>
          <Text c="dimmed" ta="center">
            Каждый матрас Strong проверен и готов служить годы.
          </Text>
        </Stack>
        <Grid gutter="lg" align="stretch">
          {/* Большая карточка */}
          <GridCol span={{ base: 12, md: 6 }}>
            <Card
              p={0}
              radius="lg"
              h="100%"
              style={{ background: '#1c5f6b', color: '#fff', overflow: 'hidden' }}
            >
              <Placeholder h={200} radius="0" />
              <Stack p="xl" gap="sm">
                <Text fz="xl" fw={700}>
                  Ортопедическая поддержка спины
                </Text>
                <Text fz="sm" style={{ opacity: 0.85 }}>
                  Позвоночник получает правильную поддержку всю ночь долгую.
                </Text>
                <Group mt="xs">
                  <Button variant="outline" color="gray.0" c="white" size="sm">
                    Узнать
                  </Button>
                  <Button
                    variant="subtle"
                    color="gray.0"
                    c="white"
                    size="sm"
                    px={4}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Узнать
                  </Button>
                </Group>
              </Stack>
            </Card>
          </GridCol>

          {/* Карточка с фото и тёмным оверлеем */}
          <GridCol span={{ base: 12, md: 3 }}>
            <Box
              h="100%"
              mih={360}
              style={{
                position: 'relative',
                borderRadius: 'var(--mantine-radius-lg)',
                overflow: 'hidden',
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%), #6b6f63',
                color: '#fff',
              }}
            >
              <Stack
                gap="sm"
                p="lg"
                style={{ position: 'absolute', inset: 'auto 0 0 0' }}
              >
                <Text fz="lg" fw={700}>
                  Экологичные материалы
                </Text>
                <Text fz="sm" style={{ opacity: 0.9 }}>
                  Натуральные волокна дышат и служат верно долгие годы.
                </Text>
                <Button
                  variant="subtle"
                  color="gray.0"
                  c="white"
                  size="sm"
                  px={4}
                  rightSection={<IconArrowRight size={16} />}
                  style={{ alignSelf: 'flex-start' }}
                >
                  Узнать
                </Button>
              </Stack>
            </Box>
          </GridCol>

          {/* Светлая карточка */}
          <GridCol span={{ base: 12, md: 3 }}>
            <Card
              p="xl"
              radius="lg"
              h="100%"
              mih={360}
              style={{ background: 'var(--section-bg)' }}
            >
              <Stack justify="space-between" h="100%">
                <div>
                  <Text fz="lg" fw={700}>
                    Гарантия без сомнений
                  </Text>
                  <Text fz="sm" c="dimmed" mt="sm">
                    Десять лет гарантии покрывает любые дефекты материала.
                  </Text>
                </div>
                <Button
                  variant="subtle"
                  color="dark"
                  size="sm"
                  px={4}
                  rightSection={<IconArrowRight size={16} />}
                  style={{ alignSelf: 'flex-start' }}
                >
                  Узнать
                </Button>
              </Stack>
            </Card>
          </GridCol>
        </Grid>
      </Container>

      {/* НУМЕРОВАННЫЕ ШАГИ */}
      <ScrollHorizontalSteps />

      {/* УСЛУГИ */}
      <Box className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <Grid gutter={48}>
            <GridCol span={{ base: 12, md: 5 }}>
              <Stack gap="lg" style={{ position: 'sticky', top: 96 }}>
                <Tagline c="dark">Услуги</Tagline>
                <Title order={2}>Доставим и установим матрас правильно</Title>
                <Text c="dimmed">
                  Мы берём на себя всю работу, чтобы вы спали спокойно. От
                  доставки до установки, всё сделаем как надо.
                </Text>
                <Group>
                  <Button variant="outline" color="dark">
                    Заказать
                  </Button>
                  <Button
                    variant="subtle"
                    color="dark"
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Узнать
                  </Button>
                </Group>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                {services.map((s) => (
                  <Card key={s.title} radius="lg" p="xl" withBorder bg="#fff">
                    <ThemeIcon variant="transparent" color="dark" size={32}>
                      <s.icon size={26} stroke={1.6} />
                    </ThemeIcon>
                    <Text fz="lg" fw={600} mt="sm">
                      {s.title}
                    </Text>
                    <Text fz="sm" c="dimmed" mt={6} style={{ lineHeight: 1.6 }}>
                      {s.text}
                    </Text>
                  </Card>
                ))}
              </Stack>
            </GridCol>
          </Grid>
        </Container>
      </Box>

      {/* CTA БАННЕР */}
      <Container py={{ base: 56, md: 96 }}>
        <Card radius="lg" withBorder p={0} style={{ overflow: 'hidden' }}>
          <Grid gutter={0}>
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack p={{ base: 'xl', md: 48 }} gap="md" h="100%" justify="center">
                <Title order={2}>Найдите свой матрас в каталоге</Title>
                <Text c="dimmed">
                  Выберите размер и жёсткость, которые подходят именно вам
                </Text>
                <Group align="flex-end" gap="sm" wrap="nowrap">
                  <TextInput
                    placeholder="Введите ваш адрес электронной почты"
                    style={{ flex: 1 }}
                    size="md"
                  />
                  <Button size="md" component={Link} href="/catalog">
                    Перейти
                  </Button>
                </Group>
                <Text fz="xs" c="dimmed">
                  Нажимая кнопку, вы соглашаетесь с условиями использования сайта
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 5 }}>
              <Placeholder h="100%" radius="0" style={{ minHeight: 260 }} />
            </GridCol>
          </Grid>
        </Card>
      </Container>

      {/* FAQ */}
      <Box className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <Stack align="center" gap="xs" mb={48}>
            <Title order={2} ta="center">
              Вопросы
            </Title>
            <Text c="dimmed" ta="center">
              Ответы на самые частые вопросы о матрасах Strong
            </Text>
          </Stack>
          <Accordion variant="separated" radius="lg" multiple>
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} bg="#fff">
                <AccordionControl fw={600}>{f.q}</AccordionControl>
                <AccordionPanel>
                  <Text c="dimmed" fz="sm" style={{ lineHeight: 1.6 }}>
                    {f.a}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          <Stack align="center" gap="md" mt={64}>
            <Title order={3} ta="center">
              Остались вопросы?
            </Title>
            <Text c="dimmed">Остались вопросы о матрасах?</Text>
            <Button component={Link} href="/contacts" variant="outline" color="dark">
              Контакты
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* СРАВНЕНИЕ ТОВАРОВ */}
      <Container py={{ base: 56, md: 96 }}>
        <Stack align="center" gap="xs" mb={48}>
          <Tagline>Strong</Tagline>
          <Title order={2} ta="center">
            Матрасы для здорового сна
          </Title>
          <Text c="dimmed" ta="center">
            Мы создаём матрасы, которые служат долгие годы и поддерживают спину
          </Text>
        </Stack>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" maw={900} mx="auto">
          {plans.map((p) => (
            <Card key={p.name} radius="lg" withBorder p="xl">
              <Placeholder h={200} radius="md" />
              <Stack align="center" gap={4} my="lg">
                <Text fz="xl" fw={700}>
                  {p.name}
                </Text>
                <Text fz="sm" c="dimmed">
                  {p.desc}
                </Text>
              </Stack>
              <Stack gap={0}>
                {p.specs.map(([k, v]) => (
                  <Group
                    key={k}
                    justify="space-between"
                    py="sm"
                    style={{ borderTop: '1px solid var(--border-color)' }}
                  >
                    <Text fz="sm" c="dimmed">
                      {k}
                    </Text>
                    <Text fz="sm" fw={600}>
                      {v}
                    </Text>
                  </Group>
                ))}
              </Stack>
              <List spacing="sm" mt="lg" center>
                {p.features.map(([label, ok]) => (
                  <ListItem
                    key={label as string}
                    icon={
                      ok ? (
                        <IconCheck size={18} color="var(--mantine-color-brand-7)" />
                      ) : (
                        <IconX size={18} color="#bbb" />
                      )
                    }
                  >
                    <Text fz="sm" c={ok ? 'dark' : 'dimmed'}>
                      {label}
                    </Text>
                  </ListItem>
                ))}
              </List>
              <Button mt="xl" fullWidth component={Link} href="/product">
                Подробнее
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
