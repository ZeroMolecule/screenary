import { Dispatch, FC, SetStateAction } from 'react';
import {
  ActionIcon,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { IconArrowsMaximize } from '@tabler/icons-react';
import { Note } from '@prisma/client';
import { NotesExpanded } from './notes-expanded';

type Props = {
  notes: Note[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onOpenDelete: (id: string) => void;
  onCreate: () => Promise<void>;
  onEdit: (note: Note) => Promise<void>;
};

export const NotesFooter: FC<Props> = ({
  notes,
  expanded,
  setExpanded,
  onOpenDelete,
  onCreate,
  onEdit,
}) => {
  return (
    <Group justify="flex-end">
      <Popover
        opened={expanded}
        onChange={setExpanded}
        withinPortal={false}
        radius={24}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="neutral.5"
            onClick={() => setExpanded(true)}
          >
            <IconArrowsMaximize />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown w="100%" h="100%" pos="absolute" top={0} right={0}>
          <NotesExpanded
            notes={notes}
            onClose={() => setExpanded(false)}
            onOpenDelete={onOpenDelete}
            onCreate={onCreate}
            onEdit={onEdit}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};
