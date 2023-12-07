import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Card, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Directory, QuickLink } from '@prisma/client';
import classNames from 'classnames';
import { QuickLinksPopovers } from './quick-links-popovers';
import { QuickLinkItem } from './quick-link-item';
import { ConfirmDeleteModal } from '../modals/confirm-delete-modal';
import { QuickLinksFooter } from './quick-links-footer';
import { PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID } from '@/utils/constants';
import { QuickLinkFolderItem } from './quick-link-folder-item';
import { useQuickLinks as useQuickLinksHook } from '@/hooks/use-quick-links';
import { useFolders } from '@/hooks/use-folders';
import flexStyles from '@/styles/utils/flex.module.scss';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/quick-links.module.scss';

export type QuickLinkType = 'link' | 'folder';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const {
    quickLinks,
    folders,
    editLink,
    editFolder,
    popoverLinkOpen,
    setPopoverLinkOpen,
    popoverFolderOpen,
    setPopoverFolderOpen,
    expanded,
    setExpanded,
    onLinkSubmit,
    onFolderSubmit,
    handleEditOpen,
    handleEditClose,
    isDeleteOpen,
    handleOpenDelete,
    handleCloseDelete,
    deleteModalTitle,
    deleteModalOnSubmit,
  } = useQuickLinks(props);

  const renderFolder = (item: Directory) => (
    <QuickLinkFolderItem
      key={item.id}
      item={item}
      onEditOpen={handleEditOpen}
      onDeleteOpen={handleOpenDelete}
    />
  );

  const renderQuickLink = (item: QuickLink) => (
    <QuickLinkItem
      key={item.id}
      item={item}
      onEditOpen={handleEditOpen}
      onDeleteOpen={handleOpenDelete}
    />
  );

  return (
    <Box h="100%" className={overflowStyles['overflow-auto']}>
      <Card
        h="100%"
        pos="relative"
        radius={24}
        className={styles.quickLinksCard}
      >
        <Stack h="100%">
          <QuickLinksPopovers
            popoverLinkOpen={popoverLinkOpen}
            setPopoverLinkOpen={setPopoverLinkOpen}
            popoverFolderOpen={popoverFolderOpen}
            setPopoverFolderOpen={setPopoverFolderOpen}
            onEditClose={handleEditClose}
            onLinkSubmit={onLinkSubmit}
            onFolderSubmit={onFolderSubmit}
            quickLink={editLink ?? undefined}
            folder={editFolder ?? undefined}
          />
          <Stack
            className={classNames(
              flexStyles['flex-1'],
              overflowStyles['overflow-auto']
            )}
          >
            {folders.map(renderFolder)}
            {quickLinks.map(renderQuickLink)}
          </Stack>
          <QuickLinksFooter
            quickLinks={quickLinks}
            folders={folders}
            expanded={expanded}
            setExpanded={setExpanded}
            onDeleteOpen={handleOpenDelete}
            onEditOpen={handleEditOpen}
            setPopoverLinkOpen={setPopoverLinkOpen}
            setPopoverFolderOpen={setPopoverFolderOpen}
          />
        </Stack>
      </Card>
      <div id={PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID} />
      <ConfirmDeleteModal
        opened={isDeleteOpen}
        onClose={handleCloseDelete}
        onSubmit={deleteModalOnSubmit}
        title={deleteModalTitle}
      />
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');
  const [popoverLinkOpen, setPopoverLinkOpen] = useState(false);
  const [popoverFolderOpen, setPopoverFolderOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isDeleteOpen, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const [
    { quickLinks, editItem: editLink, deleteId: deleteLinkId },
    {
      setEditItem: setEditLink,
      setDeleteId: setDeleteLinkId,
      onDelete: onLinkDelete,
      onSubmit: onLinkSubmit,
    },
  ] = useQuickLinksHook(projectId, () => {
    setPopoverLinkOpen(false);
    closeDelete();
  });
  const [
    { folders, editItem: editFolder },
    {
      setEditItem: setEditFolder,
      setDeleteId: setDeleteFolderId,
      onDelete: onFolderDelete,
      onSubmit: onFolderSubmit,
    },
  ] = useFolders(projectId, () => {
    setPopoverFolderOpen(false);
    closeDelete();
  });

  const handleEditOpen = (item: QuickLink | Directory, type: QuickLinkType) => {
    if (type === 'link') {
      setEditLink(item as QuickLink);
      setPopoverLinkOpen(true);
    } else {
      setEditFolder(item as Directory);
      setPopoverFolderOpen(true);
    }
  };
  const handleEditClose = () => {
    setEditLink(null);
    setEditFolder(null);
    setPopoverLinkOpen(false);
    setPopoverFolderOpen(false);
  };

  const handleOpenDelete = (id: string, type: QuickLinkType) => {
    if (type === 'link') {
      setDeleteLinkId(id);
    } else {
      setDeleteFolderId(id);
    }
    openDelete();
  };
  const handleCloseDelete = () => {
    setDeleteLinkId(null);
    setDeleteFolderId(null);
    closeDelete();
  };
  const deleteModalTitle = deleteLinkId
    ? t('deleteLinkTitle')
    : t('deleteFolderTitle');
  const deleteModalOnSubmit = deleteLinkId ? onLinkDelete : onFolderDelete;

  return {
    quickLinks,
    folders,
    editLink,
    editFolder,
    popoverLinkOpen,
    setPopoverLinkOpen,
    popoverFolderOpen,
    setPopoverFolderOpen,
    expanded,
    setExpanded,
    onLinkSubmit,
    onFolderSubmit,
    handleEditOpen,
    handleEditClose,
    isDeleteOpen,
    handleOpenDelete,
    handleCloseDelete,
    deleteModalTitle,
    deleteModalOnSubmit,
  };
}