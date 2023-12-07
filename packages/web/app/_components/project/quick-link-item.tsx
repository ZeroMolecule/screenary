import { FC } from 'react';
import { Button } from '@mantine/core';
import { IconBrandMedium } from '@tabler/icons-react';
import { QuickLink } from '@prisma/client';
import { ProjectMenu } from './project-menu';
import { QuickLinkType } from './quick-links';
import classNames from 'classnames';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  item: QuickLink;
  onEditOpen: (link: QuickLink, type: QuickLinkType) => void;
  onDeleteOpen: (id: string, type: QuickLinkType) => void;
  inExpandedView?: boolean;
};

export const QuickLinkItem: FC<Props> = (props) => {
  const { url, handleEditOpen, handleDeleteOpen, inExpandedView } =
    useQuickLinkItem(props);

  return (
    <Button
      component="a"
      href={url}
      target="_blank"
      variant="transparent"
      w="100%"
      p="xs"
      radius="md"
      c={inExpandedView ? 'white' : 'neutral.9'}
      bg={inExpandedView ? 'transparent' : 'neutral.0'}
      fw={400}
      leftSection={<IconBrandMedium />}
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
      {url}
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

  return {
    url,
    handleEditOpen,
    handleDeleteOpen,
    inExpandedView,
  };
}
