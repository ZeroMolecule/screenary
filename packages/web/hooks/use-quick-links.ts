import { QuickLinkFormValues } from '@/app/_components/project/quick-links/quick-link-popover-menu';
import { addQuickLinkMutation } from '@/domain/mutations/add-quick-link-mutation';
import { deleteQuickLinkMutation } from '@/domain/mutations/delete-quick-link-mutation';
import { editQuickLinkMutation } from '@/domain/mutations/edit-quick-link-mutation';
import { refreshQuickLinkMutation } from '@/domain/mutations/refresh-quick-link-mutation';
import { reorderQuickLinksMutation } from '@/domain/mutations/reorder-quick-links-mutation';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { Data } from '@/domain/remote/response/data';
import { RefreshQuickLinkData } from '@/domain/types/quick-link-data';
import { ReorderData } from '@/domain/types/reorder-data';
import { QuickLink } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFolders } from './use-folders';

export const useQuickLinks = (projectId: string, onSuccess: () => void) => {
  const [editItem, setEditItem] = useState<QuickLink | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [{ selectedFolderId }] = useFolders(projectId);

  const { data: quickLinks, refetch } = useQuery<Data<QuickLink[]>>({
    queryKey: quickLinksQuery.key(projectId, {
      directoryId: selectedFolderId ?? 'null',
    }),
  });
  const { mutateAsync: createQuickLink } = useMutation({
    mutationFn: addQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onSuccess();
    },
  });
  const { mutateAsync: editQuickLink } = useMutation({
    mutationFn: editQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onSuccess();
    },
  });
  const { mutateAsync: reorderQuickLinks } = useMutation({
    mutationFn: reorderQuickLinksMutation.fnc,
    onSuccess: async () => {
      await refetch();
    },
  });
  const { mutate: refreshQuickLink } = useMutation({
    mutationFn: refreshQuickLinkMutation.fnc,
    onSuccess: () => null,
  });
  const { mutateAsync: deleteQuickLink } = useMutation({
    mutationFn: deleteQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onSuccess();
    },
  });

  const handleSubmit = async (values: QuickLinkFormValues) => {
    const directoryId = selectedFolderId ?? null;
    if (editItem) {
      await editQuickLink({
        ...values,
        id: editItem.id,
        projectId,
        directoryId,
      }).catch(() => null);
    } else {
      await createQuickLink({ ...values, projectId, directoryId }).catch(
        () => null
      );
    }
  };
  const handleRefresh = (data: Omit<RefreshQuickLinkData, 'projectId'>) => {
    refreshQuickLink({ ...data, projectId });
  };
  const handleReorder = async ({ data }: Pick<ReorderData, 'data'>) => {
    await reorderQuickLinks({ projectId, data }).catch(() => null);
  };
  const handleDelete = async () => {
    if (deleteId) {
      await deleteQuickLink({ id: deleteId, projectId }).catch(() => null);
    }
  };

  return [
    { quickLinks: quickLinks?.data ?? [], editItem, deleteId },
    {
      onSubmit: handleSubmit,
      onRefresh: handleRefresh,
      onReorder: handleReorder,
      onDelete: handleDelete,
      setEditItem,
      setDeleteId,
    },
  ] as const;
};
