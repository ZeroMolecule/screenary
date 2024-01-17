import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Note as NoteModel } from '@prisma/client';
import { ExpandedPopover } from '../expanded-popover';
import { Text } from '../../base/text';
import { Note } from './note';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  notes: NoteModel[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onOpenDelete: (id: string) => void;
  onCreate: () => Promise<void>;
  onEdit: (note: NoteModel) => Promise<void>;
};

export const NotesFooter: FC<Props> = (props) => {
  const { t, notes, expanded, setExpanded, onOpenDelete, onCreate, onEdit } =
    useNotesFooter(props);

  const renderNote = (note: NoteModel) => (
    <Note
      key={note.id}
      note={note}
      onOpenDelete={onOpenDelete}
      onEdit={onEdit}
    />
  );

  return (
    <ExpandedPopover
      title={t('title')}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      {!notes.length ? (
        <Text mt="md" c="neutral.1" fw={500}>
          {t('emptyLongText')}
        </Text>
      ) : (
        <div className={styles.notesGrid}>{notes.map(renderNote)}</div>
      )}
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
    </ExpandedPopover>
  );
};

function useNotesFooter({
  notes,
  expanded,
  setExpanded,
  onOpenDelete,
  onCreate,
  onEdit,
}: Props) {
  const t = useTranslations('project.notes');

  return { t, notes, expanded, setExpanded, onOpenDelete, onCreate, onEdit };
}
