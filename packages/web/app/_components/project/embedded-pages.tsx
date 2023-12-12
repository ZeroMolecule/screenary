import { FC, useState } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
} from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { embeddedPagesQuery } from '@/domain/queries/embedded-pages-query';
import { Data } from '@/domain/remote/response/data';
import { EmbeddedPage } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';
import {
  EmbeddedPageFormValues,
  EmbeddedPagePopover,
} from './embedded-page-popover';
import { addEmbeddedPageMutation } from '@/domain/mutations/add-embedded-page-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { editEmbeddedPageMutation } from '@/domain/mutations/edit-embedded-page-mutation';
import { deleteEmbeddedPageMutation } from '@/domain/mutations/delete-embedded-page-mutation';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  projectId: string;
};

export const EmbeddedPages: FC<Props> = (props) => {
  const {
    embeddedPages,
    editItem,
    setEditItem,
    popoverOpen,
    setPopoverOpen,
    handleSubmit,
    handleDelete,
  } = useEmbeddedPages(props);

  const renderEmbeddedPage = (item: EmbeddedPage) => (
    <Group key={item.id} wrap="nowrap">
      <Button
        onClick={() => {
          setEditItem(item);
          setPopoverOpen(true);
        }}
      >
        {item.url}
      </Button>
      <ActionIcon onClick={() => handleDelete(item.id)}>
        <IconTrash />
      </ActionIcon>
    </Group>
  );

  return (
    <Card h="100%" pos="relative" radius={24} className={styles.card}>
      <Stack>
        {embeddedPages.map(renderEmbeddedPage)}
        <Popover
          opened={popoverOpen}
          onChange={setPopoverOpen}
          onClose={() => setEditItem(null)}
          radius={24}
          withinPortal={false}
        >
          <PopoverTarget>
            <Button variant="outline" onClick={() => setPopoverOpen(true)}>
              Add New
            </Button>
          </PopoverTarget>
          <PopoverDropdown w="100%" pos="absolute">
            <EmbeddedPagePopover
              onClose={() => {
                setEditItem(null);
                setPopoverOpen(true);
              }}
              onSubmit={handleSubmit}
              item={editItem ?? undefined}
            />
          </PopoverDropdown>
        </Popover>
      </Stack>
    </Card>
  );
};

function useEmbeddedPages({ projectId }: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [editItem, setEditItem] = useState<EmbeddedPage | null>(null);
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
    },
  });
  const { mutateAsync: editEmbeddedPage } = useMutation({
    mutationFn: editEmbeddedPageMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdited();
    },
  });
  const { mutateAsync: deleteEmbeddedPage } = useMutation({
    mutationFn: deleteEmbeddedPageMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDeleted();
    },
  });

  const handleSubmit = async (values: EmbeddedPageFormValues) => {
    if (editItem) {
      await editEmbeddedPage({ ...values, id: editItem.id, projectId }).catch(
        () => null
      );
    } else {
      await createEmbeddedPage({ ...values, projectId }).catch(() => null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteEmbeddedPage({ id, projectId }).catch(() => null);
  };

  return {
    embeddedPages: embeddedPages?.data ?? [],
    editItem,
    setEditItem,
    popoverOpen,
    setPopoverOpen,
    handleSubmit,
    handleDelete,
  };
}
