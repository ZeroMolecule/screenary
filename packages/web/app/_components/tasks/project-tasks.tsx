import { Dispatch, FC, SetStateAction } from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { Title } from '../base/title';
import { TasksHeader } from './tasks-header';
import { TasksWrapper } from './tasks-wrapper';
import { Task, TaskStatus } from '@prisma/client';
import { Stack } from '@mantine/core';

type Props = {
  projectId: string;
  projectName: string;
  isPopoverOpen: boolean;
  onPopoverChange: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
};

export const ProjectTasks: FC<Props> = (props) => {
  const {
    projectId,
    projectName,
    results,
    isLoading,
    selectedTask,
    todosExist,
    doneExist,
    hiddenCompletedTasks,
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

  const headerTitle = (
    <Title order={3} fw={600}>
      {projectName}
    </Title>
  );

  return (
    <Stack h="100%" pos="relative" p="md">
      <TasksHeader
        projectId={projectId}
        title={headerTitle}
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
      />
    </Stack>
  );
};

function useProjectTasks({
  projectId,
  projectName,
  isPopoverOpen,
  onPopoverChange,
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
    projectName,
    results,
    isLoading,
    selectedTask,
    todosExist,
    doneExist,
    hiddenCompletedTasks,
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
