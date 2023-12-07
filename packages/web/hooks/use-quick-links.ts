import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QuickLink } from '@prisma/client';
import { useNotificationSuccess } from './use-notification-success';
import { Data } from '@/domain/remote/response/data';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { addQuickLinkMutation } from '@/domain/mutations/add-quick-link-mutation';
import { editQuickLinkMutation } from '@/domain/mutations/edit-quick-link-mutation';
import { deleteQuickLinkMutation } from '@/domain/mutations/delete-quick-link-mutation';
import { QuickLinkFormValues } from '@/app/_components/project/quick-link-popover-menu';

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
    setEditItem: Dispatch<SetStateAction<QuickLink | null>>;
    setDeleteId: Dispatch<SetStateAction<string | null>>;
  }
] => {
  const [editItem, setEditItem] = useState<QuickLink | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const onCreated = useNotificationSuccess('created');
  const onEdited = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const { data: quickLinks, refetch } = useQuery<
    Data<QuickLink[]>
  >({
    queryKey: quickLinksQuery.key(projectId),
  });
  const { mutateAsync: createQuickLink } = useMutation({
    mutationFn: addQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
      onSuccess();
    },
  });
  const { mutateAsync: editQuickLink } = useMutation({
    mutationFn: editQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdited();
      onSuccess();
    },
  });
  const { mutateAsync: deleteQuickLink } = useMutation({
    mutationFn: deleteQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDeleted();
      onSuccess();
    },
  });

  const handleSubmit = async (values: QuickLinkFormValues) => {
    if (editItem) {
      await editQuickLink({ ...values, id: editItem.id, projectId }).catch(
        () => null
      );
    } else {
      await createQuickLink({ ...values, projectId }).catch(() => null);
    }
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
      onDelete: handleDelete,
      setEditItem,
      setDeleteId,
    },
  ];
};