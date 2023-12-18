import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Flex, Stack } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { TasksList } from './tasks-list';
import { TasksEmptyPlaceholder } from './tasks-empty-placeholder';
import { ReorderTaskData } from '@/domain/types/task-data';
import overflowStyles from '@/styles/utils/overflow.module.scss';

type Props = {
  todos: Task[];
  done: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (data: Pick<ReorderTaskData, 'data'>) => Promise<void>;
  hideCompleted: boolean;
};

export const TasksWrapper: FC<Props> = (props) => {
  const {
    t,
    isEmpty,
    todos,
    done,
    onEdit,
    onDelete,
    onReorder,
    hideCompleted,
  } = useTasksWrapper(props);

  return (
    <Box h="100%" className={overflowStyles['overflow-auto']}>
      {isEmpty ? (
        <Flex mih="100%" align="center">
          <TasksEmptyPlaceholder />
        </Flex>
      ) : (
        <Stack gap={46}>
          {!!todos.length && (
            <TasksList
              title={t('todo')}
              tasks={todos}
              onEdit={onEdit}
              onDelete={onDelete}
              onReorder={onReorder}
            />
          )}
          {!hideCompleted && !!done.length && (
            <TasksList
              title={t('done')}
              tasks={done}
              onEdit={onEdit}
              onDelete={onDelete}
              onReorder={onReorder}
            />
          )}
        </Stack>
      )}
    </Box>
  );
};

function useTasksWrapper({
  todos,
  done,
  onEdit,
  onDelete,
  onReorder,
  hideCompleted,
}: Props) {
  const t = useTranslations('tasks');
  const isEmpty = !todos.length && !done.length;

  return {
    t,
    isEmpty,
    todos,
    done,
    onEdit,
    onDelete,
    onReorder,
    hideCompleted,
  };
}
