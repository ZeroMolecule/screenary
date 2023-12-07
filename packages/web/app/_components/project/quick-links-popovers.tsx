import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import {
  ActionIcon,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Text } from '../base/text';
import {
  QuickLinkFormValues,
  QuickLinkPopoverMenu,
} from './quick-link-popover-menu';
import { Directory, QuickLink } from '@prisma/client';
import {
  FolderFormValues,
  QuickLinkFolderPopoverMenu,
} from './quick-link-folder-popover-menu';

type Props = {
  popoverLinkOpen: boolean;
  setPopoverLinkOpen: Dispatch<SetStateAction<boolean>>;
  popoverFolderOpen: boolean;
  setPopoverFolderOpen: Dispatch<SetStateAction<boolean>>;
  onEditClose: () => void;
  onLinkSubmit: (values: QuickLinkFormValues) => Promise<void>;
  onFolderSubmit: (values: FolderFormValues) => Promise<void>;
  quickLink?: QuickLink;
  folder?: Directory;
};

export const QuickLinksPopovers: FC<Props> = (props) => {
  const {
    t,
    popoverLinkOpen,
    setPopoverLinkOpen,
    popoverFolderOpen,
    setPopoverFolderOpen,
    handleOnClose,
    onLinkSubmit,
    onFolderSubmit,
    quickLink,
    folder,
  } = useQuickLinksPopovers(props);

  return (
    <Group justify="space-between">
      <Text size="lg" fw={600}>
        {t('title')}
      </Text>
      <Popover
        opened={popoverLinkOpen}
        onChange={setPopoverLinkOpen}
        onClose={handleOnClose}
        withinPortal={false}
        radius={24}
        zIndex={2}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
            onClick={() => setPopoverLinkOpen(true)}
          >
            <IconPlus />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown
          w="auto"
          pos="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <QuickLinkPopoverMenu
            onClose={() => setPopoverLinkOpen(false)}
            onSubmit={onLinkSubmit}
            item={quickLink}
          />
        </PopoverDropdown>
      </Popover>
      <Popover
        opened={popoverFolderOpen}
        onChange={setPopoverFolderOpen}
        onClose={handleOnClose}
        withinPortal={false}
        radius={24}
        zIndex={2}
      >
        <PopoverDropdown
          w="auto"
          pos="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <QuickLinkFolderPopoverMenu
            onClose={() => setPopoverFolderOpen(false)}
            onSubmit={onFolderSubmit}
            item={folder}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};

function useQuickLinksPopovers({
  popoverLinkOpen,
  setPopoverLinkOpen,
  popoverFolderOpen,
  setPopoverFolderOpen,
  onEditClose,
  onLinkSubmit,
  onFolderSubmit,
  quickLink,
  folder,
}: Props) {
  const t = useTranslations('project.quickLinks');

  const handleOnClose = () => {
    if (quickLink || folder) {
      setTimeout(() => {
        onEditClose();
      }, 250);
    } else {
      onEditClose();
    }
  };

  return {
    t,
    popoverLinkOpen,
    setPopoverLinkOpen,
    popoverFolderOpen,
    setPopoverFolderOpen,
    handleOnClose,
    onLinkSubmit,
    onFolderSubmit,
    quickLink,
    folder,
  };
}
