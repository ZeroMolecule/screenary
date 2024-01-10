import { Dispatch, FC, SetStateAction } from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { Title } from '../base/title';
import { TasksHeader } from './tasks-header';
import { TasksWrapper } from './tasks-wrapper';
import { Task } from '@prisma/client';

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
    todos,
    done,
    selectedTask,
    isPopoverOpen,
    onPopoverChange,
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
    <>
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
        todos={todos}
        done={done}
        onSelect={handleTaskSelect}
        onEdit={onEdit}
        onDelete={onDelete}
        onReorder={onReorder}
      />
    </>
  );
};

function useProjectTasks({
  projectId,
  projectName,
  isPopoverOpen,
  onPopoverChange,
}: Props) {
  const [
    { todos, done, selectedTask },
    { onSelectTask, onEdit, onDelete, onReorder, onSubmit },
  ] = useTasks(projectId!, {
    onSubmitSuccess: () => {
      onSelectTask(null);
      onPopoverChange({});
    },
  });

  const handleTaskSelect = (task: Task) => {
    onSelectTask(task);
    onPopoverChange({ [projectId]: true });
  };

  const handlePopoverAfterClose = () => onSelectTask(null);

  return {
    projectId,
    projectName,
    todos,
    done,
    selectedTask,
    isPopoverOpen,
    onPopoverChange,
    onSubmit,
    onEdit,
    onDelete,
    onReorder,
    handleTaskSelect,
    handlePopoverAfterClose,
  };
}
