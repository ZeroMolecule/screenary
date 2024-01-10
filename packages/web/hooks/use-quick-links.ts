import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QuickLink } from '@prisma/client';
import { Data } from '@/domain/remote/response/data';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { addQuickLinkMutation } from '@/domain/mutations/add-quick-link-mutation';
import { editQuickLinkMutation } from '@/domain/mutations/edit-quick-link-mutation';
import { deleteQuickLinkMutation } from '@/domain/mutations/delete-quick-link-mutation';
import { QuickLinkFormValues } from '@/app/_components/project/quick-links/quick-link-popover-menu';
import { useFolders } from './use-folders';
import { refreshQuickLinkMutation } from '@/domain/mutations/refresh-quick-link-mutation';
import { reorderQuickLinksMutation } from '@/domain/mutations/reorder-quick-links-mutation';
import { ReorderData } from '@/domain/types/reorder-data';

export const useQuickLinks = (
  projectId: string,
  onSuccess: () => void
): [
  {
    quickLinks: QuickLink[];
    editItem: QuickLink | null;
    deleteId: string | null;
  },
  {
    onSubmit: (values: QuickLinkFormValues) => Promise<void>;
    onDelete: () => Promise<void>;
    onRefresh: (id: string) => void;
    onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
    setEditItem: Dispatch<SetStateAction<QuickLink | null>>;
    setDeleteId: Dispatch<SetStateAction<string | null>>;
  }
] => {
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
  const handleRefresh = (id: string) => {
    refreshQuickLink({ id, projectId });
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
  ];
};
