import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { Directory, QuickLink } from '@prisma/client';
import { ExpandedPopover } from './expanded-popover';
import { QuickLinkItem } from './quick-link-item';
import { Box, Button, Grid, GridCol, Group, Space, Stack } from '@mantine/core';
import { IconBookmark, IconPlus } from '@tabler/icons-react';
import { PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID } from '@/utils/constants';
import { QuickLinkFolderItem } from './quick-link-folder-item';
import { QuickLinkPopover, QuickLinkType } from './quick-links';
import { Text } from '../base/text';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  quickLinks: QuickLink[];
  folders: Directory[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
  onEditOpen: (item: QuickLink | Directory, type: QuickLinkType) => void;
  setPopoverOpen: Dispatch<SetStateAction<QuickLinkPopover>>;
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
    setPopoverOpen,
  } = useQuickLinksFooter(props);

  const renderFolder = (item: Directory) => (
    <GridCol key={item.id} span={4}>
      <QuickLinkFolderItem
        item={item}
        onEditOpen={onEditOpen}
        onDeleteOpen={onDeleteOpen}
        inExpandedView
      />
    </GridCol>
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
        {!!folders.length && (
          <Stack>
            <Group gap="xs">
              <Box
                w={21}
                h={21}
                bg="neutral.2"
                className={styles.quickLinkFolderIconBlock}
              >
                <IconBookmark size={16} />
              </Box>
              <Text size="sm" c="white" fw={600}>
                {t('foldersTitle')}
              </Text>
            </Group>
            <Grid>{folders.map(renderFolder)}</Grid>
          </Stack>
        )}
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
          onClick={() => setPopoverOpen((prev) => ({ ...prev, folder: true }))}
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
          onClick={() => setPopoverOpen((prev) => ({ ...prev, link: true }))}
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
  setPopoverOpen,
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
    setPopoverOpen,
  };
}
