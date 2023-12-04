'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card, Group, Stack } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { useTasks } from '@/hooks/use-tasks';
import { ProjectsTabs } from '../projects-tabs';
import { TasksHeader } from './tasks-header';
import { TasksWrapper } from './tasks-wrapper';
import { Title } from '../base/title';
import styles from '@/styles/components/tasks.module.scss';

export const TasksPage: FC = () => {
  const {
    t,
    projectId,
    projectName,
    tabs,
    todos,
    done,
    hideCompleted,
    popoverOpen,
    setPopoverOpen,
    handleHideCompleted,
    handleChange,
    onCreate,
    onEdit,
    onDelete,
  } = useTasksPage();

  const headerTitle = (
    <Title order={3} fw={600}>
      {projectName}
    </Title>
  );

  return (
    <Stack h="100%" gap={8}>
      <Group justify="space-between">
        <ProjectsTabs
          defaultTab={projectId}
          tabs={tabs}
          onChange={handleChange}
        />
        <Button
          size="sm"
          variant="subtle"
          bg="white"
          c="neutral.7"
          radius={6}
          leftSection={
            hideCompleted ? <IconEye size={20} /> : <IconEyeOff size={20} />
          }
          className={styles.hideButton}
          onClick={handleHideCompleted}
        >
          {hideCompleted ? t('showAction') : t('hideAction')}
        </Button>
      </Group>
      <Card h="100%" radius={24} className={styles.tasks}>
        <TasksHeader
          title={headerTitle}
          onCreate={onCreate}
          isPopoverOpen={popoverOpen}
          onPopoverChange={setPopoverOpen}
        />
        <TasksWrapper
          todos={todos}
          done={done}
          onEdit={onEdit}
          onDelete={onDelete}
          hideCompleted={hideCompleted}
        />
      </Card>
    </Stack>
  );
};

function useTasksPage() {
  const t = useTranslations('tasks');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { selectedProject, tabs, handleChange } = useProjectsTabs();
  const { id: projectId, name: projectName } = selectedProject ?? {};
  const [{ todos, done }, { onCreate, onEdit, onDelete }] = useTasks(
    projectId!,
    () => setPopoverOpen(false)
  );

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  return {
    t,
    projectId,
    projectName,
    tabs,
    todos,
    done,
    hideCompleted,
    popoverOpen,
    setPopoverOpen,
    handleHideCompleted,
    handleChange,
    onCreate,
    onEdit,
    onDelete,
  };
}
