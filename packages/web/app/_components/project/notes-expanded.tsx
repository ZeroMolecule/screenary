import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { ActionIcon, Button, Card, Group } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';
import { Title } from '../base/title';
import { Note } from './note';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  notes: any[];
  onClose: () => void;
};

export const NotesExpanded: FC<Props> = ({ notes, onClose }) => {
  const { t } = useNotesExpanded();

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
      <div className={styles.notesGrid}>
        <Note note={{}} />
        <Note note={{}} />
        <Note note={{}} />
        <Note note={{}} />
        <Note note={{}} />
        <Note note={{}} />
        <Note note={{}} />
      </div>
      <Button
        variant="transparent"
        size="xs"
        color="white"
        fw={400}
        mr="auto"
        mt="auto"
        left={-12}
        leftSection={<IconPlus size={16} />}
      >
        {t('addAction')}
      </Button>
    </Card>
  );
};

function useNotesExpanded() {
  const t = useTranslations('project.notes');

  return { t };
}
