import { FC } from 'react';
import { Button } from '@mantine/core';
import { IconBrandMedium } from '@tabler/icons-react';
import { Directory } from '@prisma/client';
import { ProjectMenu } from './project-menu';
import classNames from 'classnames';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  item: Directory;
  onEditOpen: (folder: Directory) => void;
  onDeleteOpen: (id: string) => void;
  inExpandedView?: boolean;
};

export const QuickLinkFolderItem: FC<Props> = (props) => {
  const { name, handleEditOpen, handleDeleteOpen, inExpandedView } =
    useQuickLinkFolderItem(props);

  return (
    <Button
      component="div"
      variant="transparent"
      w="100%"
      p="xs"
      radius="md"
      c={inExpandedView ? 'white' : 'neutral.9'}
      bg={inExpandedView ? 'transparent' : 'neutral.0'}
      fw={400}
      leftSection={<IconBrandMedium />}
      rightSection={
        <ProjectMenu
          openEditModal={handleEditOpen}
          openDeleteModal={handleDeleteOpen}
          position="left-start"
          small
        />
      }
      className={classNames(styles.quickLink, {
        [styles.quickLinkExpandedView]: inExpandedView,
      })}
      classNames={{ label: styles.quickLinkLabel }}
    >
      {name}
    </Button>
  );
};

function useQuickLinkFolderItem({
  item,
  onEditOpen,
  onDeleteOpen,
  inExpandedView,
}: Props) {
  const { id, name } = item;

  const handleEditOpen = () => onEditOpen(item);
  const handleDeleteOpen = () => onDeleteOpen(id);

  return {
    name,
    handleEditOpen,
    handleDeleteOpen,
    inExpandedView,
  };
}
