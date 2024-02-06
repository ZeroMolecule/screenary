import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { reorderTasksMutation } from '@/domain/mutations/reorder-tasks-mutation';
import { Task, TaskParams, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { ReorderData } from '@/domain/types/reorder-data';
import { AddTaskData } from '@/domain/types/task-data';
import { TaskStatus } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useProject } from './use-project';

type Config = {
  onSubmitSuccess?: () => void;
};

export const useTasks = (
  projectId: string,
  config?: Config
): [
  {
    results: Task[];
    baseResults: Task[];
    isLoading: boolean;
    selectedTask: Task | null;
    hiddenCompletedTasks: boolean;
  },
  {
    onSelectTask: (task: Task | null) => void;
    onHideCompletedTasks: () => void;
    onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
    onEdit: (task: Task) => Promise<void>;
    onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onSubmit: (task: Pick<Task, 'title' | 'dueDate'>) => Promise<void>;
  }
] => {
  const queryClient = useQueryClient();
  const { data: project, update: updateProject } = useProject(projectId);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [params, setParams] = useState<TaskParams>({
    status: project?.projectUser?.taskStatus ?? undefined,
  });
  const hiddenCompletedTasks =
    (typeof params.status === 'string'
      ? params.status === TaskStatus.TODO
      : params.status?.every((el) => el === TaskStatus.TODO)) ?? false;

  const { data, isLoading, refetch } = useQuery<Data<Task[]>>({
    queryKey: tasksQuery.key(projectId, params),
  });

  const results = data?.data ?? [];
  const baseResults =
    queryClient.getQueryData<Data<Task[]>>(tasksQuery.key(projectId, {}))
      ?.data ?? [];

  const { mutateAsync: createTask } = useMutation({
    mutationFn: addTaskMutation.fnc,
    onSuccess: async () => {
      await refetch();
      config?.onSubmitSuccess?.();
    },
  });
  const { mutateAsync: editTask } = useMutation({
    mutationFn: editTaskMutation.fnc,
    onSuccess: async () => {
      await refetch();
      config?.onSubmitSuccess?.();
    },
  });
  const { mutateAsync: reorderTasks } = useMutation({
    mutationFn: reorderTasksMutation.fnc,
    onSuccess: async () => {
      await refetch();
    },
  });
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: deleteTaskMutation.fnc,
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleSelectTask = (value: Task | null) => setSelectedTask(value);

  const handleHideCompletedTasks = () => {
    const status = hiddenCompletedTasks ? undefined : TaskStatus.TODO;
    setParams((params) => ({
      ...params,
      status,
    }));
    updateProject({
      projectUser: {
        taskStatus: status ?? null,
      },
    });
  };

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
    {
      results,
      baseResults,
      isLoading,
      selectedTask,
      hiddenCompletedTasks,
    },
    {
      onSelectTask: handleSelectTask,
      onHideCompletedTasks: handleHideCompletedTasks,
      onCreate: handleCreate,
      onEdit: handleEdit,
      onReorder: handleReorder,
      onDelete: handleDelete,
      onSubmit: handleSubmit,
    },
  ];
};
