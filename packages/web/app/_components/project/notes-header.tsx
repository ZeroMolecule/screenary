import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import {
  ActionIcon,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { IconInbox, IconPlus } from '@tabler/icons-react';
import { Note } from '@prisma/client';
import { NotesExpanded } from './notes-expanded';
import { Text } from '../base/text';

type Props = {
  notes: Note[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onOpenDelete: (id: string) => void;
  onCreate: () => Promise<void>;
  onEdit: (note: Note) => Promise<void>;
};

export const NotesHeader: FC<Props> = (props) => {
  const { t, notes, expanded, setExpanded, onOpenDelete, onCreate, onEdit } =
    useNotesHeader(props);

  return (
    <Group justify="space-between">
      <Group gap="xs">
        <IconInbox size={24} color="var(--mantine-color-primary-8)" />
        <Text size="lg" fw={600}>
          {t('title')}
        </Text>
      </Group>
      <Popover
        opened={expanded}
        onChange={setExpanded}
        withinPortal={false}
        radius={24}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
            onClick={onCreate}
          >
            <IconPlus />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          right={0}
          style={{ borderRadius: 'rem(24)' }}
        >
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

function useNotesHeader({
  notes,
  expanded,
  setExpanded,
  onOpenDelete,
  onCreate,
  onEdit,
}: Props) {
  const t = useTranslations('project.notes');

  return {
    t,
    notes,
    expanded,
    setExpanded,
    onOpenDelete,
    onCreate,
    onEdit,
  };
}
