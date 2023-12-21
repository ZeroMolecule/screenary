import { Dispatch, SetStateAction, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Directory } from '@prisma/client';
import { useNotificationSuccess } from './use-notification-success';
import { Data } from '@/domain/remote/response/data';
import { foldersQuery } from '@/domain/queries/folders-query';
import { addFolderMutation } from '@/domain/mutations/add-folder-mutation';
import { editFolderMutation } from '@/domain/mutations/edit-folder-mutation';
import { deleteFolderMutation } from '@/domain/mutations/delete-folder-mutation';
import { FolderFormValues } from '@/app/_components/project/quick-links/quick-link-folder-popover-menu';
import { usePathname, useRouter } from '@/navigation';
import { folderQuery } from '@/domain/queries/folder-query';

const FOLDER_TAB_PARAMS_KEY = 'folder';

export const useFolders = (
  projectId: string,
  onSuccess?: () => void
): [
  {
    folders: Directory[];
    editItem: Directory | null;
    deleteId: string | null;
    selectedFolderId: string | null;
    selectedFolder: Directory | null;
  },
  {
    onSubmit: (values: FolderFormValues) => Promise<void>;
    onDelete: () => Promise<void>;
    setEditItem: Dispatch<SetStateAction<Directory | null>>;
    setDeleteId: Dispatch<SetStateAction<string | null>>;
    onFolderSelect: (value: string | null) => void;
    onClearFolderParams: () => void;
  }
] => {
  const [editItem, setEditItem] = useState<Directory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const selectedFolderId = searchParams.get(FOLDER_TAB_PARAMS_KEY);

  const onCreated = useNotificationSuccess('created');
  const onEdited = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const { data: folders, refetch } = useQuery<Data<Directory[]>>({
    queryKey: foldersQuery.key(projectId, {
      parentId: selectedFolderId ?? 'null',
    }),
  });

  const { data: folder } = useQuery<Data<Directory>>({
    queryKey: folderQuery.key(selectedFolderId!, projectId),
    enabled: !!selectedFolderId,
  });
  const { mutateAsync: createFolder } = useMutation({
    mutationFn: addFolderMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
      onSuccess?.();
    },
  });
  const { mutateAsync: editFolder } = useMutation({
    mutationFn: editFolderMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdited();
      onSuccess?.();
    },
  });
  const { mutateAsync: deleteFolder } = useMutation({
    mutationFn: deleteFolderMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDeleted();
      onSuccess?.();
    },
  });

  const handleSubmit = async (values: FolderFormValues) => {
    const parentId = selectedFolderId ?? null;
    if (editItem) {
      await editFolder({
        ...values,
        id: editItem.id,
        projectId,
        parentId,
      }).catch(() => null);
    } else {
      await createFolder({ ...values, projectId, parentId }).catch(() => null);
    }
  };
  const handleDelete = async () => {
    if (deleteId) {
      await deleteFolder({ id: deleteId, projectId }).catch(() => null);
    }
  };

  const handleClearFolderParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(FOLDER_TAB_PARAMS_KEY);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFolderSelect = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && params.get(FOLDER_TAB_PARAMS_KEY) !== value) {
      params.set(FOLDER_TAB_PARAMS_KEY, value);
    } else {
      params.delete(FOLDER_TAB_PARAMS_KEY);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return [
    {
      folders: folders?.data ?? [],
      editItem,
      deleteId,
      selectedFolderId,
      selectedFolder: folder?.data ?? null,
    },
    {
      onSubmit: handleSubmit,
      onDelete: handleDelete,
      setEditItem,
      setDeleteId,
      onFolderSelect: handleFolderSelect,
      onClearFolderParams: handleClearFolderParams,
    },
  ];
};
