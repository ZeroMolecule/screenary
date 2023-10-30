'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, Stack, Text, Title } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';

export default function HomePage() {
  const { data } = useSession();

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
          <Title fz={54} c="primary.1" ta="center">
            Welcome back, {data?.user?.name}!
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
