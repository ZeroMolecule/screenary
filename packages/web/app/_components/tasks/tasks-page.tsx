'use client';

import { FC, useState } from 'react';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { Button, Card, Group, Stack } from '@mantine/core';
import { ProjectsTabs } from '../projects-tabs';
import { UseQueryResult, useMutation, useQueries } from '@tanstack/react-query';
import { Task, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { TasksHeader } from './tasks-header';
import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { AddTaskData } from '@/domain/types/task-data';
import { TasksWrapper } from './tasks-wrapper';
import { useDisclosure } from '@mantine/hooks';
import { TaskStatus } from '@prisma/client';
import styles from '@/styles/components/tasks.module.scss';

export const TasksPage: FC = () => {
  const {
    t,
    projectId,
    projectName,
    tabs,
    todos,
    done,
    isFetchingTasks,
    hideCompleted,
    isPopoverOpen,
    openPopover,
    closePopover,
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
        <TasksHeader
          projectName={projectName ?? ''}
          onCreate={handleCreate}
          isPopoverOpen={isPopoverOpen}
          onOpenPopover={openPopover}
          onClosePopover={closePopover}
        />
        <TasksWrapper
          todos={todos}
          done={done}
          isLoading={isFetchingTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          hideCompleted={hideCompleted}
        />
      </Card>
    </Stack>
  );
};

function useTasksPage() {
  const t = useTranslations('tasks');
  const [hideCompleted, setHideCompleted] = useState(false);
  const { selectedProject, tabs, handleChange } = useProjectsTabs();
  const { id: projectId, name: projectName } = selectedProject ?? {};
  const [isPopoverOpen, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const onCreated = useNotificationSuccess('created');
  const onSaved = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const [
    { data: todoData, refetch: refetchTodos, isLoading: isLoadingTodos },
    { data: doneData, refetch: refetchDone, isLoading: isLoadingDone },
  ]: Array<UseQueryResult<Data<Task[]>>> = useQueries({
    queries: [
      {
        queryKey: tasksQuery.key(projectId!, {
          status: TaskStatus.TODO,
        }),
      },
      {
        queryKey: tasksQuery.key(projectId!, {
          status: TaskStatus.DONE,
        }),
      },
    ],
  });
  const todos = todoData?.data ?? [];
  const done = doneData?.data ?? [];
  const isFetchingTasks = isLoadingTodos || isLoadingDone;

  const { mutateAsync: createTask } = useMutation({
    mutationFn: addTaskMutation.fnc,
    onSuccess: async () => {
      await refetchTodos();
      onCreated();
      closePopover();
    },
  });
  const { mutateAsync: editTask } = useMutation({
    mutationFn: editTaskMutation.fnc,
    onSuccess: async () => {
      await refetchTodos();
      await refetchDone();
      onSaved();
    },
  });
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: deleteTaskMutation.fnc,
    onSuccess: async (data) => {
      if (data.status === TaskStatus.TODO) {
        await refetchTodos();
      } else {
        await refetchDone();
      }
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
      await createTask({ projectId, title, dueDate }).catch(() => null);
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
    todos,
    done,
    isFetchingTasks,
    hideCompleted,
    isPopoverOpen,
    openPopover,
    closePopover,
    handleHideCompleted,
    handleChange,
    handleCreate,
    handleEdit,
    handleDelete,
  };
}
