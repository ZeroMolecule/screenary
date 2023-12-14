import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  ActionIcon,
  Card,
  Indicator,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconLink, IconPencil } from '@tabler/icons-react';
import { EmbeddedPage } from '@prisma/client';
import {
  EmbeddedPageFormValues,
  EmbeddedPagePopover,
} from './embedded-page-popover';
import { ConfirmDeleteModal } from '../modals/confirm-delete-modal';
import classNames from 'classnames';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  item: EmbeddedPage;
  popoverOpen: boolean;
  setPopoverOpen: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  setEmbeddedPage: Dispatch<SetStateAction<EmbeddedPage | null>>;
  deleteOpen: boolean;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (item: EmbeddedPage) => Promise<void>;
};

export const EmbeddedPageItem: FC<Props> = (props) => {
  const {
    t,
    item,
    title,
    favicon,
    ref,
    hovered,
    popoverOpen,
    deleteOpen,
    setDeleteOpen,
    handleChange,
    handleOnClick,
    handleEdit,
    handleDelete,
  } = useEmbeddedPageItem(props);

  return (
    <>
      <Popover
        opened={popoverOpen}
        onChange={handleChange}
        radius={24}
        position="right-start"
      >
        <PopoverTarget>
          <Indicator
            ref={ref}
            disabled={!hovered}
            label={
              <ActionIcon
                size="sm"
                radius="100%"
                bg="neutral.2"
                onClick={() => handleChange(true)}
              >
                <IconPencil size={12} color="var(--mantine-color-neutral-9)" />
              </ActionIcon>
            }
            offset={3}
          >
            <Card
              w={64}
              h={64}
              p={0}
              radius="lg"
              pos="relative"
              className={classNames(styles.item, {
                [styles.itemHover]: hovered,
              })}
              onClick={handleOnClick}
            >
              {favicon ? (
                <Image
                  loader={() => favicon}
                  src={favicon}
                  fill
                  alt={title ?? ''}
                  unoptimized
                />
              ) : (
                <IconLink size={32} color="var(--mantine-color-primary-5)" />
              )}
            </Card>
          </Indicator>
        </PopoverTarget>
        <PopoverDropdown miw={324} p={0}>
          <EmbeddedPagePopover
            title={t('form.editTitle')}
            onClose={() => handleChange(false)}
            onSubmit={handleEdit}
            item={item}
            onOpenDelete={() => setDeleteOpen(true)}
          />
        </PopoverDropdown>
      </Popover>
      <ConfirmDeleteModal
        title={t('deleteTitle')}
        opened={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onSubmit={handleDelete}
      />
    </>
  );
};

function useEmbeddedPageItem({
  item,
  popoverOpen,
  setPopoverOpen,
  setEmbeddedPage,
  deleteOpen,
  setDeleteOpen,
  onDelete,
  onEdit,
}: Props) {
  const t = useTranslations('project.embeddedPages');
  const { id, url, title, icon } = item;
  const { hovered, ref } = useHover();

  const handleChange = (value: boolean) => {
    setPopoverOpen({ [id]: value });
  };

  const handleOnClick = () => {
    setEmbeddedPage((prev) => (prev && prev.id === id ? null : item));
  };

  const handleEdit = async (values: EmbeddedPageFormValues) => {
    await onEdit({ ...item, url: values.url });
  };

  const handleDelete = async () => {
    await onDelete(id);
  };

  return {
    t,
    item,
    title: title ?? url,
    favicon: icon,
    ref,
    hovered,
    popoverOpen,
    deleteOpen,
    setDeleteOpen,
    handleChange,
    handleOnClick,
    handleEdit,
    handleDelete,
  };
}
