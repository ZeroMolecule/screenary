import { FC } from 'react';
import {
  Box,
  Group,
  Button as MantineButton,
  Modal,
  Stack,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultSession } from 'next-auth';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormTextInput } from '../base/form/text-input';
import { Title } from '../base/title';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmDeleteModal } from './confirm-delete-modal';

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<ProfileFormValues>;
  onDelete: () => Promise<void>;
  user: DefaultSession['user'];
};

export const ProfileModal: FC<Props> = (props) => {
  const {
    t,
    opened,
    onClose,
    user,
    profileForm,
    isLoading,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    onSubmit,
    onDelete,
  } = useProfileModal(props);

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        opened={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onSubmit={onDelete}
        title={t('deleteTitle')}
        description={t('deleteDescription')}
      />
    );
  }

  return (
    <Modal opened={opened} onClose={onClose} centered withCloseButton={false}>
      <FormProvider {...profileForm}>
        <form onSubmit={onSubmit}>
          <Stack gap="lg">
            <Title size="h3">{t('accountSettings')}</Title>
            <Group gap="lg">
              <Image
                src={user?.image ?? '/images/avatar-placeholder.svg'}
                width={64}
                height={64}
                alt={t('profileImgAlt', { user: user?.name })}
                className="profile-modal__avatar-img"
              />
            </Group>
            <FormTextInput
              name="name"
              label={t('nameLabel')}
              placeholder={t('namePlaceholder')}
            />
            <FormTextInput
              name="email"
              type="email"
              label={t('emailLabel')}
              placeholder={t('emailPlaceholder')}
            />
            <Box>
              <MantineButton
                variant="subtle"
                size="xs"
                px={4}
                left={-4}
                fw={400}
                c="neutral.7"
                leftSection={<IconTrash size={16} />}
                onClick={openDeleteModal}
              >
                {t('deleteProfileAction')}
              </MantineButton>
            </Box>
            <Group grow gap="xs">
              <MantineButton bg="neutral.7" fw={500} onClick={onClose}>
                {t('cancelAction')}
              </MantineButton>
              <MantineButton
                type="submit"
                bg="primary.7"
                fw={500}
                loading={isLoading}
              >
                {t('saveAction')}
              </MantineButton>
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </Modal>
  );
};

function useProfileModal({ opened, onClose, onSubmit, onDelete, user }: Props) {
  const t = useTranslations('modal.profile');
  const [
    isDeleteModalOpen,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      image: user?.image ?? '',
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = profileForm;

  return {
    t,
    opened,
    onClose,
    user,
    profileForm,
    isLoading: isSubmitting,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    onSubmit: handleSubmit(onSubmit),
    onDelete,
  };
}

export type ProfileFormValues = z.infer<typeof profileSchema>;
const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  image: z.string().min(1),
  url: z.string().url().optional(),
});
