import { FC } from 'react';
import { Box, Stack } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { Text } from '../base/text';
import { TaskItem } from './task-item';

type Props = {
  title: string;
  tasks: Task[];
};

export const TasksList: FC<Props> = (props) => {
  const { title, tasks } = useTasksList(props);

  const renderTask = (task: Task) => <TaskItem key={task.id} task={task} />;

  return (
    <Box>
      <Text size="lg" fw={600}>
        {title}
      </Text>
      <Stack gap={0}>{tasks.map(renderTask)}</Stack>
    </Box>
  );
};

function useTasksList({ title, tasks }: Props) {
  return { title, tasks };
}
