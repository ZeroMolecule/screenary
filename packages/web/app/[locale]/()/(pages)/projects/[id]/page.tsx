import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { TaskStatus } from '@prisma/client';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { notesQuery } from '@/domain/queries/notes-query';
import { tasksQuery } from '@/domain/queries/tasks-query';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { foldersQuery } from '@/domain/queries/folders-query';
import { folderQuery } from '@/domain/queries/folder-query';
import { projectQuery } from '@/domain/queries/project-query';
import { embeddedPagesQuery } from '@/domain/queries/embedded-pages-query';
import { ProjectPage as ClientProjectPage } from '@/app/_components/project/project-page';
import { PageContainer } from '@/app/_components/page-container';
import { NotificationsWidget } from '@/app/_components/notifications-widget';

type Params = { locale: string; id: string };
type Props = {
  params: Params;
  searchParams: { [key: string]: string | undefined };
};

async function ProjectPage(props: Props) {
  const { id, dehydratedState } = await useProjectPage(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContainer>
        <ClientProjectPage id={id} />
      </PageContainer>
      <NotificationsWidget projectId={id} />
    </HydrationBoundary>
  );
}

async function useProjectPage({ params: { id }, searchParams }: Props) {
  const folderParamsId = searchParams.folder ?? 'null';
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: projectQuery.key(id) }),
    queryClient.prefetchQuery({
      queryKey: embeddedPagesQuery.key(id),
    }),
    queryClient.prefetchQuery({ queryKey: notesQuery.key(id) }),
    queryClient.prefetchQuery({
      queryKey: tasksQuery.key(id),
    }),
    queryClient.prefetchQuery({
      queryKey: quickLinksQuery.key(id, { directoryId: folderParamsId }),
    }),
    queryClient.prefetchQuery({
      queryKey: foldersQuery.key(id, { parentId: folderParamsId }),
    }),
    queryClient.prefetchQuery({
      queryKey: folderQuery.key(folderParamsId, id),
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return { id, dehydratedState };
}

export default withPrivatePage(ProjectPage);
