import { FC } from 'react';
import { Button } from '@mantine/core';
import { IconBrandMedium } from '@tabler/icons-react';
import { QuickLink } from '@prisma/client';
import { ProjectMenu } from './project-menu';
import flexStyles from '@/styles/utils/flex.module.scss';

type Props = {
  item: QuickLink;
  onEditOpen: (link: QuickLink) => void;
  onDeleteOpen: (id: string) => void;
};

export const QuickLinkItem: FC<Props> = (props) => {
  const { url, handleEditOpen, handleDeleteOpen } = useQuickLinkItem(props);

  return (
    <Button
      component="a"
      href={url}
      target="_blank"
      variant="transparent"
      w="100%"
      c="neutral.9"
      bg="neutral.0"
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
      className={flexStyles['flex-shrink-0']}
      classNames={{ label: flexStyles['flex-1'] }}
    >
      {url}
    </Button>
  );
};

function useQuickLinkItem({ item, onEditOpen, onDeleteOpen }: Props) {
  const { id, url } = item;

  const handleEditOpen = () => onEditOpen(item);
  const handleDeleteOpen = () => onDeleteOpen(id);

  return { url, handleEditOpen, handleDeleteOpen };
}
