import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Flex, Stack } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { TasksList } from './tasks-list';
import { TasksEmptyPlaceholder } from './tasks-empty-placeholder';
import { ReorderData } from '@/domain/types/reorder-data';
import { HideCompletedTasksButton } from './hide-completed-tasks-button';
import overflowStyles from '@/styles/utils/overflow.module.scss';

type Props = {
  todos: Task[];
  done: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
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
    handleHideCompleted,
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
          <Stack>
            {!!done.length && (
              <>
                <HideCompletedTasksButton
                  isHidden={hideCompleted}
                  onClick={handleHideCompleted}
                />
                {!hideCompleted && (
                  <TasksList
                    title={t('done')}
                    tasks={done}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReorder={onReorder}
                  />
                )}
              </>
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

function useTasksWrapper({ todos, done, onEdit, onDelete, onReorder }: Props) {
  const t = useTranslations('tasks');
  const [hideCompleted, setHideCompleted] = useState(false);

  const isEmpty = !todos.length && !done.length;

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  return {
    t,
    isEmpty,
    todos,
    done,
    onEdit,
    onDelete,
    onReorder,
    hideCompleted,
    handleHideCompleted,
  };
}
