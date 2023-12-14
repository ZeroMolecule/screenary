import { ReactNode } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { embeddedPagesQuery } from '@/domain/queries/embedded-pages-query';
import { PageContainer } from '@/app/_components/page-container';
import { NotificationsWidget } from '@/app/_components/notifications-widget';
import { ProjectDashboard } from '@/app/_components/project/project-dashboard';
import { projectQuery } from '@/domain/queries/project-query';

type Params = { locale: string; id: string };
type Props = {
  params: Params;
  children: ReactNode;
};

export default async function Layout(props: Props) {
  const { children, id, dehydratedState } = await useLayout(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContainer>
        <ProjectDashboard id={id}>{children}</ProjectDashboard>
      </PageContainer>
      <NotificationsWidget projectId={id} />
    </HydrationBoundary>
  );
}

async function useLayout({ children, params: { id } }: Props) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: projectQuery.key(id) }),
    queryClient.prefetchQuery({
      queryKey: embeddedPagesQuery.key(id),
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return { children, id, dehydratedState };
}
