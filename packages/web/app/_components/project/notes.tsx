import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { ActionIcon, Box, Card, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowsMaximize, IconInbox, IconPlus } from '@tabler/icons-react';
import { Text } from '../base/text';
import { NotesExpanded } from './notes-expanded';
import { Note } from './note';
import { notesQuery } from '@/domain/queries/notes-query';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  projectId: string;
};

export const Notes: FC<Props> = (props) => {
  const { t, isOpen, open, close, notes } = useNotes(props);

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
            >
              <IconPlus />
            </ActionIcon>
          </Group>
          <Note note={notes[0]} />
          <Group justify="flex-end">
            <ActionIcon variant="transparent" color="neutral.5" onClick={open}>
              <IconArrowsMaximize />
            </ActionIcon>
          </Group>
        </Stack>
        {isOpen && <NotesExpanded notes={notes} onClose={close} />}
      </Card>
    </Box>
  );
};

function useNotes({ projectId }: Props) {
  const t = useTranslations('project.notes');
  const [isOpen, { open, close }] = useDisclosure(false);

  const { data: notes } = useQuery({
    queryKey: notesQuery.key(projectId),
    queryFn: () => notesQuery.fnc(projectId),
  });

  return {
    t,
    isOpen,
    open,
    close,
    notes: notes?.data ?? [],
  };
}
