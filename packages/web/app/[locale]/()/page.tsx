'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, Stack, Text, Title } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';
import { useDisclosure } from '@mantine/hooks';
import { ProfileModal } from '@/app/_components/modals/profile-modal';

export default function HomePage() {
  const { data } = useSession();
  const [opened, { open, close }] = useDisclosure(false);

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
          <Button onClick={open}>Edit Profile</Button>
          <Button size="xl" onClick={() => signOut()}>
            Log Out
          </Button>
        </Stack>
      </Stack>
      <ProfileModal opened={opened} onClose={close} />
    </Screensaver>
  );
}
