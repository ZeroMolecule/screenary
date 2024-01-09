'use client';

import { FC, useState } from 'react';
import { Card, Group, Stack } from '@mantine/core';
import { Task } from '@prisma/client';
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
    selectedTask,
    popoverOpen,
    handlePopoverChange,
    handleChange,
    onEdit,
    onDelete,
    onReorder,
    onSubmit,
    handleTaskSelect,
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
          onSubmit={onSubmit}
          isPopoverOpen={popoverOpen}
          onPopoverChange={handlePopoverChange}
          task={selectedTask ?? undefined}
        />
        <TasksWrapper
          todos={todos}
          done={done}
          onSelect={handleTaskSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onReorder={onReorder}
        />
      </Card>
    </Stack>
  );
};

function useTasksPage() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { selectedProject, tabs, handleChange } = useProjectsTabs();
  const { id: projectId, name: projectName } = selectedProject ?? {};
  const [
    { todos, done, selectedTask },
    { onSelectTask, onEdit, onDelete, onReorder, onSubmit },
  ] = useTasks(projectId!, {
    onSubmitSuccess: () => {
      onSelectTask(null);
      setPopoverOpen(false);
    },
  });

  const handleTaskSelect = (task: Task) => {
    onSelectTask(task);
    setPopoverOpen(true);
  };

  const handlePopoverChange = (value: boolean) => {
    if (!value) {
      setTimeout(() => {
        onSelectTask(null);
      }, 200);
    }
    setPopoverOpen(value);
  };

  return {
    projectId,
    projectName,
    tabs,
    todos,
    done,
    selectedTask,
    popoverOpen,
    handlePopoverChange,
    handleChange,
    onEdit,
    onDelete,
    onReorder,
    onSubmit,
    handleTaskSelect,
  };
}
