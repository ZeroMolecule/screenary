import { ReorderData } from '@/domain/types/reorder-data';
import emptyIcon from '@/public/images/link-icon.svg';
import styles from '@/styles/components/quick-links.module.scss';
import stylesOverflow from '@/styles/utils/overflow.module.scss';
import { PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID } from '@/utils/constants';
import {
  Box,
  Button,
  Center,
  Grid,
  GridCol,
  Group,
  Stack,
} from '@mantine/core';
import { Directory, QuickLink } from '@prisma/client';
import { IconBookmark, IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction } from 'react';
import { Text } from '../../base/text';
import { EmptyPlaceholder } from '../../empty-placeholder';
import { FolderIcon } from '../../icons/folder-icon';
import { ReorderList } from '../../reorder-list';
import { ExpandedPopover } from '../expanded-popover';
import { QuickLinkFolderItem } from './quick-link-folder-item';
import { QuickLinkItem } from './quick-link-item';
import { QuickLinkPopover, QuickLinkType } from './quick-links';

type Props = {
  quickLinks: QuickLink[];
  folders: Directory[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
  onEditOpen: (item: QuickLink | Directory, type: QuickLinkType) => void;
  setPopoverOpen: Dispatch<SetStateAction<QuickLinkPopover>>;
  onLinkRefresh: (link: QuickLink) => void;
  onLinkReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
  onClearFolderParams?: () => void;
  selectedFolder?: Directory | null;
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
    onLinkRefresh,
    onLinkReorder,
    onClearFolderParams,
    selectedFolder,
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

  return (
    <ExpandedPopover
      title={t('title')}
      expanded={expanded}
      setExpanded={setExpanded}
      closeOnClickOutside={false}
      portalTarget={PROJECT_EXPANDED_QUICK_LINKS_CONTAINER_ID}
      onTitleClick={onClearFolderParams}
    >
      <Stack h="100%" my="lg" className={stylesOverflow['overflow-auto']}>
        {(!!folders.length || selectedFolder) && (
          <Stack>
            <Group gap="xs">
              <Box
                w={21}
                h={21}
                bg="neutral.2"
                className={styles.quickLinkFolderIconBlock}
              >
                {selectedFolder ? (
                  <FolderIcon
                    width={16}
                    height={16}
                    color="var(--mantine-color-neutral-9)"
                  />
                ) : (
                  <IconBookmark size={16} />
                )}
              </Box>
              <Text size="sm" c="white" fw={600}>
                {selectedFolder ? selectedFolder.name : t('foldersTitle')}
              </Text>
            </Group>
            <Grid>{folders.map(renderFolder)}</Grid>
          </Stack>
        )}
        {!quickLinks.length ? (
          <Center h="100%">
            <EmptyPlaceholder
              title={t('empty.title')}
              description={t('empty.description')}
              image={<Image src={emptyIcon} width={80} height={80} alt="" />}
              maxWidth={400}
              dark
            />
          </Center>
        ) : (
          <ReorderList<QuickLink>
            data={quickLinks}
            droppableId="quick-links"
            onReorder={onLinkReorder}
            renderComponentItem={(item) => (
              <QuickLinkItem
                item={item}
                onEditOpen={onEditOpen}
                onDeleteOpen={onDeleteOpen}
                onRefresh={onLinkRefresh}
                inExpandedView
              />
            )}
            itemWrapper={
              <Box
                className={classNames(
                  styles.quickLinkWrapper,
                  styles.quickLinkWrapperExpanded
                )}
              />
            }
          />
        )}
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
  onLinkRefresh,
  onLinkReorder,
  onClearFolderParams,
  selectedFolder,
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
    onLinkRefresh,
    onLinkReorder,
    onClearFolderParams,
    selectedFolder,
  };
}
