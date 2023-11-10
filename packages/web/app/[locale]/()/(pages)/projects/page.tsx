import type { Metadata } from 'next';
import { getTranslator } from 'next-intl/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { ProjectsPage as ClientProjectsPage } from '@/app/_components/projects/projects-page';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { projectsQuery } from '@/domain/queries/projects-query';

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'projects');
  return {
    title: t('title'),
  };
}

async function ProjectsPage() {
  const { dehydratedState } = await useProjectsPage();

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientProjectsPage />
    </HydrationBoundary>
  );
}

async function useProjectsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: projectsQuery.key,
    queryFn: projectsQuery.fnc,
  });
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default withPrivatePage(ProjectsPage);
