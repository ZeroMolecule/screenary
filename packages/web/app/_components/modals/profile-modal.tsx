import { FC, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Box,
  Button as MantineButton,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconTrash, IconUpload } from '@tabler/icons-react';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../base/form/text-input';
import { Button } from '../base/button';
import { DefaultSession, User } from 'next-auth';

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
    user,
    showDelete,
    profileForm,
    isLoading,
    setShowDelete,
    handleClose,
    onSubmit,
    onDelete,
  } = useProfileModal(props);

  const deleteModalBody = (
    <Stack align="center" gap="lg">
      <Image
        src="/images/trash-icon.svg"
        width={130}
        height={130}
        alt={t('deleteIconAlt')}
      />
      <Title size="h3" ta="center">
        {t('deleteTitle')}
      </Title>
      <Text size="lg" c="neutral.5" ta="center" maw={275}>
        {t('deleteDescription')}
      </Text>
      <Group w="75%" gap="xs" grow>
        <MantineButton
          bg="neutral.7"
          fw={500}
          onClick={() => setShowDelete(false)}
        >
          {t('cancelAction')}
        </MantineButton>
        <Button bg="primary.7" fw={500} onClick={onDelete}>
          {t('deleteAction')}
        </Button>
      </Group>
    </Stack>
  );

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      withCloseButton={false}
    >
      {showDelete ? (
        deleteModalBody
      ) : (
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
                <Stack gap={4} align="flex-start">
                  <MantineButton
                    variant="outline"
                    size="sm"
                    c="neutral.7"
                    fw={500}
                    rightSection={<IconUpload size={20} />}
                    className="profile-modal__upload-img-btn"
                  >
                    {t('uploadImageAction')}
                  </MantineButton>
                  <Text size="xs" c="neutral.5">
                    {t('maxResolution')}
                  </Text>
                </Stack>
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
                  onClick={() => setShowDelete(true)}
                >
                  {t('deleteProfileAction')}
                </MantineButton>
              </Box>
              <Group grow gap="xs">
                <MantineButton bg="neutral.7" fw={500} onClick={handleClose}>
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
      )}
    </Modal>
  );
};

function useProfileModal({ opened, onClose, onSubmit, onDelete, user }: Props) {
  const t = useTranslations('modal.profile');
  const [showDelete, setShowDelete] = useState(false);

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
    formState: { isSubmitting },
  } = profileForm;

  const handleClose = async () => {
    onClose();
    setTimeout(() => {
      setShowDelete(false);
    }, 200);
  };

  return {
    t,
    opened,
    user,
    showDelete,
    profileForm,
    isLoading: isSubmitting,
    setShowDelete,
    handleClose,
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
