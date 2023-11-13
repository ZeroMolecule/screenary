'use client';

import { FC, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Group, Portal } from '@mantine/core';
import { Project } from '@prisma/client';
import { projectsQuery } from '@/domain/queries/projects-query';
import { ProjectsEmptyPlaceholder } from './projects-empty-placeholder';
import { ProjectItem } from './project-item';
import { ADD_PROJECT_BUTTON_ID } from '@/utils/constants';
import { IconCirclePlus } from '@tabler/icons-react';
import {
  ProjectFormValues,
  ProjectModal,
  ProjectModalRef,
} from '../modals/project-modal';
import { useDisclosure } from '@mantine/hooks';
import { addProjectMutation } from '@/domain/mutations/add-project-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { Data } from '@/domain/remote/response/data';

export const ProjectsPage: FC = () => {
  const { projectModalRef, isOpen, open, close, projects, handleSubmit } =
    useProjectsWrapper();

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
          onClick={open}
        >
          Add Project
        </Button>
      </Portal>
      <ProjectModal
        ref={projectModalRef}
        opened={isOpen}
        onClose={close}
        onSubmit={handleSubmit}
      />
      {!projects?.length ? (
        <ProjectsEmptyPlaceholder />
      ) : (
        <div className="projects-grid">{projects.map(renderProjectItem)}</div>
      )}
    </Group>
  );
};

function useProjectsWrapper() {
  const qc = useQueryClient();
  const projectModalRef = useRef<ProjectModalRef>(null);
  const [isOpen, { open, close }] = useDisclosure(false);
  const onSuccess = useNotificationSuccess('added');

  const { data: projects } = useQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });

  const { mutateAsync: addProject } = useMutation({
    mutationFn: addProjectMutation.fnc,
    onSuccess: (data) => {
      onSuccess();
      close();
      qc.setQueryData(projectsQuery.key, (currData: Data<Project[]>) => ({
        ...currData,
        data: [...(currData.data ?? []), data],
      }));
      projectModalRef.current?.resetForm();
    },
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    await addProject(values).catch(() => null);
  };

  return {
    projectModalRef,
    isOpen,
    open,
    close,
    projects: projects?.data,
    handleSubmit,
  };
}
