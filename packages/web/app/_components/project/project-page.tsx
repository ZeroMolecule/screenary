'use client';

import { FC, useEffect } from 'react';
import { Project, projectQuery } from '@/domain/queries/project-query';
import { Data } from '@/domain/remote/response/data';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  NOTIFICATION_WIDGET_CONTAINER_ID,
  NOTIFICATION_WIDGET_TITLE_ID,
} from '@/utils/constants';
import { Grid, GridCol, Group, Portal, Stack } from '@mantine/core';
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
import { Tasks } from './tasks';

// TODO: custom modal hook

export const ProjectPage: FC = () => {
  const {
    t,
    id,
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
      <Grid
        h="100%"
        w="100%"
        gutter="xs"
        styles={{ inner: { height: '100%' } }}
      >
        <GridCol span={1} h="100%">
          {/* TODO: embedded pages */}
          <div
            style={{
              height: '100%',
              borderRadius: '24px',
              border: '1px solid #DCD5C7',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'white',
            }}
          >
            EMBEDDED PAGES
          </div>
        </GridCol>
        <GridCol span={8} h="100%">
          <Tasks projectId={id} />
        </GridCol>
        <GridCol span={3} h="100%">
          <Stack h="100%" pos="relative" gap="xs">
            <Notes projectId={id} />
            {/* TODO: quick links */}
            <div
              style={{
                height: '100%',
                borderRadius: '24px',
                border: '1px solid #DCD5C7',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'white',
              }}
            >
              QUICK LINKS
            </div>
          </Stack>
        </GridCol>
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

  useEffect(() => {
    const element = document.getElementById(NOTIFICATION_WIDGET_TITLE_ID);
    if (element) {
      element.textContent = project?.data.name ?? '';
    }
  }, [project?.data.name]);

  return {
    t,
    id,
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
