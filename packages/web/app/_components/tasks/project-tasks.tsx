import { useTasks } from '@/hooks/use-tasks';
import { Stack, StackProps } from '@mantine/core';
import { Task, TaskStatus } from '@prisma/client';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { TasksHeader } from './tasks-header';
import { TasksWrapper } from './tasks-wrapper';

type Props = {
  projectId: string;
  title: ReactNode;
  isPopoverOpen: boolean;
  onPopoverChange: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  hideTodoTitle?: boolean;
  hideDoneTitle?: boolean;
  wrapperProps?: StackProps;
};

export const ProjectTasks: FC<Props> = (props) => {
  const {
    projectId,
    title,
    results,
    isLoading,
    selectedTask,
    todosExist,
    doneExist,
    hiddenCompletedTasks,
    hideTodoTitle,
    hideDoneTitle,
    wrapperProps,
    isPopoverOpen,
    onPopoverChange,
    onHideCompletedTasks,
    onSubmit,
    onEdit,
    onDelete,
    onReorder,
    handleTaskSelect,
    handlePopoverAfterClose,
  } = useProjectTasks(props);

  return (
    <Stack h="100%" pos="relative" p="md" {...wrapperProps}>
      <TasksHeader
        projectId={projectId}
        title={title}
        onSubmit={onSubmit}
        isPopoverOpen={isPopoverOpen}
        onPopoverChange={onPopoverChange}
        task={selectedTask ?? undefined}
        popoverAfterClose={handlePopoverAfterClose}
      />
      <TasksWrapper
        results={results}
        isLoading={isLoading}
        todosExist={todosExist}
        doneExist={doneExist}
        hiddenCompletedTasks={hiddenCompletedTasks}
        onHideCompletedTasks={onHideCompletedTasks}
        onSelect={handleTaskSelect}
        onEdit={onEdit}
        onDelete={onDelete}
        onReorder={onReorder}
        hideTodoTitle={hideTodoTitle}
        hideDoneTitle={hideDoneTitle}
      />
    </Stack>
  );
};

function useProjectTasks({
  projectId,
  title,
  isPopoverOpen,
  onPopoverChange,
  hideTodoTitle,
  hideDoneTitle,
  wrapperProps,
}: Props) {
  const [
    { results, baseResults, isLoading, selectedTask, hiddenCompletedTasks },
    {
      onSelectTask,
      onHideCompletedTasks,
      onEdit,
      onDelete,
      onReorder,
      onSubmit,
    },
  ] = useTasks(projectId!, {
    onSubmitSuccess: () => {
      onSelectTask(null);
      onPopoverChange({});
    },
  });

  const todosExist = baseResults.some((el) => el.status === TaskStatus.TODO);
  const doneExist = baseResults.some((el) => el.status === TaskStatus.DONE);

  const handleTaskSelect = (task: Task) => {
    onSelectTask(task);
    onPopoverChange({ [projectId]: true });
  };

  const handlePopoverAfterClose = () => onSelectTask(null);

  return {
    projectId,
    title,
    results,
    isLoading,
    selectedTask,
    todosExist,
    doneExist,
    hiddenCompletedTasks,
    hideTodoTitle,
    hideDoneTitle,
    wrapperProps,
    isPopoverOpen,
    onPopoverChange,
    onHideCompletedTasks,
    onSubmit,
    onEdit,
    onDelete,
    onReorder,
    handleTaskSelect,
    handlePopoverAfterClose,
  };
}
