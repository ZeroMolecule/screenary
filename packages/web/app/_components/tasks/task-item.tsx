import { FC, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Checkbox, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Task } from '@/domain/queries/tasks-query';
import { TaskStatus } from '@prisma/client';
import dayjs from 'dayjs';
import { formatDate } from '@/utils/datetime';
import { Text } from '../base/text';
import { ProjectMenu } from '../project/project-menu';
import { ConfirmDeleteModal } from '../modals/confirm-delete-modal';
import classNames from 'classnames';
import flexStyles from '@/styles/utils/flex.module.scss';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  task: Task;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export const TaskItem: FC<Props> = (props) => {
  const {
    t,
    isDone,
    hovered,
    setHovered,
    task,
    isDeleteOpen,
    openDelete,
    closeDelete,
    date,
    handleSelect,
    handleStatusChange,
    handleDelete,
  } = useTaskItem(props);

  return (
    <>
      <Group
        py="md"
        align="flex-start"
        gap="xs"
        className={styles.taskItem}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Checkbox
          size="md"
          defaultChecked={isDone}
          onClick={handleStatusChange}
        />
        <Stack gap={4} className={flexStyles['flex-1']}>
          <Text
            size="lg"
            fw={600}
            lh="unset"
            className={classNames({ [styles.inputDone]: isDone })}
          >
            {task.title}
          </Text>
          <Text ff="secondary" size="sm" c="primary.8">
            {date}
          </Text>
        </Stack>
        {hovered && (
          <ProjectMenu
            openEditModal={handleSelect}
            openDeleteModal={openDelete}
            position="left-start"
            withinPortal={false}
            small
          />
        )}
      </Group>
      <ConfirmDeleteModal
        opened={isDeleteOpen}
        onClose={closeDelete}
        onSubmit={handleDelete}
        title={t('deleteTitle')}
      />
    </>
  );
};

function useTaskItem({ task, onSelect, onEdit, onDelete }: Props) {
  const t = useTranslations('task');
  const isDone = task.status === TaskStatus.DONE;
  const [hovered, setHovered] = useState(false);
  const [isDeleteOpen, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

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

  const handleSelect = () => {
    onSelect(task);
    setHovered(false);
  };

  const handleStatusChange = async () => {
    await onEdit({
      ...task,
      status: isDone ? TaskStatus.TODO : TaskStatus.DONE,
    });
  };

  const handleDelete = async () => {
    await onDelete(task.id);
  };

  return {
    t,
    isDone,
    hovered,
    setHovered,
    task,
    isDeleteOpen,
    openDelete,
    closeDelete,
    date: formatDateMessage,
    handleSelect,
    handleStatusChange,
    handleDelete,
  };
}
