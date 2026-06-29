import { Box, Center } from '@mantine/core';
import { IconPhoto, IconMapPin, IconPlayerPlayFilled } from '@tabler/icons-react';

type Variant = 'image' | 'map' | 'video';

export function Placeholder({
  h = 300,
  radius = 'lg',
  variant = 'image',
  style,
}: {
  h?: number | string;
  radius?: string;
  variant?: Variant;
  style?: React.CSSProperties;
}) {
  return (
    <Box
      style={{
        height: typeof h === 'number' ? `${h}px` : h,
        width: '100%',
        background: '#d6d6d6',
        borderRadius: `var(--mantine-radius-${radius})`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <Center h="100%">
        {variant === 'image' && <IconPhoto size={56} color="#9a9a9a" stroke={1.5} />}
        {variant === 'map' && <IconMapPin size={56} color="#9a9a9a" stroke={1.5} />}
        {variant === 'video' && (
          <Center
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.85)',
            }}
          >
            <IconPlayerPlayFilled size={26} color="#1a1a1a" />
          </Center>
        )}
      </Center>
    </Box>
  );
}
