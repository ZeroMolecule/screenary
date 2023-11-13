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
  openModal: () => void;
  onDelete: () => Promise<void>;
};

export const ProjectMenu: FC<Props> = (props) => {
  const { isOpen, toggle, close, handleOpenModal, onDelete } =
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
            <IconX size={28} />
          </ActionIcon>
          <Divider color="neutral.7" />
          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            onClick={onDelete}
          >
            <IconTrash size={28} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            onClick={handleOpenModal}
          >
            <IconPencil size={28} />
          </ActionIcon>
        </Stack>
      </MenuDropdown>
    </Menu>
  );
};

function useProjectMenu({ openModal, onDelete }: Props) {
  const [isOpen, { toggle, close }] = useDisclosure(false);

  const handleOpenModal = () => {
    close();
    openModal();
  };

  return { isOpen, toggle, close, handleOpenModal, onDelete };
}
