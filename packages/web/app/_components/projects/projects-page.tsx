'use client';

import { FC } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Group, Portal } from '@mantine/core';
import { Project } from '@prisma/client';
import { projectsQuery } from '@/domain/queries/projects-query';
import { ProjectsEmptyPlaceholder } from './projects-empty-placeholder';
import { ProjectItem } from './project-item';
import { HEADER_CONTAINER_ID } from '@/utils/constants';
import { IconCirclePlus } from '@tabler/icons-react';
import { ProjectFormValues, ProjectModal } from '../modals/project-modal';
import { useDisclosure } from '@mantine/hooks';
import { addProjectMutation } from '@/domain/mutations/add-project-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { Data } from '@/domain/remote/response/data';
import { useTranslations } from 'next-intl';

export const ProjectsPage: FC = () => {
  const { t, isOpen, open, close, projects, handleSubmit } =
    useProjectsWrapper();

  const renderProjectItem = (project: Project) => (
    <ProjectItem key={project.id} project={project} />
  );

  return (
    <Group h="100%">
      <Portal target={`#${HEADER_CONTAINER_ID}`}>
        <Button
          variant="subtle"
          bg="white"
          c="neutral.7"
          radius={6}
          leftSection={<IconCirclePlus />}
          className="add-project-button"
          onClick={open}
        >
          {t('addAction')}
        </Button>
      </Portal>
      <ProjectModal opened={isOpen} onClose={close} onSubmit={handleSubmit} />
      {!projects?.length ? (
        <ProjectsEmptyPlaceholder />
      ) : (
        <div className="projects-grid">{projects.map(renderProjectItem)}</div>
      )}
    </Group>
  );
};

function useProjectsWrapper() {
  const t = useTranslations('projects');
  const [isOpen, { open, close }] = useDisclosure(false);
  const onSuccess = useNotificationSuccess('added');

  const { data: projects, refetch } = useQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });

  const { mutateAsync: addProject } = useMutation({
    mutationFn: addProjectMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onSuccess();
      close();
    },
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    await addProject(values).catch(() => null);
  };

  return {
    t,
    isOpen,
    open,
    close,
    projects: projects?.data,
    handleSubmit,
  };
}
