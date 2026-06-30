import Image from 'next/image';
import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { Tagline } from './Tagline';

export function PageHero({
  image,
  alt,
  tagline,
  title,
  text,
  children,
  minHeight = 440,
}: {
  image: string;
  alt: string;
  tagline?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  minHeight?: number;
}) {
  return (
    <Box
      component="section"
      style={{
        position: 'relative',
        minHeight,
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        color: '#fff',
      }}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', zIndex: 0 }}
      />
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(180deg, rgba(8,18,14,0.25) 0%, rgba(8,18,14,0.65) 100%)',
        }}
      />
      <Container
        py={{ base: 48, md: 72 }}
        style={{ position: 'relative', zIndex: 2, width: '100%' }}
      >
        <Stack gap="lg" maw={640}>
          {tagline && <Tagline c="gray.2">{tagline}</Tagline>}
          <Title order={1} c="white">
            {title}
          </Title>
          {text && (
            <Text fz="md" c="white" style={{ opacity: 0.95, lineHeight: 1.6 }}>
              {text}
            </Text>
          )}
          {children}
        </Stack>
      </Container>
    </Box>
  );
}
