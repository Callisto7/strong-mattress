import {
  Anchor,
  Box,
  Container,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import { Tagline } from '@/components/Tagline';
import { Placeholder } from '@/components/Placeholder';
import { ContactForm } from '@/components/ContactForm';

export const metadata = {
  title: 'Контакты — Strong',
};

const contacts = [
  {
    icon: IconMail,
    label: 'Почта',
    value: 'info@strongmattress.ru',
    href: 'mailto:info@strongmattress.ru',
  },
  {
    icon: IconPhone,
    label: 'Телефон',
    value: '+7 (495) 123-4567',
    href: 'tel:+74951234567',
  },
  {
    icon: IconMapPin,
    label: 'Офис',
    value: 'Москва, улица Тверская, дом 5, офис 201',
  },
];

function ContactList() {
  return (
    <Stack gap="lg">
      {contacts.map((c) => (
        <Group key={c.label} align="flex-start" gap="md" wrap="nowrap">
          <ThemeIcon variant="transparent" color="dark" size={28}>
            <c.icon size={22} stroke={1.6} />
          </ThemeIcon>
          <div>
            <Text fw={600}>{c.label}</Text>
            {c.href ? (
              <Anchor href={c.href} c="dark" underline="always">
                {c.value}
              </Anchor>
            ) : (
              <Text c="dimmed">{c.value}</Text>
            )}
          </div>
        </Group>
      ))}
    </Stack>
  );
}

export default function ContactsPage() {
  return (
    <>
      {/* HERO */}
      <Box style={{ background: '#8a8a8a', color: '#fff' }}>
        <Container py={{ base: 64, md: 110 }}>
          <Stack gap="lg" maw={620}>
            <Title order={1}>Мы здесь для вас</Title>
            <Text fz="md" style={{ opacity: 0.92 }}>
              Свяжитесь с нами — мы всегда на связи и готовы помочь с выбором
              матраса Strong
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* КОНТАКТНАЯ ИНФОРМАЦИЯ */}
      <Container py={{ base: 56, md: 96 }}>
        <Grid gutter={48} align="center">
          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Tagline c="dark">Контакты</Tagline>
              <Title order={2}>Напишите нам</Title>
              <Text c="dimmed">
                Найдите нас легко и свяжитесь в удобное время
              </Text>
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <ContactList />
          </GridCol>
        </Grid>
      </Container>

      {/* КАРТА */}
      <Container pb={{ base: 56, md: 96 }}>
        <Placeholder h={420} variant="map" />
      </Container>

      {/* ФОРМА */}
      <Box className="section-muted">
        <Container py={{ base: 56, md: 96 }}>
          <Grid gutter={48}>
            <GridCol span={{ base: 12, md: 5 }}>
              <Stack gap="lg">
                <Tagline c="dark">Форма</Tagline>
                <Title order={2}>Отправьте сообщение</Title>
                <Text c="dimmed">Заполните форму и мы ответим быстро</Text>
                <ContactList />
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 7 }}>
              <ContactForm />
            </GridCol>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
