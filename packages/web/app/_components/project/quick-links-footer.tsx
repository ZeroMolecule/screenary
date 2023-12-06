import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { Directory, QuickLink } from '@prisma/client';
import { ExpandedPopover } from './expanded-popover';
import { QuickLinkItem } from './quick-link-item';
import { Button, Group, Space, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID } from '@/utils/constants';
import { QuickLinkFolderItem } from './quick-link-folder-item';

type Props = {
  quickLinks: QuickLink[];
  folders: Directory[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  setPopoverLinkOpen: Dispatch<SetStateAction<boolean>>;
  setPopoverFolderOpen: Dispatch<SetStateAction<boolean>>;
  onLinkEditOpen: (link: QuickLink) => void;
  onLinkDeleteOpen: (id: string) => void;
  onFolderEditOpen: (folder: Directory) => void;
  onFolderDeleteOpen: (id: string) => void;
};

export const QuickLinksFooter: FC<Props> = (props) => {
  const {
    t,
    quickLinks,
    folders,
    expanded,
    setExpanded,
    setPopoverLinkOpen,
    setPopoverFolderOpen,
    onLinkEditOpen,
    onLinkDeleteOpen,
    onFolderEditOpen,
    onFolderDeleteOpen,
  } = useQuickLinksFooter(props);

  const renderFolder = (item: Directory) => (
    <QuickLinkFolderItem
      key={item.id}
      item={item}
      onEditOpen={onFolderEditOpen}
      onDeleteOpen={onFolderDeleteOpen}
      inExpandedView
    />
  );

  const renderQuickLink = (item: QuickLink) => (
    <QuickLinkItem
      key={item.id}
      item={item}
      onEditOpen={onLinkEditOpen}
      onDeleteOpen={onLinkDeleteOpen}
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
  setPopoverLinkOpen,
  setPopoverFolderOpen,
  onLinkEditOpen,
  onLinkDeleteOpen,
  onFolderEditOpen,
  onFolderDeleteOpen,
}: Props) {
  const t = useTranslations('project.quickLinks');

  return {
    t,
    quickLinks,
    folders,
    expanded,
    setExpanded,
    setPopoverLinkOpen,
    setPopoverFolderOpen,
    onLinkEditOpen,
    onLinkDeleteOpen,
    onFolderEditOpen,
    onFolderDeleteOpen,
  };
}
