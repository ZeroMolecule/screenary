import { FC } from 'react';
import { Box, Stack } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { Text } from '../base/text';
import { TaskItem } from './task-item';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  title?: string;
};

export const TasksList: FC<Props> = ({ title, tasks, onEdit, onDelete }) => {
  const renderTask = (task: Task) => (
    <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
  );

  return (
    <Box>
      <Text size="lg" fw={600}>
        {title}
      </Text>
      <Stack gap={0}>{tasks.map(renderTask)}</Stack>
    </Box>
  );
};
