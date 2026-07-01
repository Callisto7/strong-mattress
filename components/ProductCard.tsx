import Link from 'next/link';
import Image from 'next/image';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Rating,
  Stack,
  Text,
} from '@mantine/core';
import { formatPrice, type Product } from './products';

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Card
      className="hover-card"
      radius="lg"
      withBorder
      p={0}
      h="100%"
      style={{ overflow: 'hidden', display: 'flex' }}
    >
      <Box
        component={Link}
        href={`/product/${p.id}`}
        className="zoom-img"
        style={{ position: 'relative', height: 200, display: 'block' }}
      >
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{ objectFit: 'cover' }}
        />
        {p.badge && (
          <Badge
            color="brand.7"
            radius="sm"
            style={{ position: 'absolute', top: 12, left: 12 }}
          >
            {p.badge}
          </Badge>
        )}
      </Box>

      <Stack p="lg" gap="xs" style={{ flex: 1 }}>
        <Text
          component={Link}
          href={`/product/${p.id}`}
          fz="md"
          fw={700}
          lh={1.2}
          c="dark"
        >
          {p.name}
        </Text>
        <Text fz="xs" c="dimmed">
          {p.type} · {p.height} см
        </Text>
        <Group gap={6}>
          <Rating value={p.rating} fractions={2} readOnly size="xs" />
          <Text fz="xs" c="dimmed">
            {p.rating} • {p.reviews}
          </Text>
        </Group>

        <div style={{ marginTop: 'auto' }}>
          {p.oldPrice && (
            <Text fz="xs" c="dimmed" td="line-through">
              {formatPrice(p.oldPrice)}
            </Text>
          )}
          <Text fz="xl" fw={800} lh={1.1} mb="sm">
            {formatPrice(p.price)}
          </Text>
          <Button
            component={Link}
            href={`/product/${p.id}`}
            variant="filled"
            color="brand.7"
            radius="md"
            fullWidth
          >
            Подробнее
          </Button>
        </div>
      </Stack>
    </Card>
  );
}
