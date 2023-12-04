import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getTranslator } from 'next-intl/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { ProjectsPage as ClientProjectsPage } from '@/app/_components/projects/projects-page';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { projectsQuery } from '@/domain/queries/projects-query';
import { authOptions } from '@/domain/auth';
import { PageContainer } from '@/app/_components/page-container';
import { NotificationsWidget } from '@/app/_components/notifications-widget';

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
  const { username, dehydratedState } = await useProjectsPage();

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContainer>
        <ClientProjectsPage />
      </PageContainer>
      <NotificationsWidget username={username} />
    </HydrationBoundary>
  );
}

async function useProjectsPage() {
  const session = await getServerSession(authOptions);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: projectsQuery.key });
  const dehydratedState = dehydrate(queryClient);

  return { username: session?.user?.name, dehydratedState };
}

export default withPrivatePage(ProjectsPage);
