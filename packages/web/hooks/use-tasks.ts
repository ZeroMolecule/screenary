import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TaskStatus } from '@prisma/client';
import { addTaskMutation } from '@/domain/mutations/add-task-mutation';
import { Task, TaskParams, tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { AddTaskData } from '@/domain/types/task-data';
import { editTaskMutation } from '@/domain/mutations/edit-task-mutation';
import { reorderTasksMutation } from '@/domain/mutations/reorder-tasks-mutation';
import { deleteTaskMutation } from '@/domain/mutations/delete-task-mutation';
import { ReorderData } from '@/domain/types/reorder-data';
import { usePathname, useRouter } from '@/navigation';

type ParamKey = keyof TaskParams;
function getParamKey(key: ParamKey) {
  return key;
}

type Config = {
  onSubmitSuccess?: () => void;
};

export const useTasks = (
  projectId: string,
  config?: Config
): [
  {
    results: Task[];
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const paramsRef = useRef<TaskParams>(
    Object.fromEntries(searchParams.entries())
  );
  paramsRef.current = Object.fromEntries(searchParams.entries());

  const hiddenCompletedTasks = !!searchParams.get(getParamKey('status'));

  const { data, isLoading, refetch } = useQuery<Data<Task[]>>({
    queryKey: tasksQuery.key(projectId, paramsRef.current),
  });
  const results = data?.data ?? [];

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
    const params = new URLSearchParams(searchParams.toString());
    const currParams = paramsRef.current;
    const key = getParamKey('status');

    if (!params.get(key)) {
      params.set(key, TaskStatus.TODO);
      paramsRef.current = { ...currParams, status: TaskStatus.TODO };
    } else {
      params.delete(key);
      paramsRef.current = { ...currParams, status: [] };
    }
    replace(`${pathname}?${params.toString()}`);
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
