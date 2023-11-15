'use client';

import { FC } from 'react';
import { projectQuery } from '@/domain/queries/project-query';
import { Data } from '@/domain/remote/response/data';
import { Project } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { NOTIFICATION_WIDGET_CONTAINER_ID } from '@/utils/constants';
import { Group, Portal } from '@mantine/core';
import { ProjectMenu } from './project-menu';
import { ProjectFormValues, ProjectModal } from '../modals/project-modal';
import { useDisclosure } from '@mantine/hooks';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { editProjectMutation } from '@/domain/mutations/edit-project-mutation';
import { EditProjectData } from '@/domain/types/project-data';
import { deleteProjectMutation } from '@/domain/mutations/delete-project-mutation';
import { useRouter } from '@/navigation';
import { paths } from '@/navigation/paths';
import { ConfirmDeleteModal } from '../modals/confirm-delete-modal';
import { useTranslations } from 'next-intl';
import { Notes } from './notes';

// TODO: custom modal hook

export const ProjectPage: FC = () => {
  const {
    t,
    isEditOpen,
    openEdit,
    closeEdit,
    isDeleteOpen,
    openDelete,
    closeDelete,
    project,
    handleEdit,
    handleDelete,
  } = useProjectPage();

  return (
    <Group h="100%" justify="space-between" align="flex-start">
      <h1>{project?.name}</h1>
      <Notes />

      <Portal target={`#${NOTIFICATION_WIDGET_CONTAINER_ID}`}>
        <ProjectMenu openEditModal={openEdit} openDeleteModal={openDelete} />
      </Portal>
      <ProjectModal
        opened={isEditOpen}
        onClose={closeEdit}
        onSubmit={handleEdit}
        project={project}
      />
      <ConfirmDeleteModal
        opened={isDeleteOpen}
        onClose={closeDelete}
        onSubmit={handleDelete}
        title={t('deleteTitle')}
        description={t('deleteDescription', { projectName: project?.name })}
      />
    </Group>
  );
};

function useProjectPage() {
  const t = useTranslations('project');
  const { id } = useParams();
  const { replace } = useRouter();
  const [isEditOpen, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [isDeleteOpen, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const onEdit = useNotificationSuccess('saved');
  const onDelete = useNotificationSuccess('deleted');

  const { data: project, refetch } = useQuery<Data<Project>>({
    queryKey: projectQuery.key(id),
  });

  const { mutateAsync: editProject } = useMutation({
    mutationFn: editProjectMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onEdit();
      closeEdit();
    },
  });

  const { mutateAsync: deleteProject } = useMutation({
    mutationFn: deleteProjectMutation.fnc,
    onSuccess: () => {
      onDelete();
      closeDelete();
      replace(paths.projects());
    },
  });

  const handleEdit = async (values: ProjectFormValues) => {
    const data: EditProjectData = { ...values, id };
    await editProject(data).catch(() => null);
  };

  const handleDelete = async () => {
    await deleteProject(id).catch(() => null);
  };

  return {
    t,
    isEditOpen,
    openEdit,
    closeEdit,
    isDeleteOpen,
    openDelete,
    closeDelete,
    project: project?.data,
    handleEdit,
    handleDelete,
  };
}
