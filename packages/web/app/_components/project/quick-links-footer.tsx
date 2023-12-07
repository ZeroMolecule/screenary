import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { Directory, QuickLink } from '@prisma/client';
import { ExpandedPopover } from './expanded-popover';
import { QuickLinkItem } from './quick-link-item';
import { Button, Group, Space, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID } from '@/utils/constants';
import { QuickLinkFolderItem } from './quick-link-folder-item';
import { QuickLinkType } from './quick-links';

type Props = {
  quickLinks: QuickLink[];
  folders: Directory[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
  onEditOpen: (item: QuickLink | Directory, type: QuickLinkType) => void;
  setPopoverLinkOpen: Dispatch<SetStateAction<boolean>>;
  setPopoverFolderOpen: Dispatch<SetStateAction<boolean>>;
};

export const QuickLinksFooter: FC<Props> = (props) => {
  const {
    t,
    quickLinks,
    folders,
    expanded,
    setExpanded,
    onDeleteOpen,
    onEditOpen,
    setPopoverLinkOpen,
    setPopoverFolderOpen,
  } = useQuickLinksFooter(props);

  const renderFolder = (item: Directory) => (
    <QuickLinkFolderItem
      key={item.id}
      item={item}
      onEditOpen={onEditOpen}
      onDeleteOpen={onDeleteOpen}
      inExpandedView
    />
  );

  const renderQuickLink = (item: QuickLink) => (
    <QuickLinkItem
      key={item.id}
      item={item}
      onEditOpen={onEditOpen}
      onDeleteOpen={onDeleteOpen}
      inExpandedView
    />
  );

  return (
    <ExpandedPopover
      title={t('title')}
      expanded={expanded}
      setExpanded={setExpanded}
      closeOnClickOutside={false}
      portalTarget={PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID}
    >
      <Stack my="lg">
        {folders.map(renderFolder)}
        <Space />
        {quickLinks.map(renderQuickLink)}
      </Stack>
      <Group mt="auto" gap="xs">
        <Button
          variant="transparent"
          size="xs"
          p={0}
          color="white"
          fw={400}
          leftSection={<IconPlus size={16} />}
          onClick={() => setPopoverFolderOpen(true)}
        >
          {t('addFolderAction')}
        </Button>
        <Button
          variant="transparent"
          size="xs"
          p={0}
          color="white"
          fw={400}
          leftSection={<IconPlus size={16} />}
          onClick={() => setPopoverLinkOpen(true)}
        >
          {t('addLinkAction')}
        </Button>
      </Group>
    </ExpandedPopover>
  );
};

function useQuickLinksFooter({
  quickLinks,
  folders,
  expanded,
  setExpanded,
  onDeleteOpen,
  onEditOpen,
  setPopoverLinkOpen,
  setPopoverFolderOpen,
}: Props) {
  const t = useTranslations('project.quickLinks');

  return {
    t,
    quickLinks,
    folders,
    expanded,
    setExpanded,
    onDeleteOpen,
    onEditOpen,
    setPopoverLinkOpen,
    setPopoverFolderOpen,
  };
}
