import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActionIcon, Box, Card, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowsMaximize, IconInbox, IconPlus } from '@tabler/icons-react';
import { Text } from '../base/text';
import { NotesExpanded } from './notes-expanded';
import { Note } from './note';
import { notesQuery } from '@/domain/queries/notes-query';
import { deleteNoteMutation } from '@/domain/mutations/delete-note-mutation';
import { ConfirmDeleteModal } from '../modals/confirm-delete-modal';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { addNoteMutation } from '@/domain/mutations/add-note-mutation';
import { orderBy } from 'lodash';
import { editNoteMutation } from '@/domain/mutations/edit-note-mutation';
import { Note as NoteModel } from '@prisma/client';
import { Data } from '@/domain/remote/response/data';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  projectId: string;
};

export const Notes: FC<Props> = (props) => {
  const {
    t,
    notes,
    isExpanded,
    expand,
    fold,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useNotes(props);

  return (
    <Box h="100%" pos="relative">
      <Card radius={24} pos="unset" className={styles.notesCard}>
        <Stack>
          <Group justify="space-between">
            <Group gap="xs">
              <IconInbox size={24} color="var(--mantine-color-primary-8)" />
              <Text size="lg" fw={600}>
                {t('title')}
              </Text>
            </Group>
            <ActionIcon
              variant="transparent"
              color="var(--mantine-color-neutral-9)"
              onClick={handleCreate}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
          <Note
            note={notes[0]}
            onOpenDelete={handleOpenModal}
            onEdit={handleEdit}
            single
          />
          <Group justify="flex-end">
            <ActionIcon
              variant="transparent"
              color="neutral.5"
              onClick={expand}
            >
              <IconArrowsMaximize />
            </ActionIcon>
          </Group>
        </Stack>
        {isExpanded && (
          <NotesExpanded
            notes={notes}
            onClose={fold}
            onOpenDelete={handleOpenModal}
            onCreate={handleCreate}
            onEdit={handleEdit}
          />
        )}
      </Card>
      <ConfirmDeleteModal
        title={t('deleteTitle')}
        opened={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleDelete}
      />
    </Box>
  );
};

function useNotes({ projectId }: Props) {
  const t = useTranslations('project.notes');
  const qc = useQueryClient();
  const [noteId, setNotedId] = useState<string | null>(null);
  const [isExpanded, { open: expand, close: fold }] = useDisclosure(false);
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const onCreated = useNotificationSuccess('created');
  const onDelete = useNotificationSuccess('deleted');

  const { data: notes, refetch } = useQuery<Data<NoteModel[]>>({
    queryKey: notesQuery.key(projectId),
  });
  const { mutateAsync: createNote } = useMutation({
    mutationFn: addNoteMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
    },
  });
  const { mutateAsync: editNote } = useMutation({
    mutationFn: editNoteMutation.fnc,
    onSuccess: (data) => {
      qc.setQueryData(
        notesQuery.key(projectId),
        (currData: Data<NoteModel[]>) => {
          const notes =
            currData?.data?.map((note) =>
              note.id === data.id ? data : note
            ) ?? [];
          return {
            ...currData,
            data: notes,
          };
        }
      );
    },
  });
  const { mutateAsync: deleteNote } = useMutation({
    mutationFn: deleteNoteMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDelete();
      handleCloseModal();
    },
  });

  const handleOpenModal = (id: string) => {
    setNotedId(id);
    openModal();
  };

  const handleCloseModal = () => {
    setNotedId(null);
    closeModal();
  };

  const handleCreate = async () => {
    await createNote({ projectId }).catch(() => null);
  };

  const handleEdit = async ({ userId, ...note }: NoteModel) => {
    await editNote(note).catch(() => null);
  };

  const handleDelete = async () => {
    if (noteId) {
      await deleteNote({ id: noteId, projectId }).catch(() => null);
    }
  };

  return {
    t,
    notes: orderBy(notes?.data, 'createdAt', 'desc') ?? [],
    isExpanded,
    expand,
    fold,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleCreate,
    handleEdit,
    handleDelete,
  };
}
