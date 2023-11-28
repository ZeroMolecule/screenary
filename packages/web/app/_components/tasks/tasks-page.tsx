'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { Box, Button, Card, Flex, Group, Stack } from '@mantine/core';
import { ProjectsTabs } from '../projects-tabs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Task, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { EmptyPlaceholder } from '../empty-placeholder';
import { useTranslations } from 'next-intl';
import { groupBy } from 'lodash';
import { TaskStatus } from '@prisma/client';
import { TasksList } from './tasks-list';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { TasksHeader } from './tasks-header';
import emptyIcon from '@/public/images/check-icon.svg';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/tasks.module.scss';
import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { AddTaskData } from '@/domain/types/task-data';

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
    handleCreate,
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
        <TasksHeader projectName={projectName ?? ''} onCreate={handleCreate} />
        <Box h="100%" className={overflowStyles['overflow-auto']}>
          {isEmpty ? (
            <Flex mih="100%" align="center">
              <EmptyPlaceholder
                title={t('empty.title')}
                description={t('empty.description')}
                image={
                  <Image src={emptyIcon} width={140} height={140} alt="" />
                }
              />
            </Flex>
          ) : (
            <Stack gap={46}>
              {todos && (
                <TasksList
                  title={t('todo')}
                  tasks={todos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              {!hideCompleted && done && (
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
  const onCreated = useNotificationSuccess('created');
  const onSaved = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const { data, refetch } = useQuery<Data<Task[]>>({
    queryKey: tasksQuery.key(projectId!),
    enabled: !!projectId,
  });
  const tasks = data?.data ?? [];
  const results = groupBy(tasks, 'status');

  const { mutateAsync: createTask } = useMutation({
    mutationFn: addTaskMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
    },
  });
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
      onDeleted();
    },
  });

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const handleCreate = async ({
    title,
    dueDate,
  }: Pick<AddTaskData, 'title' | 'dueDate'>) => {
    if (projectId) {
      await createTask({ projectId, title, dueDate });
    }
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
    handleCreate,
    handleEdit,
    handleDelete,
  };
}
