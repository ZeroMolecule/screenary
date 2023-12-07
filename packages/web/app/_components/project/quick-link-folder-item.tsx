import { FC } from 'react';
import { Button } from '@mantine/core';
import { Directory } from '@prisma/client';
import { ProjectMenu } from './project-menu';
import { QuickLinkType } from './quick-links';
import { FolderIcon } from '../icons/folder-icon';
import classNames from 'classnames';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  item: Directory;
  onEditOpen: (folder: Directory, type: QuickLinkType) => void;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
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
      leftSection={<FolderIcon />}
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

  const handleEditOpen = () => onEditOpen(item, 'folder');
  const handleDeleteOpen = () => onDeleteOpen(id, 'folder');

  return {
    name,
    handleEditOpen,
    handleDeleteOpen,
    inExpandedView,
  };
}
