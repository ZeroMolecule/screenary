import { FC } from 'react';
import Image from 'next/image';
import { Card, Tooltip } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { EmbeddedPage } from '@prisma/client';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  item: EmbeddedPage;
};

export const EmbeddedPageItem: FC<Props> = (props) => {
  const { title, favicon } = useEmbeddedPageItem(props);

  return (
    <Tooltip label={title} position="right">
      <Card
        w={64}
        h={64}
        p={0}
        radius="lg"
        pos="relative"
        className={styles.item}
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
    </Tooltip>
  );
};

function useEmbeddedPageItem({ item }: Props) {
  const { url, title, icon } = item;

  return { title: title ?? url, favicon: icon };
}
