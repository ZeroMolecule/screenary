import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Group, Stack } from '@mantine/core';
import { TaskStatus } from '@prisma/client';
import { TasksHeader } from '../../tasks/tasks-header';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { Text } from '../../base/text';
import { useTasks as useTasksHook } from '@/hooks/use-tasks';
import { TasksList } from '../../tasks/tasks-list';
import { TasksEmptyPlaceholder } from '../../tasks/tasks-empty-placeholder';
import { HideCompletedTasksButton } from '../../tasks/hide-completed-tasks-button';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  projectId: string;
};

export const Tasks: FC<Props> = (props) => {
  const {
    t,
    popoverOpen,
    results,
    hideCompleted,
    handleHideCompleted,
    setPopoverOpen,
    onCreate,
    onEdit,
    onDelete,
    onReorder,
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
      <Stack gap="xs">
        <HideCompletedTasksButton
          isHidden={hideCompleted}
          onClick={handleHideCompleted}
        />
        {results.length ? (
          <TasksList
            tasks={results}
            onEdit={onEdit}
            onDelete={onDelete}
            onReorder={onReorder}
          />
        ) : (
          <TasksEmptyPlaceholder />
        )}
      </Stack>
    </Card>
  );
};

function useTasks({ projectId }: Props) {
  const t = useTranslations('project.tasks');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [{ results }, { onCreate, onEdit, onDelete, onReorder }] = useTasksHook(
    projectId,
    { includeAllResults: true, onCreateSuccess: () => setPopoverOpen(false) }
  );

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  return {
    t,
    popoverOpen,
    results: hideCompleted
      ? results.filter(({ status }) => status === TaskStatus.TODO)
      : results,
    hideCompleted,
    handleHideCompleted,
    setPopoverOpen,
    onCreate,
    onEdit,
    onDelete,
    onReorder,
  };
}
