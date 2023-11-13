'use client';

import { FC } from 'react';
import { Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { projectsQuery } from '@/domain/queries/projects-query';
import { Project } from '@prisma/client';
import { ProjectsEmptyPlaceholder } from './projects-empty-placeholder';
import { ProjectItem } from './project-item';
import { Data } from '@/domain/remote/response/data';

export const ProjectsPage: FC = () => {
  const { projects } = useProjectsWrapper();

  const renderProjectItem = (project: Project) => (
    <ProjectItem key={project.id} project={project} />
  );

  return (
    <Group h="100%">
      {!projects?.length ? (
        <ProjectsEmptyPlaceholder />
      ) : (
        <div className="projects-grid">{projects.map(renderProjectItem)}</div>
      )}
    </Group>
  );
};

function useProjectsWrapper() {
  const { data: projects } = useQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });

  return { projects: projects?.data };
}
