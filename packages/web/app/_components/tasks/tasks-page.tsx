'use client';

import { FC, useState } from 'react';
import { Card, Group, Stack } from '@mantine/core';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { Project } from '@prisma/client';
import { ProjectsTabs } from '../projects-tabs';
import { ProjectTasks } from './project-tasks';
import { Title } from '../base/title';
import styles from '@/styles/components/tasks.module.scss';

export const TasksPage: FC = () => {
  const {
    projects,
    projectId,
    projectName,
    tabs,
    popoverOpen,
    handleChange,
    setPopoverOpen,
  } = useTasksPage();

  const projectNameTitle = (name: string) => (
    <Title order={3} fw={600}>
      {name}
    </Title>
  );

  const renderProject = ({ id, name }: Project) => (
    <Stack
      key={id}
      h="100%"
      pos="relative"
      miw={600}
      className={styles.projectsTasksContainerItem}
    >
      <ProjectTasks
        projectId={id}
        title={projectNameTitle(name)}
        isPopoverOpen={popoverOpen[id] || false}
        onPopoverChange={setPopoverOpen}
      />
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
      <Card h="100%" p={0} radius={24} className={styles.tasks}>
        {!projectId ? (
          <Group
            h="100%"
            align="flex-start"
            wrap="nowrap"
            gap={0}
            className={styles.projectsTasksContainer}
          >
            {projects.map(renderProject)}
          </Group>
        ) : (
          <ProjectTasks
            projectId={projectId}
            title={projectNameTitle(projectName!)}
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

  return {
    projects: projects?.data ?? [],
    projectId,
    projectName,
    tabs,
    popoverOpen,
    setPopoverOpen,
    handleChange,
  };
}
