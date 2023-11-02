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

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const ProfileModal: FC<Props> = (props) => {
  const { opened, showDelete, setShowDelete, handleClose } =
    useProfileModal(props);

  const deleteModalBody = (
    <Stack align="center" gap="lg">
      <Image
        src="/images/trash-icon.svg"
        width={130}
        height={130}
        alt="Delete icon"
      />
      <Title size="h3" ta="center">
        Delete Profile
      </Title>
      <Text size="lg" c="neutral.5" ta="center" maw={275}>
        Are you sure you want to delete your profile?
      </Text>
      <Group w="75%" gap="xs" grow>
        <Button bg="neutral.7" fw={500} onClick={() => setShowDelete(false)}>
          Cancel
        </Button>
        <Button bg="primary.7" fw={500}>
          Delete
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
          <Title size="h3">Account Settings</Title>
          <Group gap="lg">
            <Image
              src="/images/cover-image.png"
              width={64}
              height={64}
              alt="Avatar"
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
                Upload Image
              </Button>
              <Text size="xs" c="neutral.5">
                Max resolution 1000x1000px
              </Text>
            </Stack>
          </Group>
          <TextInput label="Name" placeholder="Enter your name" />
          <TextInput label="Email" placeholder="user@email.com" />
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
              Delete a profile
            </Button>
          </Box>
          <Group grow gap="xs">
            <Button bg="neutral.7" fw={500} onClick={handleClose}>
              Cancel
            </Button>
            <Button bg="primary.7" fw={500}>
              Save
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
};

function useProfileModal({ opened, onClose }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = async () => {
    onClose();
    setTimeout(() => {
      setShowDelete(false);
    }, 200);
  };

  return { opened, showDelete, setShowDelete, handleClose };
}
