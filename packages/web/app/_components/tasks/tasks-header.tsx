import { Dispatch, FC, SetStateAction } from 'react';
import {
  ActionIcon,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Title } from '../base/title';
import { TaskPopoverMenu } from './task-popover-menu';
import { AddTaskData } from '@/domain/types/task-data';

type Props = {
  projectName: string;
  onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
  isPopoverOpen: boolean;
  onPopoverChange: Dispatch<SetStateAction<boolean>>;
};

export const TasksHeader: FC<Props> = ({
  projectName,
  onCreate,
  isPopoverOpen,
  onPopoverChange,
}) => {
  return (
    <Group justify="space-between">
      <Title order={3} fw={600}>
        {projectName}
      </Title>
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
        <PopoverDropdown w="auto" pos="absolute" top={0} right={0}>
          <TaskPopoverMenu
            onClose={() => onPopoverChange(false)}
            onCreate={onCreate}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};
