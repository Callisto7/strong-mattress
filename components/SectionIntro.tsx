import { Stack, Text, Title } from '@mantine/core';
import { Tagline } from './Tagline';

export function SectionIntro({
  tagline,
  title,
  text,
  mb = 48,
}: {
  tagline?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  mb?: number;
}) {
  return (
    <Stack align="center" gap="sm" mb={mb} maw={680} mx="auto">
      {tagline && <Tagline>{tagline}</Tagline>}
      <Title order={2} ta="center">
        {title}
      </Title>
      {text && (
        <Text c="dimmed" ta="center" style={{ lineHeight: 1.6 }}>
          {text}
        </Text>
      )}
    </Stack>
  );
}
