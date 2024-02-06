import { addNoteMutation } from '@/domain/mutations/add-note-mutation';
import { deleteNoteMutation } from '@/domain/mutations/delete-note-mutation';
import { editNoteMutation } from '@/domain/mutations/edit-note-mutation';
import { notesQuery } from '@/domain/queries/notes-query';
import { Data } from '@/domain/remote/response/data';
import styles from '@/styles/components/notes.module.scss';
import { ActionIcon, Box, Card, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Note as NoteModel } from '@prisma/client';
import { IconInbox, IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Text } from '../../base/text';
import { ConfirmDeleteModal } from '../../modals/confirm-delete-modal';
import { Note } from './note';
import { NotesFooter } from './notes-footer';

type Props = {
  projectId: string;
};

export const Notes: FC<Props> = (props) => {
  const {
    t,
    notes,
    expanded,
    setExpanded,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useNotes(props);

  return (
    <Box>
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
          {expanded ? null : (
            <Note
              key={notes[0]?.id}
              note={notes[0]}
              onOpenDelete={handleOpenModal}
              onEdit={handleEdit}
              single
            />
          )}
          <NotesFooter
            notes={notes}
            expanded={expanded}
            setExpanded={setExpanded}
            onOpenDelete={handleOpenModal}
            onCreate={handleCreate}
            onEdit={handleEdit}
          />
        </Stack>
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
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const { data: notes, refetch } = useQuery<Data<NoteModel[]>>({
    queryKey: notesQuery.key(projectId),
  });
  const { mutateAsync: createNote } = useMutation({
    mutationFn: addNoteMutation.fnc,
    onSuccess: async () => {
      await refetch();
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

  const handleEdit = async ({ id, projectId, content }: NoteModel) => {
    await editNote({ id, projectId, content }).catch(() => null);
  };

  const handleDelete = async () => {
    if (noteId) {
      await deleteNote({ id: noteId, projectId }).catch(() => null);
    }
  };

  return {
    t,
    notes: notes?.data ?? [],
    expanded,
    setExpanded,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleCreate,
    handleEdit,
    handleDelete,
  };
}
