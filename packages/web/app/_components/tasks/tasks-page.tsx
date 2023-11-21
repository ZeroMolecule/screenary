'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { ActionIcon, Box, Button, Card, Group, Stack } from '@mantine/core';
import { ProjectsTabs } from '../projects-tabs';
import { Title } from '../base/title';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Task, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { IconEye, IconEyeOff, IconPlus } from '@tabler/icons-react';
import { EmptyPlaceholder } from '../empty-placeholder';
import { useTranslations } from 'next-intl';
import { groupBy } from 'lodash';
import { TaskStatus } from '@prisma/client';
import { TasksList } from './tasks-list';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import emptyIcon from '@/public/images/check-icon.svg';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/tasks.module.scss';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';

export const TasksPage: FC = () => {
  const {
    t,
    projectId,
    projectName,
    tabs,
    todos,
    done,
    isEmpty,
    hideCompleted,
    handleHideCompleted,
    handleChange,
    handleEdit,
    handleDelete,
  } = useTasksPage();

  return (
    <Stack h="100%" gap={8}>
      <Group justify="space-between">
        <ProjectsTabs
          defaultTab={projectId}
          tabs={tabs}
          onChange={handleChange}
        />
        <Button
          size="sm"
          variant="subtle"
          bg="white"
          c="neutral.7"
          radius={6}
          leftSection={
            hideCompleted ? <IconEye size={20} /> : <IconEyeOff size={20} />
          }
          className={styles.hideButton}
          onClick={handleHideCompleted}
        >
          {hideCompleted ? t('showAction') : t('hideAction')}
        </Button>
      </Group>
      <Card h="100%" radius={24} className={styles.tasks}>
        <Group justify="space-between">
          <Title order={3} fw={600}>
            {projectName}
          </Title>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
          >
            <IconPlus />
          </ActionIcon>
        </Group>
        <Box className={overflowStyles['overflow-auto']}>
          {isEmpty ? (
            // TODO: fix aligning
            <EmptyPlaceholder
              title={t('empty.title')}
              description={t('empty.description')}
              image={<Image src={emptyIcon} width={140} height={140} alt="" />}
            />
          ) : (
            <Stack gap={46}>
              <TasksList
                title={t('todo')}
                tasks={todos}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              {!hideCompleted && (
                <TasksList
                  title={t('done')}
                  tasks={done}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </Stack>
          )}
        </Box>
      </Card>
    </Stack>
  );
};

function useTasksPage() {
  const t = useTranslations('tasks');
  const [hideCompleted, setHideCompleted] = useState(false);
  const { selectedProject, tabs, handleChange } = useProjectsTabs();
  const { id: projectId, name: projectName } = selectedProject ?? {};
  const onSaved = useNotificationSuccess('saved');
  const onDelete = useNotificationSuccess('deleted');

  const { data, refetch } = useQuery<Data<Task[]>>({
    queryKey: tasksQuery.key(projectId!),
    enabled: !!projectId,
  });
  const tasks = data?.data ?? [];
  const results = groupBy(tasks, 'status');

  const { mutateAsync: editTask } = useMutation({
    mutationFn: editTaskMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onSaved();
    },
  });
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: deleteTaskMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onDelete();
    },
  });

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const handleEdit = async ({ id, projectId, title, status }: Task) => {
    await editTask({ id, projectId, title, status }).catch(() => null);
  };

  const handleDelete = async (id: string) => {
    if (projectId) {
      await deleteTask({ id, projectId }).catch(() => null);
    }
  };

  return {
    t,
    projectId,
    projectName,
    tabs,
    todos: results[TaskStatus.TODO],
    done: results[TaskStatus.DONE],
    isEmpty: !tasks.length,
    hideCompleted,
    handleHideCompleted,
    handleChange,
    handleEdit,
    handleDelete,
  };
}
