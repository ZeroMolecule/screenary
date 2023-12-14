import { Dispatch, FC, SetStateAction, SyntheticEvent, useState } from 'react';
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

const ICON_CONTAINER_DIMENSIONS_IN_PIXELS = 64;

type Props = {
  item: EmbeddedPage;
  popoverOpen: boolean;
  setPopoverOpen: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  setEmbeddedPage: Dispatch<SetStateAction<EmbeddedPage | null>>;
  deleteOpen: boolean;
  setDeleteOpen: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (item: EmbeddedPage) => Promise<void>;
};

export const EmbeddedPageItem: FC<Props> = (props) => {
  const {
    t,
    item,
    title,
    icon,
    image,
    ref,
    hovered,
    popoverOpen,
    deleteOpen,
    handleImageOnLoad,
    handleImageOnError,
    handleChange,
    handleOnClick,
    handleEdit,
    handleDeleteOpen,
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
              w={ICON_CONTAINER_DIMENSIONS_IN_PIXELS}
              h={ICON_CONTAINER_DIMENSIONS_IN_PIXELS}
              p={0}
              radius="lg"
              pos="relative"
              className={classNames(styles.item, {
                [styles.itemHover]: hovered,
              })}
              onClick={handleOnClick}
            >
              {icon && !image.isError ? (
                <Image
                  loader={() => icon}
                  src={icon}
                  alt={title ?? ''}
                  width={image.width}
                  height={image.height}
                  onLoad={handleImageOnLoad}
                  onError={handleImageOnError}
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
            onOpenDelete={() => handleDeleteOpen(true)}
          />
        </PopoverDropdown>
      </Popover>
      <ConfirmDeleteModal
        title={t('deleteTitle')}
        opened={deleteOpen}
        onClose={() => handleDeleteOpen(false)}
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
  const [image, setImage] = useState<{
    width: number;
    height: number;
    isError: boolean;
  }>({ width: 0, height: 0, isError: false });
  const { hovered, ref } = useHover();

  const handleImageOnLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setImage((prev) => ({
      ...prev,
      width: Math.min(naturalWidth, ICON_CONTAINER_DIMENSIONS_IN_PIXELS - 1),
      height: Math.min(naturalHeight, ICON_CONTAINER_DIMENSIONS_IN_PIXELS - 1),
    }));
  };
  const handleImageOnError = () => {
    setImage((prev) => ({ ...prev, isError: true }));
  };

  const handleChange = (value: boolean) => {
    setPopoverOpen({ [id]: value });
  };

  const handleOnClick = () => {
    setEmbeddedPage((prev) => (prev && prev.id === id ? null : item));
  };

  const handleEdit = async (values: EmbeddedPageFormValues) => {
    await onEdit({ ...item, url: values.url });
  };

  const handleDeleteOpen = (value: boolean) => {
    setDeleteOpen({ [id]: value });
  };
  const handleDelete = async () => {
    await onDelete(id);
  };

  return {
    t,
    item,
    title: title ?? url,
    icon,
    image,
    ref,
    hovered,
    popoverOpen,
    deleteOpen,
    handleImageOnLoad,
    handleImageOnError,
    handleChange,
    handleOnClick,
    handleEdit,
    handleDeleteOpen,
    handleDelete,
  };
}
