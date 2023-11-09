'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Group, Portal } from '@mantine/core';
import { Project } from '@prisma/client';
import { projectsQuery } from '@/domain/queries/projects-query';
import { ProjectsEmptyPlaceholder } from './projects-empty-placeholder';
import { ProjectItem } from './project-item';
import { ADD_PROJECT_BUTTON_ID } from '@/utils/constants';
import { IconCirclePlus } from '@tabler/icons-react';

export const ProjectsWrapper: FC = () => {
  const { projects } = useProjectsWrapper();

  const renderProjectItem = (project: Project) => (
    <ProjectItem key={project.id} project={project} />
  );

  return (
    <Group h="100%">
      <Portal target={`#${ADD_PROJECT_BUTTON_ID}`}>
        <Button
          variant="subtle"
          bg="white"
          c="neutral.7"
          radius={6}
          leftSection={<IconCirclePlus />}
          className="add-project-button"
        >
          Add Project
        </Button>
      </Portal>
      {!projects?.length ? (
        <ProjectsEmptyPlaceholder />
      ) : (
        projects.map(renderProjectItem)
      )}
    </Group>
  );
};

function useProjectsWrapper() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: projectsQuery.key,
  });

  return { projects };
}
