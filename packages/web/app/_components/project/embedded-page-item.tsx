import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { Card } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { EmbeddedPage } from '@prisma/client';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  item: EmbeddedPage;
  setEmbeddedPage: Dispatch<SetStateAction<EmbeddedPage | null>>;
};

export const EmbeddedPageItem: FC<Props> = (props) => {
  const { title, favicon, handleOnClick } = useEmbeddedPageItem(props);

  return (
    <Card
      w={64}
      h={64}
      p={0}
      radius="lg"
      pos="relative"
      className={styles.item}
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
  );
};

function useEmbeddedPageItem({ item, setEmbeddedPage }: Props) {
  const { id, url, title, icon } = item;

  const handleOnClick = () => {
    setEmbeddedPage((prev) => (prev && prev.id === id ? null : item));
  };

  return {
    title: title ?? url,
    favicon: icon,
    handleOnClick,
  };
}
