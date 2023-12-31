import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import {
  ActionIcon,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { TaskPopoverMenu } from './task-popover-menu';
import { AddTaskData } from '@/domain/types/task-data';

type Props = {
  title: ReactNode;
  onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
  isPopoverOpen: boolean;
  onPopoverChange: Dispatch<SetStateAction<boolean>>;
};

export const TasksHeader: FC<Props> = ({
  title,
  onCreate,
  isPopoverOpen,
  onPopoverChange,
}) => {
  return (
    <Group justify="space-between">
      {title}
      <Popover
        opened={isPopoverOpen}
        onChange={onPopoverChange}
        withinPortal={false}
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
            onClose={() => onPopoverChange(false)}
            onCreate={onCreate}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};
