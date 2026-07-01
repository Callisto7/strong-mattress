import Link from 'next/link';
import { Box, SimpleGrid, Text } from '@mantine/core';
import { categories } from './categories';
import { Reveal } from './Reveal';

export function CategoryBanners() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
      {categories.map((c, i) => (
        <Reveal key={c.slug} delay={i * 0.08} y={20} fill>
          <Box
            component={Link}
            href={`/catalog?cat=${c.slug}`}
            className="hover-card category-banner"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              height: 200,
              padding: '0 clamp(24px, 4vw, 48px)',
              borderRadius: 24,
              overflow: 'hidden',
              background: '#faf1d6',
              color: '#1a1a1a',
            }}
          >
            {/* Жёлтая «дуга» как на референсе */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                right: '-2%',
                bottom: '-135%',
                width: '105%',
                height: '210%',
                borderRadius: '50%',
                background: '#fff6df',
                zIndex: 0,
              }}
            />
            <span
              aria-hidden
              style={{
                position: 'absolute',
                right: '-8%',
                bottom: '-120%',
                width: '95%',
                height: '210%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 50% 30%, #ffd651 0%, #ffcf3f 45%, #f7bb27 100%)',
                zIndex: 0,
              }}
            />

            <Text
              fw={800}
              tt="uppercase"
              lh={1.1}
              style={{
                position: 'relative',
                zIndex: 2,
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                letterSpacing: 0.5,
                maxWidth: '50%',
              }}
            >
              {c.label}
            </Text>

            {/* Иконка категории справа */}
            <c.icon
              size={128}
              stroke={1.3}
              color="#1a1a1a"
              style={{
                position: 'absolute',
                right: 'clamp(20px, 4vw, 56px)',
                bottom: 18,
                zIndex: 1,
                opacity: 0.9,
              }}
            />
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
