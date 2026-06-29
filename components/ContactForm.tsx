'use client';

import { useState } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  Group,
  Radio,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      topic: '',
      role: '',
      message: '',
      agree: false,
    },
    validate: {
      firstName: (v) => (v.trim().length < 2 ? 'Введите имя' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Некорректный email'),
      agree: (v) => (v ? null : 'Необходимо согласие'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(() => {
        setSubmitted(true);
      })}
    >
      <Stack gap="lg">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Ваше имя"
              placeholder="Иван"
              size="md"
              {...form.getInputProps('firstName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Ваша фамилия"
              placeholder="Иванов"
              size="md"
              {...form.getInputProps('lastName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              size="md"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Номер телефона"
              placeholder="+7 (___) ___-__-__"
              size="md"
              {...form.getInputProps('phone')}
            />
          </Grid.Col>
        </Grid>

        <Select
          label="Тема обращения"
          placeholder="Выберите тему"
          size="md"
          data={[
            'Выбор матраса',
            'Доставка',
            'Гарантия и возврат',
            'Оптовый заказ',
            'Другое',
          ]}
          {...form.getInputProps('topic')}
        />

        <Radio.Group label="Кто вы?" {...form.getInputProps('role')}>
          <Grid mt="xs">
            {[
              'Частное лицо',
              'Организация',
              'Дизайнер интерьера',
              'Риэлтор',
              'Другое лицо',
              'Иное',
            ].map((r) => (
              <Grid.Col key={r} span={{ base: 12, sm: 6 }}>
                <Radio value={r} label={r} color="brand.7" />
              </Grid.Col>
            ))}
          </Grid>
        </Radio.Group>

        <Textarea
          label="Сообщение"
          placeholder="Напишите ваше сообщение"
          minRows={5}
          autosize
          size="md"
          {...form.getInputProps('message')}
        />

        <Checkbox
          label="Я согласен с условиями"
          color="brand.7"
          {...form.getInputProps('agree', { type: 'checkbox' })}
        />

        <Group>
          <Button type="submit" size="md">
            {submitted ? 'Отправлено ✓' : 'Отправить'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
