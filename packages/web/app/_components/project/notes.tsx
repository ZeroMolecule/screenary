import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { ActionIcon, Box, Card, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowsMaximize, IconInbox, IconPlus } from '@tabler/icons-react';
import { Text } from '../base/text';
import { NotesExpanded } from './notes-expanded';
import { Note } from './note';
import styles from '@/styles/components/notes.module.scss';

export const Notes: FC = () => {
  const { t, isOpen, open, close } = useNotes();

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
          <Note note={{}} />
          <Group justify="flex-end">
            <ActionIcon variant="transparent" color="neutral.5" onClick={open}>
              <IconArrowsMaximize />
            </ActionIcon>
          </Group>
        </Stack>
        {isOpen && <NotesExpanded notes={[]} onClose={close} />}
      </Card>
    </Box>
  );
};

function useNotes() {
  const t = useTranslations('project.notes');
  const [isOpen, { open, close }] = useDisclosure(false);

  return { t, isOpen, open, close };
}
