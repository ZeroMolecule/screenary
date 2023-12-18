import { UseQueryResult, useMutation, useQueries } from '@tanstack/react-query';
import { TaskStatus } from '@prisma/client';
import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { Task, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { AddTaskData, ReorderTaskData } from '@/domain/types/task-data';
import { useNotificationSuccess } from './use-notification-success';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { reorderTasksMutation } from '@/domain/mutations/reorder-tasks-mutation';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { orderBy } from 'lodash';

type Config = {
  onCreateSuccess?: () => void;
};

export const useTasks = (
  projectId: string,
  config?: Config
): [
  { results: Task[]; todos: Task[]; done: Task[] },
  {
    onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
    onEdit: (task: Task) => Promise<void>;
    onReorder: (data: Pick<ReorderTaskData, 'data'>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
  }
] => {
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
      config?.onCreateSuccess?.();
    },
  });
  const { mutateAsync: editTask } = useMutation({
    mutationFn: editTaskMutation.fnc,
    onSuccess: async () => {
      await Promise.all([refetchTodos(), refetchDone()]);
      onSaved();
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

  const handleCreate = async ({
    title,
    dueDate,
  }: Pick<AddTaskData, 'title' | 'dueDate'>) => {
    await createTask({ projectId, title, dueDate }).catch(() => null);
  };

  const handleEdit = async ({ id, projectId, title, status }: Task) => {
    await editTask({ id, projectId, title, status }).catch(() => null);
  };

  const handleReorder = async ({ data }: Pick<ReorderTaskData, 'data'>) => {
    await reorderTasks({ projectId, data }).catch((error) => {
      throw error;
    });
  };

  const handleDelete = async (id: string) => {
    await deleteTask({ id, projectId }).catch(() => null);
  };

  return [
    { results, todos, done },
    {
      onCreate: handleCreate,
      onEdit: handleEdit,
      onReorder: handleReorder,
      onDelete: handleDelete,
    },
  ];
};
