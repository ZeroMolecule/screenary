import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getTranslator } from 'next-intl/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { projectsQuery } from '@/domain/queries/projects-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { TasksPage as ClientTasksPage } from '@/app/_components/tasks/tasks-page';
import { Data } from '@/domain/remote/response/data';
import { Project, TaskStatus } from '@prisma/client';
import { tasksQuery } from '@/domain/queries/tasks-query';
import { PageContainer } from '@/app/_components/page-container';
import { authOptions } from '@/domain/auth';
import { NotificationsWidget } from '@/app/_components/notifications-widget';

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
  const queryClient = getQueryClient();
  const [session, { data: projects }] = await Promise.all([
    getServerSession(authOptions),
    queryClient.fetchQuery<Data<Project[]>>({
      queryKey: projectsQuery.key,
    }),
  ]);
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: tasksQuery.key(searchParams.tab ?? projects[0].id, {
        status: TaskStatus.TODO,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: tasksQuery.key(searchParams.tab ?? projects[0].id, {
        status: TaskStatus.DONE,
      }),
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return { username: session?.user?.name, dehydratedState };
}

export default withPrivatePage(TasksPage);
