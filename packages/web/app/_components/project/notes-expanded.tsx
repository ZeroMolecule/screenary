import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { ActionIcon, Button, Card, Group } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';
import { Title } from '../base/title';
import { Note } from './note';
import { Note as NoteModel } from '@prisma/client';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  notes: NoteModel[];
  onClose: () => void;
  onOpenDelete: (id: string) => void;
  onCreate: () => Promise<void>;
  onEdit: (note: NoteModel) => Promise<void>;
};

export const NotesExpanded: FC<Props> = (props) => {
  const { t, notes, onClose, onOpenDelete, onCreate, onEdit } =
    useNotesExpanded(props);

  const renderNote = (note: NoteModel) => (
    <Note
      key={note.id}
      note={note}
      onOpenDelete={onOpenDelete}
      onEdit={onEdit}
    />
  );

  return (
    <Card className={styles.notesContainer}>
      <Group justify="space-between">
        <Title order={5} c="white" fw={700}>
          {t('title')}
        </Title>
        <ActionIcon variant="transparent" color="white" onClick={onClose}>
          <IconX />
        </ActionIcon>
      </Group>
      <div className={styles.notesGrid}>{notes.map(renderNote)}</div>
      <Button
        variant="transparent"
        size="xs"
        color="white"
        fw={400}
        mr="auto"
        mt="auto"
        left={-12}
        leftSection={<IconPlus size={16} />}
        onClick={onCreate}
      >
        {t('addAction')}
      </Button>
    </Card>
  );
};

function useNotesExpanded({
  notes,
  onClose,
  onOpenDelete,
  onCreate,
  onEdit,
}: Props) {
  const t = useTranslations('project.notes');

  return { t, notes, onClose, onOpenDelete, onCreate, onEdit };
}
