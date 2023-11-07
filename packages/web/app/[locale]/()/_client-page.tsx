'use client';

import { Stack, Text, Title, Button } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';
import { useDisclosure } from '@mantine/hooks';
import {
  ProfileFormValues,
  ProfileModal,
} from '@/app/_components/modals/profile-modal';
import { useMutation } from '@tanstack/react-query';
import { editMeMutation } from '@/domain/mutations/edit-me-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { deleteMeMutation } from '@/domain/mutations/delete-me-mutation';
import { LogoutButton } from '@/app/_components/logout-btn';
import { signOut, useSession } from 'next-auth/react';

// TODO: placeholder page for testing user session, profile editing & deleting

export default function ClientHomePage() {
  const { data, opened, open, close, handleSubmit, handleDelete } =
    useHomePage();

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
          <LogoutButton />
        </Stack>
      </Stack>
      <ProfileModal
        opened={opened}
        onClose={close}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        user={data?.user}
      />
    </Screensaver>
  );
}

function useHomePage() {
  const { data, update } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const onEdit = useNotificationSuccess('saved');
  const onDelete = useNotificationSuccess('deleted');

  const { mutateAsync: editMe } = useMutation({
    mutationFn: editMeMutation.fnc,
    onSuccess: async (_, userSession) => {
      await update(userSession);
      onEdit();
      close();
    },
  });

  const { mutateAsync: deleteMe } = useMutation({
    mutationFn: deleteMeMutation.fnc,
    onSuccess: async () => {
      await signOut();
      onDelete();
      close();
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    await editMe(values);
  };

  const handleDelete = async () => {
    await deleteMe();
  };

  return {
    data,
    opened,
    open,
    close,
    handleSubmit,
    handleDelete,
  };
}
