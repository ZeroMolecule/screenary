import { getServerSession } from 'next-auth';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Project, projectQuery } from '@/domain/queries/project-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { ProjectPage as ClientProjectPage } from '@/app/_components/project/project-page';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { notesQuery } from '@/domain/queries/notes-query';
import { tasksQuery } from '@/domain/queries/tasks-query';
import { TaskStatus } from '@prisma/client';
import { PageContainer } from '@/app/_components/page-container';
import { NotificationsWidget } from '@/app/_components/notifications-widget';
import { authOptions } from '@/domain/auth';
import { Data } from '@/domain/remote/response/data';

type Params = { locale: string; id: string };
type Props = { params: Params };

async function ProjectPage({ params: { id } }: Props) {
  const { username, projectName, dehydratedState } = await useProjectPage(id);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContainer>
        <ClientProjectPage />
      </PageContainer>
      <NotificationsWidget username={username} projectName={projectName} />
    </HydrationBoundary>
  );
}

async function useProjectPage(id: string) {
  const session = await getServerSession(authOptions);
  const queryClient = getQueryClient();
  const project = await queryClient.fetchQuery<Data<Project>>({
    queryKey: projectQuery.key(id),
  });
  await Promise.all([
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

  return {
    username: session?.user?.name,
    projectName: project.data.name,
    dehydratedState,
  };
}

export default withPrivatePage(ProjectPage);
