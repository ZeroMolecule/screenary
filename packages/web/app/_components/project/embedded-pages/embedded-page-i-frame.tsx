'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@mantine/core';
import { EmbeddedPage } from '@prisma/client';
import { Data } from '@/domain/remote/response/data';
import { embeddedPageQuery } from '@/domain/queries/embedded-page-query';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  projectId: string;
  pageId: string;
};

export const EmbeddedPageIFrame: FC<Props> = (props) => {
  const { url, title } = useEmbeddedPageIFrame(props);

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

function useEmbeddedPageIFrame({ projectId, pageId }: Props) {
  const { data } = useQuery<Data<EmbeddedPage>>({
    queryKey: embeddedPageQuery.key(projectId, pageId),
  });
  console.log(data);
  const { url, title } = data?.data ?? {};

  return { url, title };
}
