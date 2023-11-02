import { FC, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconTrash, IconUpload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const ProfileModal: FC<Props> = (props) => {
  const { t, opened, showDelete, setShowDelete, handleClose } =
    useProfileModal(props);

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
        <Stack gap="lg">
          <Title size="h3">{t('accountSettings')}</Title>
          <Group gap="lg">
            <Image
              src="/images/cover-image.png"
              width={64}
              height={64}
              alt={t('profileImgAlt', { user: 'TODO:' })}
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
          <TextInput
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
          />
          <TextInput
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
            <Button bg="primary.7" fw={500}>
              {t('saveAction')}
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
};

function useProfileModal({ opened, onClose }: Props) {
  const t = useTranslations('modal.profile');
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = async () => {
    onClose();
    setTimeout(() => {
      setShowDelete(false);
    }, 200);
  };

  return { t, opened, showDelete, setShowDelete, handleClose };
}
