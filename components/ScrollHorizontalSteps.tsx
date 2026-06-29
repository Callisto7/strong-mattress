'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Box, Button, Container, Group, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Tagline } from './Tagline';

type Step = {
  n: string;
  tag: string;
  title: string;
  text: string;
  gradient: string;
};

const steps: Step[] = [
  {
    n: '01',
    tag: 'Доставка',
    title: 'Привезём в течение недели',
    text: 'Доставим матрас по всей стране за несколько дней, аккуратно и в срок.',
    gradient: 'linear-gradient(160deg, #1f8a4c 0%, #0c4d28 100%)',
  },
  {
    n: '02',
    tag: 'Гарантия',
    title: 'Вернём деньги за сто дней',
    text: 'Если матрас не подошёл — вернём полную стоимость без лишних вопросов.',
    gradient: 'linear-gradient(160deg, #27ad66 0%, #166b3a 100%)',
  },
  {
    n: '03',
    tag: 'Консультация',
    title: 'Найдём матрас именно вам',
    text: 'Матрас приедет упакованным правильно, без повреждений и задержек. Мы работаем с надёжными курьерами по всей стране.',
    gradient: 'linear-gradient(160deg, #11705a 0%, #1c5f6b 100%)',
  },
];

const ITEM_WIDTH = 400;
const GAP = 30;

export function ScrollHorizontalSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Move from first card to last card as the section is scrolled through.
  const totalDistance = (steps.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <Box component="section">
      <Container py={{ base: 48, md: 80 }}>
        <Tagline c="dark">Как мы работаем</Tagline>
        <Title order={2} mt="xs" maw={620}>
          Заботимся о вас на каждом шаге
        </Title>
      </Container>

      <div
        ref={containerRef}
        className="scroll-steps-track"
        style={{ height: `${100 + (steps.length - 1) * 75}vh` }}
      >
        <div className="scroll-steps-sticky">
          <motion.div className="scroll-steps-gallery" style={{ x }}>
            {steps.map((s) => (
              <Box
                key={s.n}
                className="scroll-steps-item"
                style={{ background: s.gradient }}
              >
                <Text fz={72} fw={800} lh={1} c="white" style={{ opacity: 0.5 }}>
                  {s.n}
                </Text>
                <div className="scroll-steps-item-content">
                  <Tagline c="white">{s.tag}</Tagline>
                  <Title order={3} mt={8} mb={12} c="white">
                    {s.title}
                  </Title>
                  <Text c="white" mb="lg" style={{ opacity: 0.9 }}>
                    {s.text}
                  </Text>
                  <Group>
                    <Button variant="white" color="dark" size="sm">
                      Заказать
                    </Button>
                    <Button
                      variant="transparent"
                      c="white"
                      size="sm"
                      px={4}
                      rightSection={<IconArrowRight size={16} />}
                    >
                      Подробнее
                    </Button>
                  </Group>
                </div>
              </Box>
            ))}
          </motion.div>
        </div>
      </div>
    </Box>
  );
}
