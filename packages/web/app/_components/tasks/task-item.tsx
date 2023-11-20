import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { Task } from '@/domain/queries/tasks-query';
import { Checkbox, Group, Stack, TextInput } from '@mantine/core';
import { TaskStatus } from '@prisma/client';
import { Text } from '../base/text';
import classNames from 'classnames';
import flexStyles from '@/styles/utils/flex.module.scss';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  task: Task;
};

export const TaskItem: FC<Props> = (props) => {
  const { inputRef, task, checked, handleChange, handleFocus, handleEnter } =
    useTaskItem(props);

  return (
    <Group py="md" align="flex-start" gap="xs" className={styles.taskItem}>
      <Checkbox size="md" checked={checked} onChange={handleChange} />
      <Stack gap={4} className={flexStyles['flex-1']} onClick={handleFocus}>
        <TextInput
          ref={inputRef}
          size="lg"
          fw={600}
          defaultValue={task.title}
          classNames={{
            input: classNames(styles.input, {
              [styles.inputDone]: checked,
            }),
            wrapper: styles.inputWrapper,
          }}
          onKeyDown={handleEnter}
        />
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(isDone);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = inputRef.current?.value;
      inputRef.current?.blur();
      console.log(value);
    }
  };

  return { inputRef, task, checked, handleChange, handleFocus, handleEnter };
}
