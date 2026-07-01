"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Image,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Logo } from "./Logo";
import { catalogSideItems } from "./categories";
import { CatalogMegaMenu } from "./CatalogMegaMenu";


const links = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: "/about" },
  { label: "Каталог", href: "/catalog", dropdown: true },
  { label: "Контакты", href: "/contacts" },
];

const WHATSAPP_URL = "https://wa.me/74951234567";

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Box component="header" className="site-header">
      <Container h={64}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Link href='/' >
            <Image src="/logo.png" width={200} height='40px' />
          </Link>
          <Group gap={32} visibleFrom="sm" wrap="nowrap">
            {links.map((l) =>
              l.dropdown ? (
                <CatalogMegaMenu
                  key={l.href}
                  href={l.href}
                  active={isActive(l.href)}
                />
              ) : (
                <UnstyledButton
                  key={l.href}
                  component={Link}
                  href={l.href}
                  fz="sm"
                  fw={isActive(l.href) ? 600 : 500}
                  c={isActive(l.href) ? "brand.7" : "dark"}
                >
                  {l.label}
                </UnstyledButton>
              ),
            )}
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
            <div key={l.href}>
              <UnstyledButton
                component={Link}
                href={l.href}
                onClick={close}
                fz="lg"
                fw={isActive(l.href) ? 600 : 500}
                c={isActive(l.href) ? "brand.7" : "dark"}
              >
                {l.label}
              </UnstyledButton>
              {l.dropdown && (
                <Stack gap="xs" mt="sm" ml="xs">
                  {catalogSideItems.map((c) => (
                    <UnstyledButton
                      key={c.slug}
                      component={Link}
                      href={`/catalog?cat=${c.slug}`}
                      onClick={close}
                      c="dimmed"
                      fz="sm"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <c.icon size={18} stroke={1.7} />
                      {c.label}
                    </UnstyledButton>
                  ))}
                </Stack>
              )}
            </div>
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
