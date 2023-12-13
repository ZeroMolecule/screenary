import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { ActionIcon, Card, Indicator } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconLink, IconPencil } from '@tabler/icons-react';
import { EmbeddedPage } from '@prisma/client';
import classNames from 'classnames';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  item: EmbeddedPage;
  setEmbeddedPage: Dispatch<SetStateAction<EmbeddedPage | null>>;
};

export const EmbeddedPageItem: FC<Props> = (props) => {
  const { title, favicon, ref, hovered, handleOnClick } =
    useEmbeddedPageItem(props);

  return (
    <Indicator
      ref={ref}
      disabled={!hovered}
      label={
        <ActionIcon size="sm" radius="100%" bg="neutral.2">
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
        className={classNames(styles.item, { [styles.itemHover]: hovered })}
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
  );
};

function useEmbeddedPageItem({ item, setEmbeddedPage }: Props) {
  const { id, url, title, icon } = item;
  const { hovered, ref } = useHover();

  const handleOnClick = () => {
    setEmbeddedPage((prev) => (prev && prev.id === id ? null : item));
  };

  return {
    title: title ?? url,
    favicon: icon,
    ref,
    hovered,
    handleOnClick,
  };
}
