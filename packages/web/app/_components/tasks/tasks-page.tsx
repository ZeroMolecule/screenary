'use client';

import { FC, useState } from 'react';
import { Card, Group, Stack } from '@mantine/core';
import { Task } from '@prisma/client';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { Project } from '@prisma/client';
import { ProjectsTabs } from '../projects-tabs';
import { ProjectTasks } from './project-tasks';
import styles from '@/styles/components/tasks.module.scss';

export const TasksPage: FC = () => {
  const {
    projects,
    projectId,
    projectName,
    tabs,
    selectedTask,
    popoverOpen,
    handleChange,
    onEdit,
    onDelete,
    onReorder,
    onSubmit,
    setPopoverOpen,
    handleTaskSelect,
    handlePopoverAfterClose,
  } = useTasksPage();

  const renderProject = ({ id, name }: Project) => (
    <Stack
      key={id}
      h="100%"
      pos="relative"
      miw={600}
      className={styles.projectsTasksContainerItem}
    >
      <Stack h="100%" pos="relative">
        <ProjectTasks
          projectId={id}
          projectName={name}
          isPopoverOpen={popoverOpen[id] || false}
          onPopoverChange={setPopoverOpen}
        />
      </Stack>
    </Stack>
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
        {!projectId ? (
          <Group
            h="100%"
            align="flex-start"
            wrap="nowrap"
            gap={0}
            mb="sm"
            className={styles.projectsTasksContainer}
          >
            {projects.map(renderProject)}
          </Group>
        ) : (
          <ProjectTasks
            projectId={projectId}
            projectName={projectName!}
            isPopoverOpen={popoverOpen[projectId] || false}
            onPopoverChange={setPopoverOpen}
          />
        )}
      </Card>
    </Stack>
  );
};

function useTasksPage() {
  const [popoverOpen, setPopoverOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { projects, selectedProject, tabs, handleChange } =
    useProjectsTabs(true);
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

  const handlePopoverAfterClose = () => onSelectTask(null);

  return {
    projects: projects?.data ?? [],
    projectId,
    projectName,
    tabs,
    selectedTask,
    popoverOpen,
    handleChange,
    onEdit,
    onDelete,
    onReorder,
    onSubmit,
    setPopoverOpen,
    handleTaskSelect,
    handlePopoverAfterClose,
  };
}
