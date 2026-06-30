import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Tagline } from './Tagline';

type Step = {
  n: string;
  tag: string;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    n: '01',
    tag: 'Доставка',
    title: 'Привезём в течение недели',
    text: 'Доставим матрас по всей стране за несколько дней, аккуратно и точно в срок.',
  },
  {
    n: '02',
    tag: 'Гарантия',
    title: 'Вернём деньги за сто дней',
    text: 'Если матрас не подошёл — вернём полную стоимость без лишних вопросов.',
  },
  {
    n: '03',
    tag: 'Консультация',
    title: 'Найдём матрас именно вам',
    text: 'Подберём жёсткость и размер под ваш вес и привычки сна. Поможем не ошибиться с выбором.',
  },
];

export function NumberedSteps() {
  return (
    <Box component="section">
      <Container py={{ base: 56, md: 96 }}>
        <Stack gap={64}>
          {steps.map((s) => (
            <Box
              key={s.n}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.32fr) minmax(0, 0.68fr)',
                gap: 'var(--mantine-spacing-xl)',
                alignItems: 'start',
              }}
              className="numbered-step"
            >
              <Text
                fw={700}
                lh={1}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(72px, 9vw, 128px)',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.n}
              </Text>

              <Box
                style={{ borderTop: '1px solid var(--border-color)' }}
                pt={{ base: 'md', md: 'xl' }}
              >
                <Tagline c="dark">{s.tag}</Tagline>
                <Title order={2} mt="sm" mb="md">
                  {s.title}
                </Title>
                <Text c="dimmed" maw={620} style={{ lineHeight: 1.6 }}>
                  {s.text}
                </Text>
                <Group mt="xl" gap="md">
                  <Button variant="outline" color="dark">
                    Заказать
                  </Button>
                  <Button
                    variant="subtle"
                    color="dark"
                    px={4}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Подробнее
                  </Button>
                </Group>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
