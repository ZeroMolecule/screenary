import { FC } from 'react';
import {
  ActionIcon,
  Divider,
  Menu,
  MenuDropdown,
  MenuTarget,
  Stack,
} from '@mantine/core';
import { IconDots, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

type Props = {
  openEditModal: () => void;
  openDeleteModal: () => void;
};

export const ProjectMenu: FC<Props> = (props) => {
  const { isOpen, toggle, close, handleOpenEditModal, handleOpenDeleteModal } =
    useProjectMenu(props);

  return (
    <Menu opened={isOpen} onChange={toggle}>
      <MenuTarget>
        <ActionIcon size="xl" variant="subtle" color="neutral.5">
          <IconDots size={32} />
        </ActionIcon>
      </MenuTarget>
      <MenuDropdown>
        <Stack p="xs" gap="sm">
          <ActionIcon
            variant="transparent"
            size="lg"
            color="neutral.5"
            onClick={close}
          >
            <IconX size={24} />
          </ActionIcon>
          <Divider color="neutral.7" />
          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            onClick={handleOpenDeleteModal}
          >
            <IconTrash size={24} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            onClick={handleOpenEditModal}
          >
            <IconPencil size={24} />
          </ActionIcon>
        </Stack>
      </MenuDropdown>
    </Menu>
  );
};

function useProjectMenu({ openEditModal, openDeleteModal }: Props) {
  const [isOpen, { toggle, close }] = useDisclosure(false);

  const handleOpenEditModal = () => {
    close();
    openEditModal();
  };

  const handleOpenDeleteModal = () => {
    close();
    openDeleteModal();
  };

  return { isOpen, toggle, close, handleOpenEditModal, handleOpenDeleteModal };
}
