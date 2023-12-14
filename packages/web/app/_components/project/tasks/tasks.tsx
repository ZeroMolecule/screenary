import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Group } from '@mantine/core';
import { TasksHeader } from '../../tasks/tasks-header';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { Text } from '../../base/text';
import { useTasks as useTasksHook } from '@/hooks/use-tasks';
import { TasksList } from '../../tasks/tasks-list';
import { TasksEmptyPlaceholder } from '../../tasks/tasks-empty-placeholder';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  projectId: string;
};

export const Tasks: FC<Props> = (props) => {
  const {
    t,
    popoverOpen,
    results,
    setPopoverOpen,
    onCreate,
    onEdit,
    onDelete,
  } = useTasks(props);

  const headerTitle = (
    <Group gap="xs">
      <IconCircleCheckFilled
        style={{ color: 'var(--mantine-color-primary-8)' }}
      />
      <Text size="lg" fw={600}>
        {t('title')}
      </Text>
    </Group>
  );

  return (
    <Card h="100%" radius={24} className={styles.tasks}>
      <TasksHeader
        title={headerTitle}
        onCreate={onCreate}
        isPopoverOpen={popoverOpen}
        onPopoverChange={setPopoverOpen}
      />
      {results.length ? (
        <TasksList tasks={results} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <TasksEmptyPlaceholder />
      )}
    </Card>
  );
};

function useTasks({ projectId }: Props) {
  const t = useTranslations('project.tasks');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [{ results }, { onCreate, onEdit, onDelete }] = useTasksHook(
    projectId,
    () => setPopoverOpen(false)
  );

  return {
    t,
    popoverOpen,
    results,
    setPopoverOpen,
    onCreate,
    onEdit,
    onDelete,
  };
}
