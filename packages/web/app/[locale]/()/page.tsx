'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, Stack, Text, Title } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';
import { useDisclosure } from '@mantine/hooks';
import {
  ProfileFormValues,
  ProfileModal,
} from '@/app/_components/modals/profile-modal';
import { useMutation } from '@tanstack/react-query';
import { editMeMutation } from '@/domain/mutations/edit-me-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';

export default function HomePage() {
  const { data, opened, open, close, isPending, handleSubmit } = useHomePage();

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
      <ProfileModal
        opened={opened}
        onClose={close}
        onSubmit={handleSubmit}
        user={data?.user}
        isLoading={isPending}
      />
    </Screensaver>
  );
}

function useHomePage() {
  const { data, update } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const onSuccess = useNotificationSuccess('saved');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editMeMutation.fnc,
    onSuccess: async (_, userSession) => {
      await update(userSession);
      onSuccess();
      close();
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    await mutateAsync(values);
  };

  return { data, opened, open, close, isPending, handleSubmit };
}
