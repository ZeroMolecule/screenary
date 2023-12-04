import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getTranslator } from 'next-intl/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { CalendarPage as ClientCalendarPage } from '@/app/_components/calendar/calendar-page';
import { projectsQuery } from '@/domain/queries/projects-query';
import { getQueryClient } from '@/domain/queries/server-query-client';
import { PageContainer } from '@/app/_components/page-container';
import { NotificationsWidget } from '@/app/_components/notifications-widget';
import { authOptions } from '@/domain/auth';

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'calendar');
  return {
    title: t('title'),
  };
}

async function CalendarPage() {
  const { username, dehydratedState } = await useCalendarPage();

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContainer>
        <ClientCalendarPage />
      </PageContainer>
      <NotificationsWidget username={username} />
    </HydrationBoundary>
  );
}

async function useCalendarPage() {
  const session = await getServerSession(authOptions);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: projectsQuery.key });
  const dehydratedState = dehydrate(queryClient);

  return { username: session?.user?.name, dehydratedState };
}

export default withPrivatePage(CalendarPage);
