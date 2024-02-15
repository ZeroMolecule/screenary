import styles from '@/styles/components/quick-links.module.scss';
import { Button } from '@mantine/core';
import { QuickLink } from '@prisma/client';
import { IconLink } from '@tabler/icons-react';
import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import { ProjectMenu } from '../project-menu';
import { QuickLinkType } from './quick-links';

type Props = {
  item: QuickLink;
  onEditOpen: (link: QuickLink, type: QuickLinkType) => void;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
  onRefresh: (link: QuickLink) => void;
  inExpandedView?: boolean;
};

export const QuickLinkItem: FC<Props> = (props) => {
  const {
    url,
    title,
    favicon,
    handleEditOpen,
    handleDeleteOpen,
    handleRefresh,
    inExpandedView,
  } = useQuickLinkItem(props);

  return (
    <Button
      component="a"
      href={url}
      target="_blank"
      size="sm"
      variant="transparent"
      w="100%"
      p="xs"
      radius="md"
      c={inExpandedView ? 'white' : 'neutral.9'}
      bg={inExpandedView ? 'transparent' : 'neutral.0'}
      fw={400}
      leftSection={
        favicon ? (
          <Image
            loader={() => favicon}
            src={favicon}
            width={16}
            height={16}
            alt={title ?? ''}
            unoptimized
          />
        ) : (
          <IconLink size={16} color="var(--mantine-color-primary-3)" />
        )
      }
      rightSection={
        <ProjectMenu
          openEditModal={handleEditOpen}
          openDeleteModal={handleDeleteOpen}
          position="left-start"
          small
        />
      }
      className={classNames(styles.quickLink, {
        [styles.quickLinkExpandedView]: inExpandedView,
      })}
      classNames={{ label: styles.quickLinkLabel }}
      onClick={handleRefresh}
    >
      {title}
    </Button>
  );
};

function useQuickLinkItem({
  item,
  onEditOpen,
  onDeleteOpen,
  onRefresh,
  inExpandedView,
}: Props) {
  const { id, url, title, icon } = item;

  const handleEditOpen = () => onEditOpen(item, 'link');
  const handleDeleteOpen = () => onDeleteOpen(id, 'link');

  const handleRefresh = () => onRefresh(item);

  return {
    url,
    title: title ?? url,
    favicon: icon,
    handleEditOpen,
    handleDeleteOpen,
    handleRefresh,
    inExpandedView,
  };
}
