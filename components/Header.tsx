'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Menu,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { Logo } from './Logo';

const links = [
  { label: 'Главная', href: '/' },
  { label: 'О нас', href: '/about' },
  { label: 'Каталог', href: '/catalog' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--section-bg)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <Container h={68}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Logo size={30} />

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

            <Menu trigger="hover" position="bottom-start" withArrow>
              <Menu.Target>
                <UnstyledButton
                  fz="sm"
                  fw={pathname.startsWith('/product') ? 600 : 500}
                  c={pathname.startsWith('/product') ? 'brand.7' : 'dark'}
                >
                  <Group gap={4} wrap="nowrap">
                    Товар
                    <IconChevronDown size={14} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component={Link} href="/product">
                  Strong премиум
                </Menu.Item>
                <Menu.Item component={Link} href="/catalog">
                  Все модели
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group visibleFrom="sm">
            <Button component={Link} href="/contacts" color="brand.6" radius="md">
              Контакты
            </Button>
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
            >
              {l.label}
            </UnstyledButton>
          ))}
          <UnstyledButton
            component={Link}
            href="/product"
            onClick={close}
            fz="lg"
            fw={500}
          >
            Товар
          </UnstyledButton>
          <Button
            component={Link}
            href="/contacts"
            onClick={close}
            color="brand.6"
            mt="md"
            fullWidth
          >
            Контакты
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
