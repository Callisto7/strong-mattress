import { Text } from '@mantine/core';

export function Tagline({
  children,
  c = 'dimmed',
}: {
  children: React.ReactNode;
  c?: string;
}) {
  return (
    <Text
      component="span"
      fw={600}
      fz="sm"
      c={c}
      style={{ letterSpacing: '0.01em' }}
    >
      {children}
    </Text>
  );
}
