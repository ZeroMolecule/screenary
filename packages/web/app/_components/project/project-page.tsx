'use client';

import { FC } from 'react';
import { projectQuery } from '@/domain/queries/project-query';
import { Data } from '@/domain/remote/response/data';
import { Project } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { EDIT_PROJECT_MENU_ID } from '@/utils/constants';
import { Portal } from '@mantine/core';
import { ProjectMenu } from './project-menu';
import { ProjectFormValues, ProjectModal } from '../modals/project-modal';
import { useDisclosure } from '@mantine/hooks';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { editProjectMutation } from '@/domain/mutations/edit-project-mutation';
import { EditProjectData } from '@/domain/types/project-data';

export const ProjectPage: FC = () => {
  const { isOpen, open, close, project, handleEdit } = useProjectPage();

  return (
    <>
      <h1>{project?.name}</h1>
      <Portal target={`#${EDIT_PROJECT_MENU_ID}`}>
        <ProjectMenu openModal={open} />
        <ProjectModal
          opened={isOpen}
          onClose={close}
          onSubmit={handleEdit}
          project={project}
        />
      </Portal>
    </>
  );
};

function useProjectPage() {
  const { id } = useParams();
  const [isOpen, { open, close }] = useDisclosure(false);
  const onSuccess = useNotificationSuccess('saved');

  const { data: project, refetch } = useQuery<Data<Project>>({
    queryKey: projectQuery.key(id),
  });

  const { mutateAsync: editProject } = useMutation({
    mutationFn: editProjectMutation.fnc,
    onSuccess: () => {
      onSuccess();
      close();
      refetch();
    },
  });

  const handleEdit = async (values: ProjectFormValues) => {
    const data: EditProjectData = { ...values, id };
    await editProject(data).catch(() => null);
  };

  return {
    isOpen,
    open,
    close,
    project: project?.data,
    handleEdit,
  };
}
