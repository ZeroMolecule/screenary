import { useState } from 'react';
import { UseQueryResult, useMutation, useQueries } from '@tanstack/react-query';
import { TaskStatus } from '@prisma/client';
import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { Task, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { AddTaskData } from '@/domain/types/task-data';
import { useNotificationSuccess } from './use-notification-success';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { reorderTasksMutation } from '@/domain/mutations/reorder-tasks-mutation';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { orderBy } from 'lodash';
import { ReorderData } from '@/domain/types/reorder-data';

type Config = {
  onSubmitSuccess?: () => void;
};

export const useTasks = (
  projectId: string,
  config?: Config
): [
  { results: Task[]; todos: Task[]; done: Task[]; selectedTask: Task | null },
  {
    onSelectTask: (task: Task | null) => void;
    onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
    onEdit: (task: Task) => Promise<void>;
    onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onSubmit: (task: Pick<Task, 'title' | 'dueDate'>) => Promise<void>;
  }
] => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
  const results = orderBy([...done, ...todos], 'order');

  const { mutateAsync: createTask } = useMutation({
    mutationFn: addTaskMutation.fnc,
    onSuccess: async () => {
      await refetchTodos();
      onCreated();
      config?.onSubmitSuccess?.();
    },
  });
  const { mutateAsync: editTask } = useMutation({
    mutationFn: editTaskMutation.fnc,
    onSuccess: async () => {
      await Promise.all([refetchTodos(), refetchDone()]);
      onSaved();
      config?.onSubmitSuccess?.();
    },
  });
  const { mutateAsync: reorderTasks } = useMutation({
    mutationFn: reorderTasksMutation.fnc,
    onSuccess: async (data) => {
      if (data.every((el) => el.status === TaskStatus.TODO)) {
        await refetchTodos();
      } else if (data.every((el) => el.status === TaskStatus.DONE)) {
        await refetchDone();
      } else {
        await Promise.all([refetchTodos(), refetchDone()]);
      }
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

  const handleSelectTask = (value: Task | null) => setSelectedTask(value);

  const handleCreate = async ({
    title,
    dueDate,
  }: Pick<AddTaskData, 'title' | 'dueDate'>) => {
    await createTask({ projectId, title, dueDate }).catch(() => null);
  };
  const handleEdit = async ({
    id,
    projectId,
    title,
    status,
    dueDate,
  }: Task) => {
    await editTask({ id, projectId, title, status, dueDate }).catch(() => null);
  };
  const handleReorder = async ({ data }: Pick<ReorderData, 'data'>) => {
    await reorderTasks({ projectId, data }).catch(() => null);
  };
  const handleDelete = async (id: string) => {
    await deleteTask({ id, projectId }).catch(() => null);
  };
  const handleSubmit = async ({
    title,
    dueDate,
  }: Pick<Task, 'title' | 'dueDate'>) => {
    if (selectedTask) {
      await editTask({ ...selectedTask, title, dueDate }).catch(() => null);
    } else {
      await createTask({ projectId, title, dueDate }).catch(() => null);
    }
  };

  return [
    { results, todos, done, selectedTask },
    {
      onSelectTask: handleSelectTask,
      onCreate: handleCreate,
      onEdit: handleEdit,
      onReorder: handleReorder,
      onDelete: handleDelete,
      onSubmit: handleSubmit,
    },
  ];
};
