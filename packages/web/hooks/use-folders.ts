import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Directory } from '@prisma/client';
import { useNotificationSuccess } from './use-notification-success';
import { Data } from '@/domain/remote/response/data';
import { foldersQuery } from '@/domain/queries/folders-query';
import { addFolderMutation } from '@/domain/mutations/add-folder-mutation';
import { editFolderMutation } from '@/domain/mutations/edit-folder-mutation';
import { deleteFolderMutation } from '@/domain/mutations/delete-folder-mutation';
import { FolderFormValues } from '@/app/_components/project/quick-link-folder-popover-menu';

export const useFolders = (
  projectId: string,
  onSuccess: () => void
): [
  { folders: Directory[]; editItem: Directory | null; deleteId: string | null },
  {
    onSubmit: (values: FolderFormValues) => Promise<void>;
    onDelete: () => Promise<void>;
    setEditItem: Dispatch<SetStateAction<Directory | null>>;
    setDeleteId: Dispatch<SetStateAction<string | null>>;
  }
] => {
  const [editItem, setEditItem] = useState<Directory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const onCreated = useNotificationSuccess('created');
  const onEdited = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const { data: folders, refetch } = useQuery<Data<Directory[]>>({
    queryKey: foldersQuery.key(projectId),
  });
  const { mutateAsync: createFolder } = useMutation({
    mutationFn: addFolderMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
      onSuccess();
    },
  });
  const { mutateAsync: editFolder } = useMutation({
    mutationFn: editFolderMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdited();
      onSuccess();
    },
  });
  const { mutateAsync: deleteFolder } = useMutation({
    mutationFn: deleteFolderMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDeleted();
      onSuccess();
    },
  });

  const handleSubmit = async (values: FolderFormValues) => {
    if (editItem) {
      await editFolder({ ...values, id: editItem.id, projectId }).catch(
        () => null
      );
    } else {
      await createFolder({ ...values, projectId }).catch(() => null);
    }
  };
  const handleDelete = async () => {
    if (deleteId) {
      await deleteFolder({ id: deleteId, projectId }).catch(() => null);
    }
  };

  return [
    { folders: folders?.data ?? [], editItem, deleteId },
    {
      onSubmit: handleSubmit,
      onDelete: handleDelete,
      setEditItem,
      setDeleteId,
    },
  ];
};
