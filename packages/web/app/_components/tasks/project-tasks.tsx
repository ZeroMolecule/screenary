import { Dispatch, FC, SetStateAction } from 'react';
import { useTasks } from '@/hooks/use-tasks';
import { Title } from '../base/title';
import { TasksHeader } from './tasks-header';
import { TasksWrapper } from './tasks-wrapper';

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
    isPopoverOpen,
    onPopoverChange,
    onCreate,
    onEdit,
    onDelete,
    onReorder,
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
        onCreate={onCreate}
        isPopoverOpen={isPopoverOpen}
        onPopoverChange={onPopoverChange}
      />
      <TasksWrapper
        todos={todos}
        done={done}
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
  const [{ todos, done }, { onCreate, onEdit, onDelete, onReorder }] = useTasks(
    projectId,
    { onCreateSuccess: () => onPopoverChange({}) }
  );

  return {
    projectId,
    projectName,
    todos,
    done,
    isPopoverOpen,
    onPopoverChange,
    onCreate,
    onEdit,
    onDelete,
    onReorder,
  };
}
