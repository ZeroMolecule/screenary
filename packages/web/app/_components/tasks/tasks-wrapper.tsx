import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Box, Flex, Stack } from '@mantine/core';
import { TaskStatus } from '@prisma/client';
import { groupBy } from 'lodash';
import { Task } from '@/domain/queries/tasks-query';
import { EmptyPlaceholder } from '../empty-placeholder';
import { TasksList } from './tasks-list';
import emptyIcon from '@/public/images/check-icon.svg';
import overflowStyles from '@/styles/utils/overflow.module.scss';

type Props = {
  tasks: Task[];
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
          <EmptyPlaceholder
            title={t('empty.title')}
            description={t('empty.description')}
            image={<Image src={emptyIcon} width={140} height={140} alt="" />}
          />
        </Flex>
      ) : (
        <Stack gap={46}>
          {todos && (
            <TasksList
              title={t('todo')}
              tasks={todos}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
          {!hideCompleted && done && (
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

function useTasksWrapper({ tasks, onEdit, onDelete, hideCompleted }: Props) {
  const t = useTranslations('tasks');

  const isEmpty = !tasks.length;
  const results = groupBy(tasks, 'status');
  const todos = results[TaskStatus.TODO];
  const done = results[TaskStatus.DONE];

  return { t, isEmpty, todos, done, onEdit, onDelete, hideCompleted };
}
