import { ChangeEvent, FC, useState } from 'react';
import { Task } from '@/domain/queries/tasks-query';
import { Checkbox, Group, Stack } from '@mantine/core';
import { TaskStatus } from '@prisma/client';
import { Text } from '../base/text';
import classNames from 'classnames';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  task: Task;
};

export const TaskItem: FC<Props> = (props) => {
  const { task, checked, handleChange } = useTaskItem(props);

  return (
    <Group py="md" align="flex-start" gap="xs" className={styles.taskItem}>
      <Checkbox size="md" checked={checked} onChange={handleChange} />
      <Stack gap={4}>
        <Text
          size="lg"
          fw={600}
          c={checked ? 'neutral.4' : 'neutral.9'}
          className={classNames({ [styles.taskItemDoneTitle]: checked })}
        >
          {task.title}
        </Text>
        <Text ff="secondary" size="sm" c="primary.8">
          {/* TODO: add date */}
          Today, 2:00 PM
        </Text>
      </Stack>
    </Group>
  );
};

function useTaskItem({ task }: Props) {
  const isDone = task.status === TaskStatus.DONE;
  const [checked, setChecked] = useState(isDone);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };

  return { task, checked, handleChange };
}
