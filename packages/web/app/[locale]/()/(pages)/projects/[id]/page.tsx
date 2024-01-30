import { NotificationsWidget } from '@/app/_components/notifications-widget';
import { PageContainer } from '@/app/_components/page-container';
import { ProjectPage as ClientProjectPage } from '@/app/_components/project/project-page';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { embeddedPagesQuery } from '@/domain/queries/embedded-pages-query';
import { folderQuery } from '@/domain/queries/folder-query';
import { foldersQuery } from '@/domain/queries/folders-query';
import { notesQuery } from '@/domain/queries/notes-query';
import { projectQuery } from '@/domain/queries/project-query';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { tasksQuery } from '@/domain/queries/tasks-query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

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
  const { folder: folderParamsId = 'null' } = searchParams;

  const queryClient = await getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: projectQuery.key(id) }),
    queryClient.prefetchQuery({
      queryKey: embeddedPagesQuery.key(id),
    }),
    queryClient.prefetchQuery({ queryKey: notesQuery.key(id) }),
    queryClient.prefetchQuery({
      queryKey: tasksQuery.key(id, {}),
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
