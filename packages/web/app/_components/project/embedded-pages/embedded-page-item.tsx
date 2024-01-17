import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
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
import { ConfirmDeleteModal } from '../../modals/confirm-delete-modal';
import { Link } from '../../base/link';
import classNames from 'classnames';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  item: EmbeddedPage;
  popoverOpen: boolean;
  setPopoverOpen: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
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
    handleEditOpen,
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
                onClick={handleEditOpen}
              >
                <IconPencil size={12} color="var(--mantine-color-neutral-9)" />
              </ActionIcon>
            }
            offset={3}
          >
            <Link href={item.url} target="_blank">
              <Card
                p={0}
                radius="lg"
                pos="relative"
                className={classNames(styles.item, {
                  [styles.itemHover]: hovered,
                })}
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
                    className={styles.image}
                  />
                ) : (
                  <IconLink className={styles.placeholderLinkIcon} />
                )}
              </Card>
            </Link>
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
      width: naturalWidth,
      height: naturalHeight,
    }));
  };
  const handleImageOnError = () => {
    setImage((prev) => ({ ...prev, isError: true }));
  };

  const handleChange = (value: boolean) => {
    setPopoverOpen({ [id]: value });
  };
  const handleEditOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPopoverOpen({ [id]: true });
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
    handleEditOpen,
    handleEdit,
    handleDeleteOpen,
    handleDelete,
  };
}
