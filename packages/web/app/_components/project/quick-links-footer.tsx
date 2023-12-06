import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { QuickLink } from '@prisma/client';
import { ExpandedPopover } from './expanded-popover';
import { QuickLinkItem } from './quick-link-item';
import { Button, Group, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID } from '@/utils/constants';

type Props = {
  items: QuickLink[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  setPopoverOpen: Dispatch<SetStateAction<boolean>>;
  onEditOpen: (link: QuickLink) => void;
  onDeleteOpen: (id: string) => void;
};

export const QuickLinksFooter: FC<Props> = (props) => {
  const {
    t,
    items,
    expanded,
    setExpanded,
    setPopoverOpen,
    onEditOpen,
    onDeleteOpen,
  } = useQuickLinksFooter(props);

  const renderItem = (item: QuickLink) => (
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
      <Stack my="lg">{items.map(renderItem)}</Stack>
      <Group mt="auto" gap="xs">
        <Button
          variant="transparent"
          size="xs"
          p={0}
          color="white"
          fw={400}
          leftSection={<IconPlus size={16} />}
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
          onClick={() => setPopoverOpen(true)}
        >
          {t('addLinkAction')}
        </Button>
      </Group>
    </ExpandedPopover>
  );
};

function useQuickLinksFooter({
  items,
  expanded,
  setExpanded,
  setPopoverOpen,
  onEditOpen,
  onDeleteOpen,
}: Props) {
  const t = useTranslations('project.quickLinks');

  return {
    t,
    items,
    expanded,
    setExpanded,
    setPopoverOpen,
    onEditOpen,
    onDeleteOpen,
  };
}
