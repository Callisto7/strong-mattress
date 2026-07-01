import Link from "next/link";
import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

const col1 = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: "/about" },
  { label: "Каталог", href: "/catalog" },
  { label: "Контакты", href: "/contacts" },
];

const col2 = [
  { label: "Доставка", href: "#" },
  { label: "Гарантия", href: "#" },
  { label: "Возврат", href: "#" },
];

const socials = [IconBrandTelegram, IconBrandWhatsapp, IconBrandInstagram];

export function Footer() {
  return (
    <Box component="footer" pt={64} pb={32} style={{ background: "#fff" }}>
      <Container>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={48}>
          <Stack gap="lg">
            <Link href="/" style={{ width: 200 }}>
              <Image src="/logo.png" width={200} />
            </Link>
            <div>
              <Text fw={700} fz="sm">
                Адрес
              </Text>
              <Text fz="sm" c="dimmed">
                Республика Дагестан, г. Хасавюрт, ул. Грозненская 115
              </Text>
            </div>
            <div>
              <Text fw={700} fz="sm">
                Контакт
              </Text>
              <Anchor href="tel:8 800 555 35 35" fz="sm" underline="always">
                8 800 555 35 35
              </Anchor>
              <br />
              <Anchor
                href="mailto:info@citymattress.com"
                fz="sm"
                underline="always"
              >
                info@citymattress.com
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

          <SimpleGrid cols={2} spacing={24} style={{ alignSelf: "start" }}>
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
            © 2026 City Mattress. Все права защищены.
          </Text>
          <Group gap="lg">
            <Anchor href="#" fz="sm" c="dimmed" underline="always">
              Политика конфиденциальности
            </Anchor>
            <Anchor href="#" fz="sm" c="dimmed" underline="always">
              Условия использования
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
