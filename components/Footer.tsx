import Link from 'next/link';
import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { Logo } from './Logo';

const col1 = [
  { label: 'О нас', href: '/about' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Товар', href: '/product' },
  { label: 'Контакты', href: '/contacts' },
  { label: 'Главная', href: '/' },
];

const col2 = [
  { label: 'Доставка', href: '#' },
  { label: 'Гарантия', href: '#' },
  { label: 'Возврат', href: '#' },
  { label: 'Поддержка', href: '#' },
  { label: 'Блог', href: '#' },
];

const socials = [
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandLinkedin,
  IconBrandYoutube,
];

export function Footer() {
  return (
    <Box component="footer" pt={64} pb={32} style={{ background: '#fff' }}>
      <Container>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={48}>
          <Stack gap="lg">
            <Logo size={28} />
            <div>
              <Text fw={700} fz="sm">
                Адрес
              </Text>
              <Text fz="sm" c="dimmed">
                Уровень 1, 12 Sample St, Sydney NSW 2000
              </Text>
            </div>
            <div>
              <Text fw={700} fz="sm">
                Контакт
              </Text>
              <Anchor href="tel:18001234567" fz="sm" underline="always">
                1800 123 4567
              </Anchor>
              <br />
              <Anchor href="mailto:info@strong.com" fz="sm" underline="always">
                info@strong.com
              </Anchor>
            </div>
            <Group gap="sm">
              {socials.map((Icon, i) => (
                <ActionIcon
                  key={i}
                  variant="transparent"
                  color="dark"
                  size="lg"
                  aria-label="social"
                >
                  <Icon size={22} />
                </ActionIcon>
              ))}
            </Group>
          </Stack>

          <SimpleGrid cols={2} spacing={24} style={{ alignSelf: 'start' }}>
            <Stack gap="sm">
              {col1.map((l) => (
                <Anchor
                  key={l.label}
                  component={Link}
                  href={l.href}
                  c="dark"
                  fw={600}
                  fz="sm"
                >
                  {l.label}
                </Anchor>
              ))}
            </Stack>
            <Stack gap="sm">
              {col2.map((l) => (
                <Anchor key={l.label} href={l.href} c="dark" fw={600} fz="sm">
                  {l.label}
                </Anchor>
              ))}
            </Stack>
          </SimpleGrid>
        </SimpleGrid>

        <Divider my={32} />

        <Group justify="space-between" gap="md">
          <Text fz="sm" c="dimmed">
            © 2025 Strong. Все права защищены.
          </Text>
          <Group gap="lg">
            <Anchor href="#" fz="sm" c="dimmed" underline="always">
              Политика конфиденциальности
            </Anchor>
            <Anchor href="#" fz="sm" c="dimmed" underline="always">
              Условия использования
            </Anchor>
            <Anchor href="#" fz="sm" c="dimmed" underline="always">
              Настройки cookies
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
