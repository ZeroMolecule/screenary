import { FC } from 'react';
import { Card } from '@mantine/core';
import { EmbeddedPage } from '@prisma/client';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  embeddedPage: EmbeddedPage;
};

export const EmbeddedPageIFrame: FC<Props> = ({
  embeddedPage: { title, url },
}) => {
  return (
    <Card w="100%" h="100%" p={0} radius={24} className={styles.card}>
      <iframe
        src={url}
        title={title ?? ''}
        height="100%"
        className={styles.iframe}
      />
    </Card>
  );
};
