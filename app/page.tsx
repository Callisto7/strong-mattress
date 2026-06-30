import Link from 'next/link';
import Image from 'next/image';
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
import { SectionIntro } from '@/components/SectionIntro';
import { NumberedSteps } from '@/components/NumberedSteps';
import { Reveal } from '@/components/Reveal';
import { GlassButton } from '@/components/GlassButton';

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
    image: '/images/plan-standard.jpg',
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
    image: '/images/plan-premium.jpg',
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
] as const;

const faqMid = Math.ceil(faq.length / 2);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Box component="section" className="hero">
        <Image
          src="/images/hero.jpg"
          alt="Мужчина отдыхает в уютном интерьере"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.35) 100%)',
          }}
        />
        <Container className="hero-inner" py={{ base: 56, md: 80 }}>
          <Title order={1} c="white" maw={640}>
            Матрасы Strong для идеального сна
          </Title>
          <Stack gap="lg" maw={460} style={{ alignSelf: 'flex-end' }}>
            <Text fz="md" c="white" style={{ lineHeight: 1.6 }}>
              Мы создаём матрасы, которые держат форму и поддерживают спину всю
              ночь. Качество, которое чувствуется с первого дня.
            </Text>
            <Group gap="md">
              <GlassButton href="/catalog" ariaLabel="Открыть каталог">
                Каталог
              </GlassButton>
              <Button
                component={Link}
                href="/about"
                variant="outline"
                color="gray.0"
                c="white"
                size="md"
              >
                Подробнее
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ТРИ ОСНОВЫ */}
      <Container component="section" py={{ base: 56, md: 96 }}>
        <Reveal>
          <SectionIntro
            tagline="Основное"
            title="Три основы качества"
            text="Каждый матрас Strong проверен и готов служить годы."
          />
        </Reveal>
        <Grid gutter="lg" align="stretch">
          {/* Большая карточка */}
          <GridCol span={{ base: 12, md: 6 }}>
            <Reveal fill>
            <Card
              className="hover-card"
              p={0}
              radius="lg"
              h="100%"
              style={{ background: '#1c5f6b', color: '#fff', overflow: 'hidden' }}
            >
              <Box className="zoom-img" style={{ position: 'relative', height: 220 }}>
                <Image
                  src="/images/feature-back.jpg"
                  alt="Ортопедическая поддержка спины"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Stack p="xl" gap="sm">
                <Text fz="xl" fw={700}>
                  Ортопедическая поддержка спины
                </Text>
                <Text fz="sm" style={{ opacity: 0.85, lineHeight: 1.6 }}>
                  Позвоночник получает правильную поддержку всю долгую ночь.
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
            </Reveal>
          </GridCol>

          {/* Карточка с фото и тёмным оверлеем */}
          <GridCol span={{ base: 12, md: 3 }}>
            <Reveal fill delay={0.1}>
            <Box
              className="hover-card zoom-img"
              h="100%"
              mih={360}
              style={{
                position: 'relative',
                borderRadius: 'var(--mantine-radius-lg)',
                overflow: 'hidden',
                color: '#fff',
              }}
            >
              <Image
                src="/images/feature-eco.jpg"
                alt="Экологичные материалы"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: 'cover', zIndex: 0 }}
              />
              <Box
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
                }}
              />
              <Stack
                gap="sm"
                p="lg"
                style={{ position: 'absolute', inset: 'auto 0 0 0', zIndex: 2 }}
              >
                <Text fz="lg" fw={700}>
                  Экологичные материалы
                </Text>
                <Text fz="sm" style={{ opacity: 0.9, lineHeight: 1.6 }}>
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
            </Reveal>
          </GridCol>

          {/* Светлая карточка */}
          <GridCol span={{ base: 12, md: 3 }}>
            <Reveal fill delay={0.2}>
            <Card
              className="hover-card"
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
                  <Text fz="sm" c="dimmed" mt="sm" style={{ lineHeight: 1.6 }}>
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
            </Reveal>
          </GridCol>
        </Grid>
      </Container>

      {/* НУМЕРОВАННЫЕ ШАГИ */}
      <NumberedSteps />

      {/* УСЛУГИ */}
      <Box component="section">
        <Container py={{ base: 56, md: 96 }}>
          <Grid gutter={48}>
            <GridCol span={{ base: 12, md: 5 }}>
              <Reveal>
                <Stack gap="lg" style={{ position: 'sticky', top: 96 }}>
                  <Tagline c="dark">Услуги</Tagline>
                  <Title order={2}>Доставим и установим матрас правильно</Title>
                  <Text c="dimmed" style={{ lineHeight: 1.6 }}>
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
                      px={4}
                      rightSection={<IconArrowRight size={16} />}
                    >
                      Узнать
                    </Button>
                  </Group>
                </Stack>
              </Reveal>
            </GridCol>
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                {services.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.08} y={20}>
                    <Card className="hover-card" radius="lg" p="xl" withBorder>
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
                  </Reveal>
                ))}
              </Stack>
            </GridCol>
          </Grid>
        </Container>
      </Box>

      {/* CTA БАННЕР */}
      <Container component="section" py={{ base: 56, md: 96 }}>
        <Card radius="lg" withBorder p={0} style={{ overflow: 'hidden' }}>
          <Grid gutter={0}>
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack
                p={{ base: 'xl', md: 48 }}
                gap="md"
                h="100%"
                justify="center"
              >
                <Title order={2}>Найдите свой матрас в каталоге</Title>
                <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                  Выберите размер и жёсткость, которые подходят именно вам
                </Text>
                <Group align="flex-end" gap="sm" wrap="nowrap">
                  <TextInput
                    placeholder="Введите ваш адрес электронной почты"
                    style={{ flex: 1 }}
                    size="md"
                    aria-label="Электронная почта"
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
              <Box
                style={{ position: 'relative', minHeight: 280, height: '100%' }}
              >
                <Image
                  src="/images/cta-couch.jpg"
                  alt="Консультация по выбору матраса"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </GridCol>
          </Grid>
        </Card>
      </Container>

      {/* FAQ */}
      <Box component="section" className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <SectionIntro
            title="Вопросы"
            text="Ответы на самые частые вопросы о матрасах Strong"
          />
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            {[faq.slice(0, faqMid), faq.slice(faqMid)].map((col, ci) => (
              <Accordion key={ci} variant="separated" radius="lg" multiple>
                {col.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${ci}-${i}`} bg="#fff">
                    <AccordionControl fw={600}>{f.q}</AccordionControl>
                    <AccordionPanel>
                      <Text c="dimmed" fz="sm" style={{ lineHeight: 1.6 }}>
                        {f.a}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            ))}
          </SimpleGrid>

          <Stack align="center" gap="md" mt={64}>
            <Title order={3} ta="center">
              Остались вопросы?
            </Title>
            <Text c="dimmed">Остались вопросы о матрасах?</Text>
            <Button
              component={Link}
              href="/contacts"
              variant="outline"
              color="dark"
            >
              Контакты
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* СРАВНЕНИЕ ТОВАРОВ */}
      <Container component="section" py={{ base: 56, md: 96 }}>
        <SectionIntro
          tagline="Strong"
          title="Матрасы для здорового сна"
          text="Мы создаём матрасы, которые служат долгие годы и поддерживают спину"
        />
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" maw={900} mx="auto">
          {plans.map((p) => (
            <Card key={p.name} radius="lg" withBorder p="xl">
              <Box
                style={{
                  position: 'relative',
                  height: 220,
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={p.image}
                  alt={`Матрас ${p.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
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
                        <IconCheck size={18} color="#1a1a1a" />
                      ) : (
                        <IconX size={18} color="#1a1a1a" />
                      )
                    }
                  >
                    <Text fz="sm" c="dark">
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
