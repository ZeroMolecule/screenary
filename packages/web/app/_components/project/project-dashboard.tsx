'use client';

import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Grid, GridCol, Group, Portal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Project } from '@prisma/client';
import { EmbeddedPages } from './embedded-pages/embedded-pages';
import { ProjectMenu } from './project-menu';
import { NOTIFICATION_WIDGET_CONTAINER_ID } from '@/utils/constants';
import { ProjectFormValues, ProjectModal } from '../modals/project-modal';
import { ConfirmDeleteModal } from '../modals/confirm-delete-modal';
import { Data } from '@/domain/remote/response/data';
import { projectQuery } from '@/domain/queries/project-query';
import { editProjectMutation } from '@/domain/mutations/edit-project-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { useRouter } from '@/navigation';
import { deleteProjectMutation } from '@/domain/mutations/delete-project-mutation';
import { paths } from '@/navigation/paths';
import { EditProjectData } from '@/domain/types/project-data';
import styles from '@/styles/components/project.module.scss';

type Props = {
  id: string;
  children: ReactNode;
};

export const ProjectDashboard: FC<Props> = (props) => {
  const {
    t,
    id,
    children,
    isEditOpen,
    openEdit,
    closeEdit,
    isDeleteOpen,
    openDelete,
    closeDelete,
    project,
    handleEdit,
    handleDelete,
  } = useProjectDashboard(props);

  return (
    <Group h="100%" justify="space-between" align="flex-start">
      <Grid
        h="100%"
        w="100%"
        gutter="xs"
        styles={{ inner: { height: '100%' } }}
      >
        <GridCol h="100%" className={styles.embedGridCol}>
          <EmbeddedPages projectId={id} />
        </GridCol>
        {children}
      </Grid>
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

function useProjectDashboard({ id, children }: Props) {
  const t = useTranslations('project');
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
    id,
    children,
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
