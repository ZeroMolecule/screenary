import { FC } from 'react';
import { Box } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { Text } from '../base/text';
import { TaskItem } from './task-item';
import { ReorderData } from '@/domain/types/reorder-data';
import { ReorderList } from '../reorder-list';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
  title?: string;
};

export const TasksList: FC<Props> = ({
  title,
  tasks,
  onEdit,
  onDelete,
  onReorder,
}) => {
  return (
    <Box>
      <Text size="lg" fw={600}>
        {title}
      </Text>
      <ReorderList<Task>
        data={tasks}
        droppableId="tasks"
        onReorder={onReorder}
        renderComponentItem={(item) => (
          <TaskItem task={item} onEdit={onEdit} onDelete={onDelete} />
        )}
      />
    </Box>
  );
};
