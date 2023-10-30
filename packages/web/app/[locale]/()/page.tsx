'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, Stack, Text, Title } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';

export default function HomePage() {
  const session = useSession();
  console.log('client', session);

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
          <Button size="xl" onClick={() => signOut()}>
            Log Out
          </Button>
        </Stack>
      </Stack>
    </Screensaver>
  );
}
