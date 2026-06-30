'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Logo } from './Logo';

const links = [
  { label: 'Главная', href: '/' },
  { label: 'О нас', href: '/about' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Контакты', href: '/contacts' },
];

const WHATSAPP_URL = 'https://wa.me/74951234567';

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Box component="header" className="site-header">
      <Container h={64}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Logo size={28} />

          <Group gap={32} visibleFrom="sm" wrap="nowrap">
            {links.map((l) => (
              <UnstyledButton
                key={l.href}
                component={Link}
                href={l.href}
                fz="sm"
                fw={isActive(l.href) ? 600 : 500}
                c={isActive(l.href) ? 'brand.7' : 'dark'}
              >
                {l.label}
              </UnstyledButton>
            ))}
          </Group>

          <Group visibleFrom="sm">
            <ActionIcon
              component="a"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              size={42}
              radius="xl"
              variant="filled"
              color="#25D366"
              aria-label="Написать в WhatsApp"
            >
              <IconBrandWhatsapp size={24} />
            </ActionIcon>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="75%"
        padding="lg"
        title={<Logo size={26} />}
        hiddenFrom="sm"
        zIndex={200}
      >
        <Stack gap="lg" mt="md">
          {links.map((l) => (
            <UnstyledButton
              key={l.href}
              component={Link}
              href={l.href}
              onClick={close}
              fz="lg"
              fw={isActive(l.href) ? 600 : 500}
              c={isActive(l.href) ? 'brand.7' : 'dark'}
            >
              {l.label}
            </UnstyledButton>
          ))}
          <Button
            component="a"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            color="#25D366"
            className="keep-solid"
            mt="md"
            fullWidth
            leftSection={<IconBrandWhatsapp size={20} />}
          >
            WhatsApp
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
