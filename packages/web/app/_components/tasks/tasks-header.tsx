import { FC } from 'react';
import { ActionIcon, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Title } from '../base/title';
import { TaskPopover } from './task-popover';
import { AddTaskData } from '@/domain/types/task-data';

type Props = {
  projectName: string;
  onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
  isPopoverOpen: boolean;
  onOpenPopover: () => void;
  onClosePopover: () => void;
};

export const TasksHeader: FC<Props> = ({
  projectName,
  onCreate,
  isPopoverOpen,
  onOpenPopover,
  onClosePopover,
}) => {
  return (
    <Group justify="space-between">
      <Title order={3} fw={600}>
        {projectName}
      </Title>
      <ActionIcon
        variant="transparent"
        color="var(--mantine-color-neutral-9)"
        onClick={onOpenPopover}
      >
        <IconPlus />
      </ActionIcon>
      {isPopoverOpen && (
        <TaskPopover onClose={onClosePopover} onCreate={onCreate} />
      )}
    </Group>
  );
};
