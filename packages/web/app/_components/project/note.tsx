import { FC } from 'react';
import { ActionIcon, Box, Card, Group } from '@mantine/core';
import { IconCircleXFilled } from '@tabler/icons-react';
import { Text } from '../base/text';
import { formatDate } from '@/utils/datetime';
import { Note as NoteModel } from '@prisma/client';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  note: NoteModel;
};

export const Note: FC<Props> = ({ note }) => {
  return (
    <Card className={styles.note}>
      <Box className={styles.noteInner}>
        <Text c="primary.9">{note.content}</Text>
      </Box>
      <Group justify="space-between">
        <Text size="sm" ff="secondary" c="primary.5">
          {formatDate(note.updatedAt ?? note.createdAt, 'dateAndTime')}
        </Text>
        <ActionIcon
          variant="transparent"
          size="sm"
          color="var(--mantine-color-primary-9)"
        >
          <IconCircleXFilled size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
