import { FC, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Box, Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { IconTrash, IconUpload } from '@tabler/icons-react';
import { User } from '@prisma/client';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../base/form/text-input';

type Props = {
  opened: boolean;
  onClose: () => void;
  user?: Partial<User>;
};

export const ProfileModal: FC<Props> = (props) => {
  const {
    t,
    opened,
    user,
    showDelete,
    profileForm,
    setShowDelete,
    handleClose,
    onSubmit,
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
        <Button bg="neutral.7" fw={500} onClick={() => setShowDelete(false)}>
          {t('cancelAction')}
        </Button>
        <Button bg="primary.7" fw={500}>
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
                  <Button
                    variant="outline"
                    size="sm"
                    c="neutral.7"
                    fw={500}
                    rightSection={<IconUpload size={20} />}
                    className="profile-modal__upload-img-btn"
                  >
                    {t('uploadImageAction')}
                  </Button>
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
                <Button
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
                </Button>
              </Box>
              <Group grow gap="xs">
                <Button bg="neutral.7" fw={500} onClick={handleClose}>
                  {t('cancelAction')}
                </Button>
                <Button type="submit" bg="primary.7" fw={500}>
                  {t('saveAction')}
                </Button>
              </Group>
            </Stack>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
};

function useProfileModal({ opened, onClose, user }: Props) {
  const t = useTranslations('modal.profile');
  const [showDelete, setShowDelete] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });

  const handleClose = async () => {
    onClose();
    setTimeout(() => {
      setShowDelete(false);
    }, 200);
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    console.log(values);
  };

  return {
    t,
    opened,
    user,
    showDelete,
    profileForm,
    setShowDelete,
    handleClose,
    onSubmit: profileForm.handleSubmit(handleSubmit),
  };
}

type ProfileFormValues = z.infer<typeof profileSchema>;
const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
});
