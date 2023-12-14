import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Card,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
} from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { embeddedPagesQuery } from '@/domain/queries/embedded-pages-query';
import { Data } from '@/domain/remote/response/data';
import { EmbeddedPage } from '@prisma/client';
import {
  EmbeddedPageFormValues,
  EmbeddedPagePopover,
} from './embedded-page-popover';
import { addEmbeddedPageMutation } from '@/domain/mutations/add-embedded-page-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { editEmbeddedPageMutation } from '@/domain/mutations/edit-embedded-page-mutation';
import { deleteEmbeddedPageMutation } from '@/domain/mutations/delete-embedded-page-mutation';
import { EmbeddedPageItem } from './embedded-page-item';
import { EmbeddedPageCreate } from './embedded-page-create';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  projectId: string;
  setEmbeddedPage: Dispatch<SetStateAction<EmbeddedPage | null>>;
};

export const EmbeddedPages: FC<Props> = (props) => {
  const {
    t,
    setEmbeddedPage,
    embeddedPages,
    popoverOpenCreate,
    setPopoverOpenCreate,
    popoverOpenEdit,
    setPopoverOpenEdit,
    deleteOpen,
    setDeleteOpen,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useEmbeddedPages(props);

  const renderEmbeddedPage = (item: EmbeddedPage) => (
    <EmbeddedPageItem
      key={item.id}
      item={item}
      popoverOpen={popoverOpenEdit[item.id] || false}
      setPopoverOpen={setPopoverOpenEdit}
      setEmbeddedPage={setEmbeddedPage}
      deleteOpen={deleteOpen[item.id] || false}
      setDeleteOpen={setDeleteOpen}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );

  return (
    <Card h="100%" pos="unset" radius={24} className={styles.card}>
      <Stack gap={20}>
        {embeddedPages.map(renderEmbeddedPage)}
        <Popover
          opened={popoverOpenCreate}
          onChange={setPopoverOpenCreate}
          radius={24}
          position="right-start"
        >
          <PopoverTarget>
            <EmbeddedPageCreate onOpen={() => setPopoverOpenCreate(true)} />
          </PopoverTarget>
          <PopoverDropdown miw={324} p={0}>
            <EmbeddedPagePopover
              title={t('form.createTitle')}
              onClose={() => setPopoverOpenCreate(false)}
              onSubmit={handleCreate}
            />
          </PopoverDropdown>
        </Popover>
      </Stack>
    </Card>
  );
};

function useEmbeddedPages({ projectId, setEmbeddedPage }: Props) {
  const t = useTranslations('project.embeddedPages');
  const [popoverOpenCreate, setPopoverOpenCreate] = useState(false);
  const [popoverOpenEdit, setPopoverOpenEdit] = useState<{
    [key: string]: boolean;
  }>({});
  const [deleteOpen, setDeleteOpen] = useState<{
    [key: string]: boolean;
  }>({});

  const onCreated = useNotificationSuccess('created');
  const onEdited = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const { data: embeddedPages, refetch } = useQuery<Data<EmbeddedPage[]>>({
    queryKey: embeddedPagesQuery.key(projectId),
  });
  const { mutateAsync: createEmbeddedPage } = useMutation({
    mutationFn: addEmbeddedPageMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
      setPopoverOpenCreate(false);
    },
  });
  const { mutateAsync: editEmbeddedPage } = useMutation({
    mutationFn: editEmbeddedPageMutation.fnc,
    onSuccess: async (data) => {
      await refetch();
      onEdited();
      setPopoverOpenEdit({});
      setEmbeddedPage((prev) => (prev?.id === data.id ? data : prev));
    },
  });
  const { mutateAsync: deleteEmbeddedPage } = useMutation({
    mutationFn: deleteEmbeddedPageMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDeleted();
      setDeleteOpen({});
    },
  });

  const handleCreate = async (values: EmbeddedPageFormValues) => {
    await createEmbeddedPage({ ...values, projectId }).catch(() => null);
  };
  const handleEdit = async ({ id, projectId, url }: EmbeddedPage) => {
    await editEmbeddedPage({ id, projectId, url }).catch(() => null);
  };
  const handleDelete = async (id: string) => {
    await deleteEmbeddedPage({ id, projectId }).catch(() => null);
  };

  return {
    t,
    setEmbeddedPage,
    embeddedPages: embeddedPages?.data ?? [],
    popoverOpenCreate,
    setPopoverOpenCreate,
    popoverOpenEdit,
    setPopoverOpenEdit,
    deleteOpen,
    setDeleteOpen,
    handleCreate,
    handleEdit,
    handleDelete,
  };
}
