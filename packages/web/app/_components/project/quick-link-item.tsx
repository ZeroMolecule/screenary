import { FC, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { QuickLink } from '@prisma/client';
import { ProjectMenu } from './project-menu';
import { QuickLinkType } from './quick-links';
import { useQuery } from '@tanstack/react-query';
import { quickLinkDataQuery } from '@/domain/queries/quick-link-data-query';
import { load } from 'cheerio';
import classNames from 'classnames';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  item: QuickLink;
  onEditOpen: (link: QuickLink, type: QuickLinkType) => void;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
  inExpandedView?: boolean;
};

export const QuickLinkItem: FC<Props> = (props) => {
  const {
    url,
    title,
    faviconPath,
    isLoading,
    handleEditOpen,
    handleDeleteOpen,
    inExpandedView,
  } = useQuickLinkItem(props);

  if (isLoading) {
    return null;
  }

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
        faviconPath ? (
          <Image
            loader={() => faviconPath}
            src={faviconPath}
            width={16}
            height={16}
            alt={title}
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
    >
      {title}
    </Button>
  );
};

function useQuickLinkItem({
  item,
  onEditOpen,
  onDeleteOpen,
  inExpandedView,
}: Props) {
  const { id, url } = item;

  const handleEditOpen = () => onEditOpen(item, 'link');
  const handleDeleteOpen = () => onDeleteOpen(id, 'link');

  const { data, isLoading } = useQuery({
    queryKey: quickLinkDataQuery.key(id),
    queryFn: () => quickLinkDataQuery.fnc(url),
  });
  const $ = load(data ?? '');
  const baseUrl = new URL(url).origin;
  const title = data ? $('title').text() : url;
  const favicon =
    $('link[rel="icon"]').attr('href') ??
    $('link[rel="shortcut icon"]').attr('href');
  const faviconPath = (() => {
    if (!favicon) {
      return null;
    }
    if (favicon.startsWith('http')) {
      return favicon;
    }
    return `${baseUrl}/${favicon}`;
  })();

  return {
    url,
    title,
    faviconPath,
    isLoading,
    handleEditOpen,
    handleDeleteOpen,
    inExpandedView,
  };
}
