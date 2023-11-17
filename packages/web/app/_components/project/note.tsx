import { ChangeEvent, FC } from 'react';
import { ActionIcon, Box, Card, Group, Textarea } from '@mantine/core';
import { IconCircleXFilled } from '@tabler/icons-react';
import { Note as NoteModel } from '@prisma/client';
import { Text } from '../base/text';
import { formatDate } from '@/utils/datetime';
import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  note: NoteModel;
  onEdit: (note: NoteModel) => Promise<void>;
  onOpenDelete: (id: string) => void;
};

export const Note: FC<Props> = (props) => {
  const { t, note, onOpenDelete, handleChange } = useNote(props);

  if (!note) {
    return (
      <Text ta="center" c="neutral.4">
        {t('emptyShortText')}
      </Text>
    );
  }

  return (
    <Card className={styles.note}>
      <Box className={styles.noteInner}>
        <Textarea defaultValue={note.content} onChange={handleChange} />
      </Box>
      <Group justify="space-between" px="md" pb="md">
        <Text size="sm" ff="secondary" c="primary.5">
          {formatDate(note.updatedAt ?? note.createdAt, 'dateAndTime')}
        </Text>
        <ActionIcon
          variant="transparent"
          size="sm"
          color="var(--mantine-color-primary-9)"
          onClick={() => onOpenDelete(note.id)}
        >
          <IconCircleXFilled size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

function useNote({ note, onEdit, onOpenDelete }: Props) {
  const t = useTranslations('project.notes');

  const handleChange = debounce(async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const data: NoteModel = { ...note, content: e.target.value };
    await onEdit(data);
  }, 1000);

  return { t, note, onOpenDelete, handleChange };
}
