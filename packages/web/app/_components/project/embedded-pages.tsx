import { Dispatch, FC, SetStateAction, useState } from 'react';
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
    setEmbeddedPage,
    embeddedPages,
    popoverOpen,
    setPopoverOpen,
    handleSubmit,
  } = useEmbeddedPages(props);

  const renderEmbeddedPage = (item: EmbeddedPage) => (
    <EmbeddedPageItem
      key={item.id}
      item={item}
      setEmbeddedPage={setEmbeddedPage}
    />
  );

  return (
    <Card h="100%" pos="unset" radius={24} className={styles.card}>
      <Stack gap={20}>
        {embeddedPages.map(renderEmbeddedPage)}
        <Popover
          opened={popoverOpen}
          onChange={setPopoverOpen}
          radius={24}
          position="right-start"
        >
          <PopoverTarget>
            <EmbeddedPageCreate onOpen={() => setPopoverOpen(true)} />
          </PopoverTarget>
          <PopoverDropdown miw={324} p={0}>
            <EmbeddedPagePopover
              onClose={() => setPopoverOpen(false)}
              onSubmit={handleSubmit}
            />
          </PopoverDropdown>
        </Popover>
      </Stack>
    </Card>
  );
};

function useEmbeddedPages({ projectId, setEmbeddedPage }: Props) {
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
      setPopoverOpen(false);
    },
  });
  const { mutateAsync: editEmbeddedPage } = useMutation({
    mutationFn: editEmbeddedPageMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdited();
      setPopoverOpen(false);
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
    setEmbeddedPage,
    embeddedPages: embeddedPages?.data ?? [],
    popoverOpen,
    setPopoverOpen,
    handleSubmit,
  };
}
