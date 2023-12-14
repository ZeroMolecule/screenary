import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { GridCol } from '@mantine/core';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { EmbeddedPageIFrame } from '@/app/_components/project/embedded-pages/embedded-page-i-frame';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { embeddedPageQuery } from '@/domain/queries/embedded-page-query';
import flexStyles from '@/styles/utils/flex.module.scss';

type Params = { locale: string; id: string; pageId: string };
type Props = {
  params: Params;
};

async function EmbeddedPage(props: Props) {
  const { id, pageId, dehydratedState } = await useEmbeddedPage(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <GridCol h="100%" className={flexStyles['flex-1']}>
        <EmbeddedPageIFrame projectId={id} pageId={pageId} />
      </GridCol>
    </HydrationBoundary>
  );
}

async function useEmbeddedPage({ params: { id, pageId } }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: embeddedPageQuery.key(id, pageId),
  });
  const dehydratedState = dehydrate(queryClient);

  return { id, pageId, dehydratedState };
}

export default withPrivatePage(EmbeddedPage);
