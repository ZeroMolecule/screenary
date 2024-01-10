import { useState } from 'react';
import { UseQueryResult, useMutation, useQueries } from '@tanstack/react-query';
import { TaskStatus } from '@prisma/client';
import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { Task, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { AddTaskData } from '@/domain/types/task-data';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { reorderTasksMutation } from '@/domain/mutations/reorder-tasks-mutation';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { ReorderData } from '@/domain/types/reorder-data';

type Config = {
  includeAllResults?: boolean;
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

  const [
    { data: todoData, refetch: refetchTodos },
    { data: doneData, refetch: refetchDone },
    { data: resultsData, refetch: refetchResults },
  ]: Array<UseQueryResult<Data<Task[]>>> = useQueries({
    queries: [
      {
        queryKey: tasksQuery.key(projectId, {
          status: TaskStatus.TODO,
        }),
        enabled: !config?.includeAllResults,
      },
      {
        queryKey: tasksQuery.key(projectId, {
          status: TaskStatus.DONE,
        }),
        enabled: !config?.includeAllResults,
      },
      {
        queryKey: tasksQuery.key(projectId),
        enabled: !!config?.includeAllResults,
      },
    ],
  });
  const todos = todoData?.data ?? [];
  const done = doneData?.data ?? [];
  const results = resultsData?.data ?? [];

  const { mutateAsync: createTask } = useMutation({
    mutationFn: addTaskMutation.fnc,
    onSuccess: async () => {
      await (config?.includeAllResults ? refetchResults() : refetchTodos());
      config?.onSubmitSuccess?.();
    },
  });
  const { mutateAsync: editTask } = useMutation({
    mutationFn: editTaskMutation.fnc,
    onSuccess: async () => {
      await (config?.includeAllResults
        ? refetchResults()
        : Promise.all([refetchTodos(), refetchDone()]));
      config?.onSubmitSuccess?.();
    },
  });
  const { mutateAsync: reorderTasks } = useMutation({
    mutationFn: reorderTasksMutation.fnc,
    onSuccess: async (data) => {
      if (config?.includeAllResults) {
        await refetchResults();
      } else {
        if (data.every((el) => el.status === TaskStatus.TODO)) {
          await refetchTodos();
        } else if (data.every((el) => el.status === TaskStatus.DONE)) {
          await refetchDone();
        } else {
          await Promise.all([refetchTodos(), refetchDone()]);
        }
      }
    },
  });
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: deleteTaskMutation.fnc,
    onSuccess: async (data) => {
      if (config?.includeAllResults) {
        await refetchResults();
      } else {
        await (data.status === TaskStatus.TODO
          ? refetchTodos()
          : refetchDone());
      }
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
