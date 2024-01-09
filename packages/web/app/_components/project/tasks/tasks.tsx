import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Group } from '@mantine/core';
import { TasksHeader } from '../../tasks/tasks-header';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { Text } from '../../base/text';
import { useTasks as useTasksHook } from '@/hooks/use-tasks';
import { TasksList } from '../../tasks/tasks-list';
import { TasksEmptyPlaceholder } from '../../tasks/tasks-empty-placeholder';
import { Task } from '@prisma/client';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  projectId: string;
};

export const Tasks: FC<Props> = (props) => {
  const {
    t,
    popoverOpen,
    results,
    selectedTask,
    onEdit,
    onDelete,
    onReorder,
    onSubmit,
    setPopoverOpen,
    handleTaskSelect,
    handlePopoverAfterClose,
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
        onSubmit={onSubmit}
        isPopoverOpen={popoverOpen}
        onPopoverChange={setPopoverOpen}
        task={selectedTask ?? undefined}
        popoverAfterClose={handlePopoverAfterClose}
      />
      {results.length ? (
        <TasksList
          tasks={results}
          onSelect={handleTaskSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onReorder={onReorder}
        />
      ) : (
        <TasksEmptyPlaceholder />
      )}
    </Card>
  );
};

function useTasks({ projectId }: Props) {
  const t = useTranslations('project.tasks');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [
    { results, selectedTask },
    { onSelectTask, onEdit, onDelete, onReorder, onSubmit },
  ] = useTasksHook(projectId, {
    onSubmitSuccess: () => {
      onSelectTask(null);
      setPopoverOpen(false);
    },
  });

  const handleTaskSelect = (task: Task) => {
    onSelectTask(task);
    setPopoverOpen(true);
  };

  const handlePopoverAfterClose = () => onSelectTask(null);

  return {
    t,
    popoverOpen,
    results,
    selectedTask,
    onEdit,
    onDelete,
    onReorder,
    onSubmit,
    setPopoverOpen,
    handleTaskSelect,
    handlePopoverAfterClose,
  };
}
