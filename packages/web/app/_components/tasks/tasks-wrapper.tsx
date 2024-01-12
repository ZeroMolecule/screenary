import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Flex, Stack } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { TasksList } from './tasks-list';
import { TasksEmptyPlaceholder } from './tasks-empty-placeholder';
import { ReorderData } from '@/domain/types/reorder-data';
import { HideCompletedTasksButton } from './hide-completed-tasks-button';
import { TaskStatus } from '@prisma/client';
import { Loader } from '../loader';

type Props = {
  results: Task[];
  isLoading: boolean;
  todosExist: boolean;
  doneExist: boolean;
  hiddenCompletedTasks: boolean;
  onHideCompletedTasks: () => void;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
  hideTodoTitle?: boolean;
  hideDoneTitle?: boolean;
};

export const TasksWrapper: FC<Props> = (props) => {
  const {
    t,
    isLoading,
    todos,
    done,
    todosExist,
    doneExist,
    hiddenCompletedTasks,
    onHideCompletedTasks,
    onSelect,
    onEdit,
    onDelete,
    onReorder,
    hideTodoTitle,
    hideDoneTitle,
  } = useTasksWrapper(props);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !todosExist && !doneExist) {
    return (
      <Box h="100%">
        <Flex mih="100%" align="center">
          <TasksEmptyPlaceholder />
        </Flex>
      </Box>
    );
  }

  return (
    <Box h="100%">
      <Stack gap={30} pb="md">
        {todosExist && !!todos.length && (
          <TasksList
            title={!hideTodoTitle ? t('todo') : undefined}
            tasks={todos}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            onReorder={onReorder}
          />
        )}
        {doneExist && (
          <Stack mt="md">
            <HideCompletedTasksButton
              isHidden={hiddenCompletedTasks}
              onClick={onHideCompletedTasks}
            />
            {!!done.length && (
              <TasksList
                title={!hideDoneTitle ? t('done') : undefined}
                tasks={done}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
                onReorder={onReorder}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

function useTasksWrapper({
  results,
  isLoading,
  todosExist,
  doneExist,
  hiddenCompletedTasks,
  onHideCompletedTasks,
  onSelect,
  onEdit,
  onDelete,
  onReorder,
  hideTodoTitle,
  hideDoneTitle,
}: Props) {
  const t = useTranslations('tasks');

  const todos = results.filter((task) => task.status === TaskStatus.TODO);
  const done = results.filter((task) => task.status === TaskStatus.DONE);

  return {
    t,
    isLoading,
    todosExist,
    doneExist,
    todos,
    done,
    hiddenCompletedTasks,
    onHideCompletedTasks,
    onSelect,
    onEdit,
    onDelete,
    onReorder,
    hideTodoTitle,
    hideDoneTitle,
  };
}
