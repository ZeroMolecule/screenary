import { FC } from 'react';
import { Button, rgba } from '@mantine/core';
import { Directory } from '@prisma/client';
import { ProjectMenu } from '../project-menu';
import { QuickLinkType } from './quick-links';
import { FolderIcon } from '../../icons/folder-icon';
import { useFolders } from '@/hooks/use-folders';
import { useParams } from 'next/navigation';
import classNames from 'classnames';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  item: Directory;
  onEditOpen: (folder: Directory, type: QuickLinkType) => void;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
  inExpandedView?: boolean;
};

export const QuickLinkFolderItem: FC<Props> = (props) => {
  const {
    name,
    inExpandedView,
    handleEditOpen,
    handleDeleteOpen,
    handleFolderSelect,
  } = useQuickLinkFolderItem(props);

  return (
    <Button
      component="div"
      size="sm"
      variant="transparent"
      w="100%"
      p="xs"
      radius="md"
      c={inExpandedView ? 'white' : 'neutral.9'}
      bg={inExpandedView ? rgba('black', 0.1) : 'neutral.0'}
      fw={400}
      leftSection={<FolderIcon color="var(--mantine-color-primary-3)" />}
      rightSection={
        <ProjectMenu
          openEditModal={handleEditOpen}
          openDeleteModal={handleDeleteOpen}
          position="left-start"
          small
        />
      }
      className={classNames(styles.quickLink, {
        [styles.quickLinkFolderExpandedView]: inExpandedView,
      })}
      classNames={{ label: styles.quickLinkLabel }}
      onClick={handleFolderSelect}
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
  const { id: projectId } = useParams();
  const [, { onFolderSelect }] = useFolders(projectId);

  const handleEditOpen = () => onEditOpen(item, 'folder');
  const handleDeleteOpen = () => onDeleteOpen(id, 'folder');

  const handleFolderSelect = () => onFolderSelect(item.id);

  return {
    name,
    inExpandedView,
    handleEditOpen,
    handleDeleteOpen,
    handleFolderSelect,
  };
}
