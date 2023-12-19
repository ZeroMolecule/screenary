import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Button, Flex, Stack } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Task } from '@/domain/queries/tasks-query';
import { TasksList } from './tasks-list';
import { TasksEmptyPlaceholder } from './tasks-empty-placeholder';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  todos: Task[];
  done: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export const TasksWrapper: FC<Props> = (props) => {
  const {
    t,
    isEmpty,
    todos,
    done,
    onEdit,
    onDelete,
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
            />
          )}
          <Stack>
            <Button
              size="sm"
              variant="subtle"
              bg="white"
              c="neutral.7"
              radius={6}
              leftSection={
                hideCompleted ? <IconEye size={20} /> : <IconEyeOff size={20} />
              }
              className={styles.hideButton}
              onClick={handleHideCompleted}
            >
              {hideCompleted ? t('showAction') : t('hideAction')}
            </Button>
            {!hideCompleted && !!done.length && (
              <TasksList
                title={t('done')}
                tasks={done}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

function useTasksWrapper({ todos, done, onEdit, onDelete }: Props) {
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
    hideCompleted,
    handleHideCompleted,
  };
}
