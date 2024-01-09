import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { ProjectPage as ClientProjectPage } from '@/app/_components/project/project-page';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { notesQuery } from '@/domain/queries/notes-query';
import { tasksQuery } from '@/domain/queries/tasks-query';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { foldersQuery } from '@/domain/queries/folders-query';
import { folderQuery } from '@/domain/queries/folder-query';

type Params = { locale: string; id: string };
type Props = {
  params: Params;
  searchParams: { [key: string]: string | undefined };
};

async function ProjectPage(props: Props) {
  const { id, dehydratedState } = await useProjectPage(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientProjectPage id={id} />
    </HydrationBoundary>
  );
}

async function useProjectPage({ params: { id }, searchParams }: Props) {
  const folderParamsId = searchParams.folder ?? 'null';
  const queryClient = getQueryClient();
  await Promise.all([
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
