import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, Card, Stack } from '@mantine/core';
import { QuickLinksPopovers } from './quick-links-popovers';
import { addQuickLinkMutation } from '@/domain/mutations/add-quick-link-mutation';
import { QuickLinkFormValues } from './quick-link-popover-menu';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { Data } from '@/domain/remote/response/data';
import { Directory, QuickLink } from '@prisma/client';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { QuickLinkItem } from './quick-link-item';
import { ConfirmDeleteModal } from '../modals/confirm-delete-modal';
import { useDisclosure } from '@mantine/hooks';
import { deleteQuickLinkMutation } from '@/domain/mutations/delete-quick-link-mutation';
import { editQuickLinkMutation } from '@/domain/mutations/edit-quick-link-mutation';
import { QuickLinksFooter } from './quick-links-footer';
import { PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID } from '@/utils/constants';
import classNames from 'classnames';
import flexStyles from '@/styles/utils/flex.module.scss';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/quick-links.module.scss';
import { foldersQuery } from '@/domain/queries/folders-query';
import { QuickLinkFolderItem } from './quick-link-folder-item';
import { deleteFolderMutation } from '@/domain/mutations/delete-folder-mutation';
import { addFolderMutation } from '@/domain/mutations/add-folder-mutation';
import { editFolderMutation } from '@/domain/mutations/edit-folder-mutation';
import { FolderFormValues } from './quick-link-folder-popover-menu';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const {
    t,
    quickLinks,
    folders,
    popoverLinkOpen,
    setPopoverLinkOpen,
    popoverFolderOpen,
    setPopoverFolderOpen,
    expanded,
    setExpanded,
    editLink,
    handleLinkOpenEdit,
    handleLinkCloseEdit,
    editFolder,
    handleFolderOpenEdit,
    handleFolderCloseEdit,
    isLinkDeleteOpen,
    handleLinkOpenDelete,
    handleLinkCloseDelete,
    handleLinkSubmit,
    handleLinkDelete,
    isFolderDeleteOpen,
    handleFolderOpenDelete,
    handleFolderCloseDelete,
    handleFolderSubmit,
    handleFolderDelete,
  } = useQuickLinks(props);

  const renderFolder = (item: Directory) => (
    <QuickLinkFolderItem
      key={item.id}
      item={item}
      onEditOpen={handleFolderOpenEdit}
      onDeleteOpen={handleFolderOpenDelete}
    />
  );

  const renderQuickLink = (item: QuickLink) => (
    <QuickLinkItem
      key={item.id}
      item={item}
      onEditOpen={handleLinkOpenEdit}
      onDeleteOpen={handleLinkOpenDelete}
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
            onLinkClose={handleLinkCloseEdit}
            onLinkSubmit={handleLinkSubmit}
            onFolderClose={handleFolderCloseEdit}
            onFolderSubmit={handleFolderSubmit}
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
            setPopoverLinkOpen={setPopoverLinkOpen}
            setPopoverFolderOpen={setPopoverFolderOpen}
            onLinkEditOpen={handleLinkOpenEdit}
            onLinkDeleteOpen={handleLinkOpenDelete}
            onFolderEditOpen={handleFolderOpenEdit}
            onFolderDeleteOpen={handleFolderOpenDelete}
          />
        </Stack>
      </Card>
      <div id={PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID} />
      <ConfirmDeleteModal
        opened={isLinkDeleteOpen}
        onClose={handleLinkCloseDelete}
        onSubmit={handleLinkDelete}
        title={t('deleteLinkTitle')}
      />
      <ConfirmDeleteModal
        opened={isFolderDeleteOpen}
        onClose={handleFolderCloseDelete}
        onSubmit={handleFolderDelete}
        title={t('deleteFolderTitle')}
      />
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');
  const [editLink, setEditLink] = useState<QuickLink | null>(null);
  const [deleteLinkId, setDeleteLinkId] = useState<string | null>(null);
  const [popoverLinkOpen, setPopoverLinkOpen] = useState(false);
  const [editFolder, setEditFolder] = useState<Directory | null>(null);
  const [deleteFolderId, setDeleteFolderId] = useState<string | null>(null);
  const [popoverFolderOpen, setPopoverFolderOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isLinkDeleteOpen, { open: openLinkDelete, close: closeLinkDelete }] =
    useDisclosure(false);
  const [
    isFolderDeleteOpen,
    { open: openFolderDelete, close: closeFolderDelete },
  ] = useDisclosure(false);

  const onCreated = useNotificationSuccess('created');
  const onEdited = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const { data: quickLinks, refetch: refetchQuickLinks } = useQuery<
    Data<QuickLink[]>
  >({
    queryKey: quickLinksQuery.key(projectId),
  });
  const { mutateAsync: createQuickLink } = useMutation({
    mutationFn: addQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetchQuickLinks();
      onCreated();
      setPopoverLinkOpen(false);
    },
  });
  const { mutateAsync: editQuickLink } = useMutation({
    mutationFn: editQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetchQuickLinks();
      onEdited();
      setPopoverLinkOpen(false);
    },
  });
  const { mutateAsync: deleteQuickLink } = useMutation({
    mutationFn: deleteQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetchQuickLinks();
      onDeleted();
      handleLinkCloseDelete();
    },
  });

  const { data: folders, refetch: refetchFolders } = useQuery<
    Data<Directory[]>
  >({
    queryKey: foldersQuery.key(projectId),
  });
  const { mutateAsync: createFolder } = useMutation({
    mutationFn: addFolderMutation.fnc,
    onSuccess: async () => {
      await refetchFolders();
      onCreated();
      setPopoverFolderOpen(false);
    },
  });
  const { mutateAsync: editFolderItem } = useMutation({
    mutationFn: editFolderMutation.fnc,
    onSuccess: async () => {
      await refetchFolders();
      onEdited();
      setPopoverFolderOpen(false);
    },
  });
  const { mutateAsync: deleteFolder } = useMutation({
    mutationFn: deleteFolderMutation.fnc,
    onSuccess: async () => {
      await refetchFolders();
      onDeleted();
      handleFolderCloseDelete();
    },
  });

  const handleLinkOpenEdit = (link: QuickLink) => {
    setEditLink(link);
    setPopoverLinkOpen(true);
  };
  const handleLinkCloseEdit = () => {
    setEditLink(null);
    setPopoverLinkOpen(false);
  };

  const handleFolderOpenEdit = (folder: Directory) => {
    setEditFolder(folder);
    setPopoverFolderOpen(true);
  };
  const handleFolderCloseEdit = () => {
    setEditFolder(null);
    setPopoverFolderOpen(false);
  };

  const handleLinkOpenDelete = (id: string) => {
    setDeleteLinkId(id);
    openLinkDelete();
  };
  const handleLinkCloseDelete = () => {
    setDeleteLinkId(null);
    closeLinkDelete();
  };

  const handleFolderOpenDelete = (id: string) => {
    setDeleteFolderId(id);
    openFolderDelete();
  };
  const handleFolderCloseDelete = () => {
    setDeleteFolderId(null);
    closeFolderDelete();
  };

  const handleLinkSubmit = async (values: QuickLinkFormValues) => {
    if (editLink) {
      await editQuickLink({ ...values, id: editLink.id, projectId }).catch(
        () => null
      );
    } else {
      await createQuickLink({ ...values, projectId }).catch(() => null);
    }
  };
  const handleLinkDelete = async () => {
    if (deleteLinkId) {
      await deleteQuickLink({ id: deleteLinkId, projectId }).catch(() => null);
    }
  };

  const handleFolderSubmit = async (values: FolderFormValues) => {
    if (editFolder) {
      await editFolderItem({ ...values, id: editFolder.id, projectId }).catch(
        () => null
      );
    } else {
      await createFolder({ ...values, projectId }).catch(() => null);
    }
  };
  const handleFolderDelete = async () => {
    if (deleteFolderId) {
      await deleteFolder({ id: deleteFolderId, projectId }).catch(() => null);
    }
  };

  return {
    t,
    quickLinks: quickLinks?.data ?? [],
    folders: folders?.data ?? [],
    popoverLinkOpen,
    setPopoverLinkOpen,
    popoverFolderOpen,
    setPopoverFolderOpen,
    expanded,
    setExpanded,
    editLink,
    handleLinkOpenEdit,
    handleLinkCloseEdit,
    editFolder,
    handleFolderOpenEdit,
    handleFolderCloseEdit,
    isLinkDeleteOpen,
    handleLinkOpenDelete,
    handleLinkCloseDelete,
    handleLinkSubmit,
    handleLinkDelete,
    isFolderDeleteOpen,
    handleFolderOpenDelete,
    handleFolderCloseDelete,
    handleFolderSubmit,
    handleFolderDelete,
  };
}
