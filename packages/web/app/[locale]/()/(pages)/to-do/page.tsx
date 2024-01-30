import { NotificationsWidget } from '@/app/_components/notifications-widget';
import { PageContainer } from '@/app/_components/page-container';
import { TasksPage as ClientTasksPage } from '@/app/_components/tasks/tasks-page';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { authOptions } from '@/domain/auth';
import { projectsQuery } from '@/domain/queries/projects-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { tasksQuery } from '@/domain/queries/tasks-query';
import { Data } from '@/domain/remote/response/data';
import { PROJECT_TAB_ALL_VALUE } from '@/hooks/use-projects-tabs';
import { Project } from '@prisma/client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getTranslator } from 'next-intl/server';

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, 'tasks');
  return {
    title: t('title'),
  };
}

async function TasksPage(props: Props) {
  const { username, dehydratedState } = await useTasksPage(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContainer>
        <ClientTasksPage />
      </PageContainer>
      <NotificationsWidget username={username} />
    </HydrationBoundary>
  );
}

async function useTasksPage({ searchParams }: Props) {
  const { tab: tabParamId } = searchParams;

  const queryClient = await getQueryClient();
  const [session, { data: projects }] = await Promise.all([
    getServerSession(authOptions),
    queryClient.fetchQuery<Data<Project[]>>({
      queryKey: projectsQuery.key,
    }),
  ]);
  if (!tabParamId || tabParamId === PROJECT_TAB_ALL_VALUE) {
    const queryPromises = projects.map(({ id }) =>
      Promise.all([
        queryClient.prefetchQuery({
          queryKey: tasksQuery.key(id, {}),
        }),
      ])
    );
    await Promise.all(queryPromises);
  } else {
    await queryClient.prefetchQuery({
      queryKey: tasksQuery.key(tabParamId ?? projects[0].id, {}),
    });
  }
  const dehydratedState = dehydrate(queryClient);

  return { username: session?.user?.name, dehydratedState };
}

export default withPrivatePage(TasksPage);
