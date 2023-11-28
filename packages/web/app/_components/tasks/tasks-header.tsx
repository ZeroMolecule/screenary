import { FC } from 'react';
import { ActionIcon, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Title } from '../base/title';
import { TaskPopover } from './task-popover';
import { useDisclosure } from '@mantine/hooks';
import { AddTaskData } from '@/domain/types/task-data';

type Props = {
  projectName: string;
  onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
};

export const TasksHeader: FC<Props> = (props) => {
  const { projectName, isPopoverOpen, openPopover, closePopover, onCreate } =
    useTasksHeader(props);

  return (
    <Group justify="space-between">
      <Title order={3} fw={600}>
        {projectName}
      </Title>
      <ActionIcon
        variant="transparent"
        color="var(--mantine-color-neutral-9)"
        onClick={openPopover}
      >
        <IconPlus />
      </ActionIcon>
      {isPopoverOpen && (
        <TaskPopover onClose={closePopover} onCreate={onCreate} />
      )}
    </Group>
  );
};

function useTasksHeader({ projectName, onCreate }: Props) {
  const [isPopoverOpen, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  return { projectName, isPopoverOpen, openPopover, closePopover, onCreate };
}
