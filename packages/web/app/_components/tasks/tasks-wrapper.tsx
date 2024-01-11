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
  hiddenCompletedTasks: boolean;
  onHideCompletedTasks: () => void;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
};

export const TasksWrapper: FC<Props> = (props) => {
  const {
    t,
    isLoading,
    isEmpty,
    todos,
    done,
    hiddenCompletedTasks,
    onHideCompletedTasks,
    onSelect,
    onEdit,
    onDelete,
    onReorder,
  } = useTasksWrapper(props);

  return (
    <Box h="100%">
      {isLoading ? (
        <Loader />
      ) : (
        <Stack gap={46} pb="md">
          {!!todos.length && (
            <TasksList
              title={t('todo')}
              tasks={todos}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
              onReorder={onReorder}
            />
          )}
          <Stack>
            <>
              <HideCompletedTasksButton
                isHidden={hiddenCompletedTasks}
                onClick={onHideCompletedTasks}
              />
              {!!done.length && (
                <TasksList
                  title={t('done')}
                  tasks={done}
                  onSelect={onSelect}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReorder={onReorder}
                />
              )}
            </>
          </Stack>
        </Stack>
      )}
      {!isLoading && isEmpty && (
        <Flex mih="100%" align="center">
          <TasksEmptyPlaceholder />
        </Flex>
      )}
    </Box>
  );
};

function useTasksWrapper({
  results,
  isLoading,
  hiddenCompletedTasks,
  onHideCompletedTasks,
  onSelect,
  onEdit,
  onDelete,
  onReorder,
}: Props) {
  const t = useTranslations('tasks');

  const todos = results.filter((task) => task.status === TaskStatus.TODO);
  const done = results.filter((task) => task.status === TaskStatus.DONE);
  const isEmpty = !results.length;

  return {
    t,
    isLoading,
    isEmpty,
    todos,
    done,
    hiddenCompletedTasks,
    onHideCompletedTasks,
    onSelect,
    onEdit,
    onDelete,
    onReorder,
  };
}
