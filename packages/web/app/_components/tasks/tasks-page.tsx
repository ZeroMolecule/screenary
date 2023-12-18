'use client';

import { FC, useState } from 'react';
import { Card, Group, Stack } from '@mantine/core';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { useTasks } from '@/hooks/use-tasks';
import { ProjectsTabs } from '../projects-tabs';
import { TasksHeader } from './tasks-header';
import { TasksWrapper } from './tasks-wrapper';
import { Title } from '../base/title';
import styles from '@/styles/components/tasks.module.scss';

export const TasksPage: FC = () => {
  const {
    projectId,
    projectName,
    tabs,
    todos,
    done,
    popoverOpen,
    setPopoverOpen,
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
      <Group>
        <ProjectsTabs
          defaultTab={projectId}
          tabs={tabs}
          onChange={handleChange}
        />
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
        />
      </Card>
    </Stack>
  );
};

function useTasksPage() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { selectedProject, tabs, handleChange } = useProjectsTabs();
  const { id: projectId, name: projectName } = selectedProject ?? {};
  const [{ todos, done }, { onCreate, onEdit, onDelete }] = useTasks(
    projectId!,
    () => setPopoverOpen(false)
  );

  return {
    projectId,
    projectName,
    tabs,
    todos,
    done,
    popoverOpen,
    setPopoverOpen,
    handleChange,
    onCreate,
    onEdit,
    onDelete,
  };
}
