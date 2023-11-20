import { Metadata } from 'next';
import { getTranslator } from 'next-intl/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { projectsQuery } from '@/domain/queries/projects-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { TasksPage as ClientTasksPage } from '@/app/_components/tasks/tasks-page';
import { Data } from '@/domain/remote/response/data';
import { Project } from '@prisma/client';
import { tasksQuery } from '@/domain/queries/todos-query';

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
  const { dehydratedState } = await useTasksPage(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientTasksPage />
    </HydrationBoundary>
  );
}

async function useTasksPage({ searchParams }: Props) {
  const queryClient = getQueryClient();
  const { data: projects } = await queryClient.fetchQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });
  await queryClient.prefetchQuery({
    queryKey: tasksQuery.key(searchParams.tab ?? projects[0].id),
  });
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default withPrivatePage(TasksPage);
