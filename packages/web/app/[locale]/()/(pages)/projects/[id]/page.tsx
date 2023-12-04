import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { projectQuery } from '@/domain/queries/project-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { ProjectPage as ClientProjectPage } from '@/app/_components/project/project-page';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { notesQuery } from '@/domain/queries/notes-query';
import { tasksQuery } from '@/domain/queries/tasks-query';
import { TaskStatus } from '@prisma/client';
import { PageContainer } from '@/app/_components/page-container';
import { NotificationsWidget } from '@/app/_components/notifications-widget';

type Params = { locale: string; id: string };
type Props = { params: Params };

async function ProjectPage({ params: { id } }: Props) {
  const { dehydratedState } = await useProjectPage(id);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContainer>
        <ClientProjectPage />
      </PageContainer>
      <NotificationsWidget projectId={id} />
    </HydrationBoundary>
  );
}

async function useProjectPage(id: string) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: projectQuery.key(id) }),
    queryClient.prefetchQuery({ queryKey: notesQuery.key(id) }),
    queryClient.prefetchQuery({
      queryKey: tasksQuery.key(id, {
        status: TaskStatus.TODO,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: tasksQuery.key(id, {
        status: TaskStatus.DONE,
      }),
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default withPrivatePage(ProjectPage);
