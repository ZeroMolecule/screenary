import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Box,
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
import { EmbeddedPageCreate } from './embedded-page-create';
import { useRouter } from '@/navigation';
import { paths } from '@/navigation/paths';
import { reorderEmbeddedPagesMutation } from '@/domain/mutations/reorder-embedded-pages-mutation';
import { ReorderData } from '@/domain/types/reorder-data';
import { ReorderList } from '../../reorder-list';
import { EmbeddedPageItem } from './embedded-page-item';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  projectId: string;
};

export const EmbeddedPages: FC<Props> = (props) => {
  const {
    t,
    embeddedPages,
    popoverOpenCreate,
    setPopoverOpenCreate,
    popoverOpenEdit,
    setPopoverOpenEdit,
    deleteOpen,
    setDeleteOpen,
    handleCreate,
    handleEdit,
    handleReorder,
    handleDelete,
  } = useEmbeddedPages(props);

  return (
    <Card h="100%" pos="unset" p={4} radius={24} className={styles.card}>
      <Box p="sm" className={overflowStyles['overflow-auto']}>
        <Stack gap={0} align="center">
          <ReorderList<EmbeddedPage>
            data={embeddedPages}
            droppableId="embedded-pages"
            onReorder={handleReorder}
            renderComponentItem={(item) => (
              <EmbeddedPageItem
                item={item}
                popoverOpen={popoverOpenEdit[item.id] || false}
                setPopoverOpen={setPopoverOpenEdit}
                deleteOpen={deleteOpen[item.id] || false}
                setDeleteOpen={setDeleteOpen}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
            itemWrapper={<Box mb={20} />}
          />
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
      </Box>
    </Card>
  );
};

function useEmbeddedPages({ projectId }: Props) {
  const t = useTranslations('project.embeddedPages');
  const { pageId } = useParams();
  const { replace } = useRouter();
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
    onSuccess: async () => {
      await refetch();
      onEdited();
      setPopoverOpenEdit({});
    },
  });
  const { mutateAsync: reorderEmbeddedPages } = useMutation({
    mutationFn: reorderEmbeddedPagesMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdited();
    },
  });
  const { mutateAsync: deleteEmbeddedPage } = useMutation({
    mutationFn: deleteEmbeddedPageMutation.fnc,
    onSuccess: async ({ id }) => {
      await refetch();
      onDeleted();
      setDeleteOpen({});
      if (pageId && pageId === id) {
        replace(paths.project(projectId));
      }
    },
  });

  const handleCreate = async (values: EmbeddedPageFormValues) => {
    await createEmbeddedPage({ ...values, projectId }).catch(() => null);
  };
  const handleEdit = async ({ id, projectId, url }: EmbeddedPage) => {
    await editEmbeddedPage({ id, projectId, url }).catch(() => null);
  };
  const handleReorder = async ({ data }: Pick<ReorderData, 'data'>) => {
    await reorderEmbeddedPages({ projectId, data }).catch(() => null);
  };
  const handleDelete = async (id: string) => {
    await deleteEmbeddedPage({ id, projectId }).catch(() => null);
  };

  return {
    t,
    embeddedPages: embeddedPages?.data ?? [],
    popoverOpenCreate,
    setPopoverOpenCreate,
    popoverOpenEdit,
    setPopoverOpenEdit,
    deleteOpen,
    setDeleteOpen,
    handleCreate,
    handleEdit,
    handleReorder,
    handleDelete,
  };
}
