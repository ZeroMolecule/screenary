import { Dispatch, SetStateAction, useState } from 'react';
import { UseQueryResult, useMutation, useQueries } from '@tanstack/react-query';
import { TaskStatus } from '@prisma/client';
import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { Task, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { AddTaskData } from '@/domain/types/task-data';
import { useNotificationSuccess } from './use-notification-success';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';

export const useTasks = (
  projectId: string
): [
  { popoverOpen: boolean; results: Task[]; todos: Task[]; done: Task[] },
  {
    setPopoverOpen: Dispatch<SetStateAction<boolean>>;
    onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
    onEdit: (task: Task) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
  }
] => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const onCreated = useNotificationSuccess('created');
  const onSaved = useNotificationSuccess('saved');
  const onDeleted = useNotificationSuccess('deleted');

  const [
    { data: todoData, refetch: refetchTodos },
    { data: doneData, refetch: refetchDone },
  ]: Array<UseQueryResult<Data<Task[]>>> = useQueries({
    queries: [
      {
        queryKey: tasksQuery.key(projectId, {
          status: TaskStatus.TODO,
        }),
      },
      {
        queryKey: tasksQuery.key(projectId, {
          status: TaskStatus.DONE,
        }),
      },
    ],
  });
  const todos = todoData?.data ?? [];
  const done = doneData?.data ?? [];
  const results = [...done, ...todos];

  const { mutateAsync: createTask } = useMutation({
    mutationFn: addTaskMutation.fnc,
    onSuccess: async () => {
      await refetchTodos();
      onCreated();
      setPopoverOpen(false);
    },
  });
  const { mutateAsync: editTask } = useMutation({
    mutationFn: editTaskMutation.fnc,
    onSuccess: async () => {
      await Promise.all([refetchTodos(), refetchDone()]);
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

  return [
    { popoverOpen, results, todos, done },
    {
      setPopoverOpen,
      onCreate: handleCreate,
      onEdit: handleEdit,
      onDelete: handleDelete,
    },
  ];
};
