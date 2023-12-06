import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, Card, Stack } from '@mantine/core';
import { QuickLinksHeader } from './quick-links-header';
import { addQuickLinkMutation } from '@/domain/mutations/add-quick-link-mutation';
import { QuickLinkFormValues } from './quick-link-popover-menu';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { Data } from '@/domain/remote/response/data';
import { QuickLink } from '@prisma/client';
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

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const {
    t,
    quickLinks,
    popoverOpen,
    setPopoverOpen,
    expanded,
    setExpanded,
    editLink,
    handleOpenEdit,
    handleCloseEdit,
    isDeleteOpen,
    handleOpenDelete,
    handleCloseDelete,
    handleSubmit,
    handleDelete,
  } = useQuickLinks(props);

  const renderQuickLink = (item: QuickLink) => (
    <QuickLinkItem
      key={item.id}
      item={item}
      onEditOpen={handleOpenEdit}
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
          <QuickLinksHeader
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
            onClose={handleCloseEdit}
            onSubmit={handleSubmit}
            item={editLink ?? undefined}
          />
          <Stack
            className={classNames(
              flexStyles['flex-1'],
              overflowStyles['overflow-auto']
            )}
          >
            {quickLinks.map(renderQuickLink)}
          </Stack>
          <QuickLinksFooter
            items={quickLinks}
            expanded={expanded}
            setExpanded={setExpanded}
            setPopoverOpen={setPopoverOpen}
            onEditOpen={handleOpenEdit}
            onDeleteOpen={handleOpenDelete}
          />
        </Stack>
      </Card>
      <div id={PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID} />
      <ConfirmDeleteModal
        opened={isDeleteOpen}
        onClose={handleCloseDelete}
        onSubmit={handleDelete}
        title={t('deleteTitle')}
      />
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');
  const [editLink, setEditLink] = useState<QuickLink | null>(null);
  const [deleteLinkId, setDeleteLinkId] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isDeleteOpen, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const onCreated = useNotificationSuccess('created');
  const onEdited = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const { data: quickLinks, refetch } = useQuery<Data<QuickLink[]>>({
    queryKey: quickLinksQuery.key(projectId),
  });
  const { mutateAsync: createQuickLink } = useMutation({
    mutationFn: addQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
      setPopoverOpen(false);
    },
  });
  const { mutateAsync: editQuickLink } = useMutation({
    mutationFn: editQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdited();
      setPopoverOpen(false);
    },
  });
  const { mutateAsync: deleteQuickLink } = useMutation({
    mutationFn: deleteQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDeleted();
      handleCloseDelete();
    },
  });

  const handleOpenEdit = (link: QuickLink) => {
    setEditLink(link);
    setPopoverOpen(true);
  };
  const handleCloseEdit = () => {
    setEditLink(null);
    setPopoverOpen(false);
  };

  const handleOpenDelete = (id: string) => {
    setDeleteLinkId(id);
    openDelete();
  };
  const handleCloseDelete = () => {
    setDeleteLinkId(null);
    closeDelete();
  };

  const handleSubmit = async (values: QuickLinkFormValues) => {
    if (editLink) {
      await editQuickLink({ ...values, id: editLink.id, projectId }).catch(
        () => null
      );
    } else {
      await createQuickLink({ ...values, projectId }).catch(() => null);
    }
  };

  const handleDelete = async () => {
    if (deleteLinkId) {
      await deleteQuickLink({ id: deleteLinkId, projectId }).catch(() => null);
    }
  };

  return {
    t,
    quickLinks: quickLinks?.data ?? [],
    popoverOpen,
    setPopoverOpen,
    expanded,
    setExpanded,
    editLink,
    handleOpenEdit,
    handleCloseEdit,
    isDeleteOpen,
    handleOpenDelete,
    handleCloseDelete,
    handleSubmit,
    handleDelete,
  };
}
