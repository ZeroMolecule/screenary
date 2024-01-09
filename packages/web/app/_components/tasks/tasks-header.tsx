import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
  ActionIcon,
  Group,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Task } from '@prisma/client';
import { TaskPopoverMenu } from './task-popover-menu';
import { Popover } from '../base/popover';

type Props = {
  title: ReactNode;
  onSubmit: (task: Pick<Task, 'title' | 'dueDate'>) => Promise<void>;
  isPopoverOpen: boolean;
  onPopoverChange: (value: boolean) => void;
  popoverAfterClose?: () => void;
  task?: Task;
};

export const TasksHeader: FC<Props> = (props) => {
  const {
    t,
    title,
    onSubmit,
    isPopoverOpen,
    onPopoverChange,
    task,
    popoverAfterClose,
  } = useTasksHeader(props);

  return (
    <Group justify="space-between">
      {title}
      <Popover
        opened={isPopoverOpen}
        onChange={onPopoverChange}
        withinPortal={false}
        afterClose={popoverAfterClose}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
            onClick={() => onPopoverChange(true)}
          >
            <IconPlus />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown w="auto" pos="absolute" top={0} right={0} left="unset">
          <TaskPopoverMenu
            title={task ? t('form.edit.title') : t('form.create.title')}
            onClose={() => onPopoverChange(false)}
            onSubmit={onSubmit}
            task={task}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};

function useTasksHeader({
  title,
  onSubmit,
  isPopoverOpen,
  onPopoverChange,
  task,
  popoverAfterClose,
}: Props) {
  const t = useTranslations('task');

  return {
    t,
    title,
    onSubmit,
    isPopoverOpen,
    onPopoverChange,
    task,
    popoverAfterClose,
  };
}
