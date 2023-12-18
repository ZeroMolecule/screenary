import { ChangeEvent, FC } from 'react';
import { ActionIcon, Box, Card, Group, Textarea } from '@mantine/core';
import { IconCircleXFilled } from '@tabler/icons-react';
import { Note as NoteModel } from '@prisma/client';
import { Text } from '../../base/text';
import { formatDate } from '@/utils/datetime';
import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';
import styles from '@/styles/components/notes.module.scss';
import classNames from 'classnames';

type Props = {
  note: NoteModel;
  onEdit: (note: NoteModel) => Promise<void>;
  onOpenDelete: (id: string) => void;
  single?: boolean;
};

export const Note: FC<Props> = (props) => {
  const { t, note, onOpenDelete, handleChange, single } = useNote(props);

  if (!note) {
    return (
      <Card
        className={classNames(styles.note, styles.noteEmpty, styles.noteSingle)}
      >
        <Text ta="center" c="primary.9">
          {t('emptyShortText')}
        </Text>
      </Card>
    );
  }

  return (
    <Card className={classNames(styles.note, { [styles.noteSingle]: single })}>
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

function useNote({ note, onEdit, onOpenDelete, single }: Props) {
  const t = useTranslations('project.notes');

  const handleChange = debounce(async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const data: NoteModel = { ...note, content: e.target.value };
    await onEdit(data);
  }, 1000);

  return { t, note, onOpenDelete, handleChange, single };
}
