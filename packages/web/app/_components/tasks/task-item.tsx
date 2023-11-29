import { FC, KeyboardEvent, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Checkbox, Group, Stack, TextInput } from '@mantine/core';
import { Task } from '@/domain/queries/tasks-query';
import { TaskStatus } from '@prisma/client';
import dayjs from 'dayjs';
import { formatDate } from '@/utils/datetime';
import { Text } from '../base/text';
import classNames from 'classnames';
import flexStyles from '@/styles/utils/flex.module.scss';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  task: Task;
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export const TaskItem: FC<Props> = (props) => {
  const {
    inputRef,
    task,
    isDone,
    date,
    handleFocus,
    handleStatusChange,
    handleEnter,
  } = useTaskItem(props);

  return (
    <Group py="md" align="flex-start" gap="xs" className={styles.taskItem}>
      <Checkbox
        size="md"
        defaultChecked={isDone}
        onClick={handleStatusChange}
      />
      <Stack gap={4} className={flexStyles['flex-1']} onClick={handleFocus}>
        <TextInput
          ref={inputRef}
          size="lg"
          fw={600}
          defaultValue={task.title}
          classNames={{
            input: classNames(styles.input, {
              [styles.inputDone]: isDone,
            }),
            wrapper: styles.inputWrapper,
          }}
          onKeyDown={handleEnter}
        />
        <Text ff="secondary" size="sm" c="primary.8">
          {date}
        </Text>
      </Stack>
    </Group>
  );
};

function useTaskItem({ task, onEdit, onDelete }: Props) {
  const t = useTranslations('task');
  const isDone = task.status === TaskStatus.DONE;
  const inputRef = useRef<HTMLInputElement>(null);

  const formatDateMessage = useMemo(() => {
    if (!task.dueDate) {
      return '';
    }
    const dueDate = dayjs(task.dueDate);
    const today = dueDate.isSame(dayjs(), 'day');
    const tomorrow = dueDate.isSame(dayjs().add(1, 'day'), 'day');
    if (!today && !tomorrow) {
      return formatDate(
        dueDate.toDate(),
        'dateTimeWithLongDayMonthWithoutYear'
      );
    }
    return t('dueDate.message', {
      day: t(`dueDate.day.${today ? 'today' : 'tomorrow'}`),
      time: formatDate(dueDate.toDate(), 'timeWith12HourClock'),
    });
  }, [t, task.dueDate]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleStatusChange = async () => {
    await onEdit({
      ...task,
      status: isDone ? TaskStatus.TODO : TaskStatus.DONE,
    });
  };

  const handleEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = inputRef.current?.value;
      if (!value) {
        await onDelete(task.id);
      } else {
        await onEdit({ ...task, title: value });
      }
      inputRef.current?.blur();
    }
  };

  return {
    inputRef,
    task,
    isDone,
    date: formatDateMessage,
    handleFocus,
    handleStatusChange,
    handleEnter,
  };
}
