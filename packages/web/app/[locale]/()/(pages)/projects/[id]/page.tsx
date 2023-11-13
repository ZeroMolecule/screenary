import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { projectQuery } from '@/domain/queries/project-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { ProjectPage as ClientProjectPage } from '@/app/_components/project/project-page';
import { withPrivatePage } from '@/app/_hoc/with-private-page';

type Params = { locale: string; id: string };
type Props = { params: Params };

async function ProjectPage({ params: { id } }: Props) {
  const { dehydratedState } = await useProjectPage(id);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientProjectPage />
    </HydrationBoundary>
  );
}

async function useProjectPage(id: string) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: projectQuery.key(id) });
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default withPrivatePage(ProjectPage);
