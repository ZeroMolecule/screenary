import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Flex, Stack } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { TasksList } from './tasks-list';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import { TasksEmptyPlaceholder } from './tasks-empty-placeholder';

type Props = {
  todos: Task[];
  done: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  hideCompleted: boolean;
};

export const TasksWrapper: FC<Props> = (props) => {
  const { t, isEmpty, todos, done, onEdit, onDelete, hideCompleted } =
    useTasksWrapper(props);

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
            />
          )}
          {!hideCompleted && !!done.length && (
            <TasksList
              title={t('done')}
              tasks={done}
              onEdit={onEdit}
              onDelete={onDelete}
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
  hideCompleted,
}: Props) {
  const t = useTranslations('tasks');
  const isEmpty = !todos.length && !done.length;

  return { t, isEmpty, todos, done, onEdit, onDelete, hideCompleted };
}
