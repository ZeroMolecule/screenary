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
import { deleteProjectMutation } from '@/domain/mutations/delete-project-mutation';
import { useRouter } from '@/navigation';
import { paths } from '@/navigation/paths';

export const ProjectPage: FC = () => {
  const { isOpen, open, close, project, handleEdit, handleDelete } =
    useProjectPage();

  return (
    <>
      <h1>{project?.name}</h1>
      <Portal target={`#${EDIT_PROJECT_MENU_ID}`}>
        <ProjectMenu openModal={open} onDelete={handleDelete} />
      </Portal>
      <ProjectModal
        opened={isOpen}
        onClose={close}
        onSubmit={handleEdit}
        project={project}
      />
    </>
  );
};

function useProjectPage() {
  const { id } = useParams();
  const { replace } = useRouter();
  const [isOpen, { open, close }] = useDisclosure(false);
  const onEdit = useNotificationSuccess('saved');
  const onDelete = useNotificationSuccess('deleted');

  const { data: project, refetch } = useQuery<Data<Project>>({
    queryKey: projectQuery.key(id),
  });

  const { mutateAsync: editProject } = useMutation({
    mutationFn: editProjectMutation.fnc,
    onSuccess: () => {
      onEdit();
      close();
      refetch();
    },
  });

  const { mutateAsync: deleteProject } = useMutation({
    mutationFn: deleteProjectMutation.fnc,
    onSuccess: () => {
      onDelete();
      replace(paths.projects());
    },
  });

  const handleEdit = async (values: ProjectFormValues) => {
    const data: EditProjectData = { ...values, id };
    await editProject(data).catch(() => null);
  };

  const handleDelete = async () => {
    await deleteProject(id);
  };

  return {
    isOpen,
    open,
    close,
    project: project?.data,
    handleEdit,
    handleDelete,
  };
}
