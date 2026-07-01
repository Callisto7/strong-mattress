'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Anchor,
  Box,
  Group,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { catalogSideItems, mattressMenuColumns } from './categories';

export function CatalogMegaMenu({
  active,
  href,
}: {
  active: boolean;
  href: string;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState('mattresses');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <Box
      style={{ position: 'static' }}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <UnstyledButton
        component={Link}
        href={href}
        onClick={() => setOpen(false)}
        fz="sm"
        fw={active ? 600 : 500}
        c={active || open ? 'brand.7' : 'dark'}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
      >
        Каталог
        <IconChevronDown
          size={15}
          stroke={2}
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </UnstyledButton>

      {/* Полноширинная выпадающая панель по центру под шапкой.
          Через Portal — иначе backdrop-filter шапки ломает position: fixed. */}
      <Portal>
      <Box
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        style={{
          position: 'fixed',
          top: 64,
          left: 0,
          width: '100vw',
          zIndex: 90,
          background: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 24px 48px -24px rgba(0,0,0,0.35)',
          padding: '40px 200px 300px 200px',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
        }}
      >
        <Group gap={48} align="flex-start" wrap="nowrap" maw={1400} mx="auto">
          {/* Левый список категорий */}
          <Stack gap={6} w={320} style={{ flexShrink: 0 }}>
            {catalogSideItems.map((c) => {
              const isActive = hovered === c.slug;
              return (
                <UnstyledButton
                  key={c.slug}
                  component={Link}
                  href={`/catalog?cat=${c.slug}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHovered(c.slug)}
                  px="md"
                  py={14}
                  style={{
                    borderRadius: 'var(--mantine-radius-md)',
                    background: isActive ? 'var(--section-bg)' : 'transparent',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <Group justify="space-between" wrap="nowrap">
                    <Group gap="md" wrap="nowrap">
                      <c.icon
                        size={26}
                        stroke={1.6}
                        color={
                          isActive
                            ? 'var(--mantine-color-brand-7)'
                            : 'var(--mantine-color-dark-5)'
                        }
                      />
                      <Text fz="lg" fw={isActive ? 700 : 500}>
                        {c.label}
                      </Text>
                    </Group>
                    <IconChevronRight
                      size={18}
                      color="var(--mantine-color-dimmed)"
                    />
                  </Group>
                </UnstyledButton>
              );
            })}
          </Stack>

          {/* Правая панель */}
          <Box style={{ flex: 1 }}>
            {hovered === 'mattresses' ? (
              <SimpleGrid cols={3} spacing={40}>
                {mattressMenuColumns.map((col) => (
                  <Stack key={col.title} gap="sm">
                    <Text fz="lg" fw={700} mb={4}>
                      {col.title}
                    </Text>
                    {col.items.map((it) => (
                      <Anchor
                        key={it.label}
                        component={Link}
                        href={it.href}
                        onClick={() => setOpen(false)}
                        c="dimmed"
                        fz="md"
                        underline="never"
                      >
                        {it.label}
                      </Anchor>
                    ))}
                  </Stack>
                ))}
              </SimpleGrid>
            ) : (
              <Stack gap="sm">
                <Text fz="lg" fw={700}>
                  {catalogSideItems.find((c) => c.slug === hovered)?.label}
                </Text>
                <Text fz="md" c="dimmed" maw={420}>
                  Раздел готовится. Загляните в каталог матрасов — он уже
                  полностью доступен.
                </Text>
                <Anchor
                  component={Link}
                  href="/catalog?cat=mattresses"
                  onClick={() => setOpen(false)}
                  c="brand.7"
                  fz="md"
                  fw={600}
                >
                  Смотреть матрасы →
                </Anchor>
              </Stack>
            )}
          </Box>
        </Group>
      </Box>
      </Portal>
    </Box>
  );
}
