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
  projectId: string;
  title: ReactNode;
  onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
  isPopoverOpen: boolean;
  onPopoverChange: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
};

export const TasksHeader: FC<Props> = (props) => {
  const { title, onCreate, isPopoverOpen, handlePopoverChange } =
    useTasksHeader(props);

  return (
    <Group justify="space-between">
      {title}
      <Popover
        opened={isPopoverOpen}
        onChange={handlePopoverChange}
        withinPortal={false}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
            onClick={() => handlePopoverChange(true)}
          >
            <IconPlus />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown w="auto" pos="absolute" top={0} right={0} left="unset">
          <TaskPopoverMenu
            onClose={() => handlePopoverChange(false)}
            onCreate={onCreate}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};

function useTasksHeader({
  projectId,
  title,
  onCreate,
  isPopoverOpen,
  onPopoverChange,
}: Props) {
  const handlePopoverChange = (value: boolean) => {
    onPopoverChange({ [projectId]: value });
  };

  return { title, onCreate, isPopoverOpen, handlePopoverChange };
}
