import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import {
  ActionIcon,
  Box,
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
import { QuickLinkPopover } from './quick-links';

type Props = {
  popoverOpen: QuickLinkPopover;
  setPopoverOpen: Dispatch<SetStateAction<QuickLinkPopover>>;
  onEditClose: () => void;
  onLinkSubmit: (values: QuickLinkFormValues) => Promise<void>;
  onFolderSubmit: (values: FolderFormValues) => Promise<void>;
  quickLink?: QuickLink;
  folder?: Directory;
};

export const QuickLinksPopovers: FC<Props> = (props) => {
  const {
    t,
    popoverOpen,
    handleOnClose,
    handleLinkChange,
    handleFolderChange,
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
        opened={popoverOpen.link}
        onChange={handleLinkChange}
        onClose={handleOnClose}
        withinPortal={false}
        radius={24}
        zIndex={2}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
            onClick={() => handleLinkChange(true)}
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
            onClose={() => handleLinkChange(false)}
            onSubmit={onLinkSubmit}
            item={quickLink}
          />
        </PopoverDropdown>
      </Popover>
      <Popover
        opened={popoverOpen.folder}
        onChange={handleFolderChange}
        onClose={handleOnClose}
        withinPortal={false}
        radius={24}
        zIndex={2}
      >
        <PopoverTarget>
          <Box display="none" />
        </PopoverTarget>
        <PopoverDropdown
          w="auto"
          pos="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <QuickLinkFolderPopoverMenu
            onClose={() => handleFolderChange(false)}
            onSubmit={onFolderSubmit}
            item={folder}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};

function useQuickLinksPopovers({
  popoverOpen,
  setPopoverOpen,
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

  const handleLinkChange = (value: boolean) => {
    setPopoverOpen((prev) => ({ ...prev, link: value }));
  };
  const handleFolderChange = (value: boolean) => {
    setPopoverOpen((prev) => ({ ...prev, folder: value }));
  };

  return {
    t,
    popoverOpen,
    handleOnClose,
    handleLinkChange,
    handleFolderChange,
    onLinkSubmit,
    onFolderSubmit,
    quickLink,
    folder,
  };
}
