import { FC } from 'react';
import {
  ActionIcon,
  Divider,
  FloatingPosition,
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
  position?: FloatingPosition;
  small?: boolean;
};

export const ProjectMenu: FC<Props> = (props) => {
  const {
    position,
    small,
    isOpen,
    toggle,
    close,
    handleOpenEditModal,
    handleOpenDeleteModal,
  } = useProjectMenu(props);

  return (
    <Menu opened={isOpen} onChange={toggle} position={position}>
      <MenuTarget>
        <ActionIcon
          size={small ? 'md' : 'xl'}
          variant="subtle"
          color="neutral.5"
          onClick={(e) => e.preventDefault()}
        >
          <IconDots size={small ? 24 : 32} />
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
            <IconX />
          </ActionIcon>
          <Divider color="neutral.7" />
          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            onClick={handleOpenDeleteModal}
          >
            <IconTrash />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            onClick={handleOpenEditModal}
          >
            <IconPencil />
          </ActionIcon>
        </Stack>
      </MenuDropdown>
    </Menu>
  );
};

function useProjectMenu({
  openEditModal,
  openDeleteModal,
  position,
  small,
}: Props) {
  const [isOpen, { toggle, close }] = useDisclosure(false);

  const handleOpenEditModal = () => {
    close();
    openEditModal();
  };
  const handleOpenDeleteModal = () => {
    close();
    openDeleteModal();
  };

  return {
    position,
    small,
    isOpen,
    toggle,
    close,
    handleOpenEditModal,
    handleOpenDeleteModal,
  };
}
