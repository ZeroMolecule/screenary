'use client';

import { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import { editMeMutation } from '@/domain/mutations/edit-me-mutation';
import { deleteMeMutation } from '@/domain/mutations/delete-me-mutation';
import { UserMenu, UserMenuVariant } from './user-menu';
import { ProfileFormValues, ProfileModal } from '../modals/profile-modal';

type Props = {
  variant?: UserMenuVariant;
};

export const UserWidget: FC<Props> = ({ variant }) => {
  const { opened, open, close, handleSubmit, handleDelete, user } =
    useUserWidget();

  return (
    <>
      <UserMenu variant={variant} onOpen={open} user={user} />
      <ProfileModal
        opened={opened}
        onClose={close}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        user={user}
      />
    </>
  );
};

function useUserWidget() {
  const { data, update } = useSession();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync: editMe } = useMutation({
    mutationFn: editMeMutation.fnc,
    onSuccess: async (_, userSession) => {
      await update(userSession);
      close();
    },
  });

  const { mutateAsync: deleteMe } = useMutation({
    mutationFn: deleteMeMutation.fnc,
    onSuccess: async () => {
      await signOut();
      close();
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    await editMe(values).catch(() => null);
  };

  const handleDelete = async () => {
    await deleteMe().catch(() => null);
  };

  return {
    opened,
    open,
    close,
    handleSubmit,
    handleDelete,
    user: data?.user,
  };
}
