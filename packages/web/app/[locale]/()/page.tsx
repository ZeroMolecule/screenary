'use client';

import { useRouter } from 'next/navigation';
import { Button, Stack, Text, Title } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';
import { paths } from '@/navigation/paths';

export default function HomePage() {
  const router = useRouter();

  return (
    <Screensaver>
      <Stack justify="space-around" align="center">
        <Stack gap={0}>
          <Title c="white">Screenary</Title>
          <Text size="xs" c="white">
            All your screens and apps in one place.
          </Text>
        </Stack>
        <Stack>
          <Title fz={54} c="primary.1">
            Welcome back, Someone!
          </Title>
        </Stack>
        <Stack>
          <Button size="xl" onClick={() => router.push(paths.login())}>
            Log Out
          </Button>
        </Stack>
      </Stack>
    </Screensaver>
  );
}
