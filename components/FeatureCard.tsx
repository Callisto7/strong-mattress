import { Box, Card, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';

export function FeatureCard({
  icon: IconCmp,
  title,
  text,
  variant = 'light',
}: {
  icon: Icon;
  title: string;
  text: string;
  variant?: 'light' | 'outline';
}) {
  return (
    <Card
      radius="lg"
      p="xl"
      withBorder={variant === 'outline'}
      style={{
        background: variant === 'outline' ? '#fff' : 'var(--section-bg)',
        height: '100%',
      }}
    >
      <Stack gap="md">
        <ThemeIcon variant="transparent" color="dark" size={36}>
          <IconCmp size={28} stroke={1.6} />
        </ThemeIcon>
        <Text fz="lg" fw={600}>
          {title}
        </Text>
        <Text fz="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
          {text}
        </Text>
      </Stack>
    </Card>
  );
}
