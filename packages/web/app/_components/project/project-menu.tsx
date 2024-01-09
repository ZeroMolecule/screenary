import { FC, MouseEvent } from 'react';
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
  withinPortal?: boolean;
  small?: boolean;
};

export const ProjectMenu: FC<Props> = (props) => {
  const {
    position,
    withinPortal,
    small,
    isOpen,
    toggle,
    close,
    handleTargetClick,
    handleOpenEditModal,
    handleOpenDeleteModal,
  } = useProjectMenu(props);

  return (
    <Menu
      opened={isOpen}
      onChange={toggle}
      position={position}
      withinPortal={withinPortal}
    >
      <MenuTarget>
        <ActionIcon
          size={small ? 'md' : 'xl'}
          variant="subtle"
          color="neutral.5"
          onClick={handleTargetClick}
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
  withinPortal = true,
  small,
}: Props) {
  const [isOpen, { toggle, close }] = useDisclosure(false);

  const handleTargetClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOpenEditModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    close();
    openEditModal();
  };
  const handleOpenDeleteModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    close();
    openDeleteModal();
  };

  return {
    position,
    withinPortal,
    small,
    isOpen,
    toggle,
    close,
    handleTargetClick,
    handleOpenEditModal,
    handleOpenDeleteModal,
  };
}
