import {
  ActionIcon,
  Box,
  Button,
  Group,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { Directory, QuickLink } from '@prisma/client';
import { IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Dispatch, FC, SetStateAction } from 'react';
import { Popover } from '../../base/popover';
import { Text } from '../../base/text';
import {
  FolderFormValues,
  QuickLinkFolderPopoverMenu,
} from './quick-link-folder-popover-menu';
import {
  QuickLinkFormValues,
  QuickLinkPopoverMenu,
} from './quick-link-popover-menu';
import { QuickLinkPopover } from './quick-links';

type Props = {
  popoverOpen: QuickLinkPopover;
  setPopoverOpen: Dispatch<SetStateAction<QuickLinkPopover>>;
  onEditClose: () => void;
  onLinkSubmit: (values: QuickLinkFormValues) => Promise<void>;
  onFolderSubmit: (values: FolderFormValues) => Promise<void>;
  quickLink?: QuickLink;
  folder?: Directory;
  onClearFolderParams?: () => void;
  isExpanded?: boolean;
};

export const QuickLinksPopovers: FC<Props> = (props) => {
  const {
    t,
    popoverOpen,
    expandedSpacing,
    handleAfterClose,
    handleLinkChange,
    handleFolderChange,
    onLinkSubmit,
    onFolderSubmit,
    quickLink,
    folder,
    onClearFolderParams,
  } = useQuickLinksPopovers(props);

  return (
    <Group justify="space-between">
      <Button
        component={Text}
        size="lg"
        fw={600}
        variant="transparent"
        h="auto"
        p={0}
        onClick={onClearFolderParams}
      >
        {t('title')}
      </Button>
      <Popover
        opened={popoverOpen.link}
        onChange={handleLinkChange}
        withinPortal={false}
        radius={24}
        zIndex={2}
        afterClose={handleAfterClose}
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
          maw={360}
          mah={360}
          ml="auto"
          pos="absolute"
          left={0}
          right={expandedSpacing}
          top={0}
          bottom={expandedSpacing}
        >
          <QuickLinkPopoverMenu
            title={
              quickLink
                ? t('form.link.edit.title')
                : t('form.link.create.title')
            }
            titleLabel={
              quickLink
                ? t('form.link.edit.titleLabel')
                : t('form.link.create.titleLabel')
            }
            linkLabel={
              quickLink
                ? t('form.link.edit.urlLabel')
                : t('form.link.create.urlLabel')
            }
            onClose={() => handleLinkChange(false)}
            onSubmit={onLinkSubmit}
            item={quickLink}
          />
        </PopoverDropdown>
      </Popover>
      <Popover
        opened={popoverOpen.folder}
        onChange={handleFolderChange}
        withinPortal={false}
        radius={24}
        zIndex={2}
        afterClose={handleAfterClose}
      >
        <PopoverTarget>
          <Box display="none" />
        </PopoverTarget>
        <PopoverDropdown
          w="auto"
          maw={350}
          mah={360}
          ml="auto"
          pos="absolute"
          left={0}
          right={expandedSpacing}
          top={0}
          bottom={expandedSpacing}
        >
          <QuickLinkFolderPopoverMenu
            title={
              folder
                ? t('form.folder.edit.title')
                : t('form.folder.create.title')
            }
            label={
              folder
                ? t('form.folder.edit.nameLabel')
                : t('form.folder.create.nameLabel')
            }
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
  onClearFolderParams,
  isExpanded,
}: Props) {
  const t = useTranslations('project.quickLinks');
  const expandedSpacing = isExpanded ? 3 : 0;

  const handleAfterClose = () => onEditClose();

  const handleLinkChange = (value: boolean) => {
    setPopoverOpen((prev) => ({ ...prev, link: value }));
  };
  const handleFolderChange = (value: boolean) => {
    setPopoverOpen((prev) => ({ ...prev, folder: value }));
  };

  return {
    t,
    popoverOpen,
    expandedSpacing,
    handleAfterClose,
    handleLinkChange,
    handleFolderChange,
    onLinkSubmit,
    onFolderSubmit,
    quickLink,
    folder,
    onClearFolderParams,
  };
}
