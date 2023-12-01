import { Metadata } from 'next';
import { getTranslator } from 'next-intl/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { CalendarPage as ClientCalendarPage } from '@/app/_components/calendar/calendar-page';
import { projectsQuery } from '@/domain/queries/projects-query';
import { getQueryClient } from '@/domain/queries/server-query-client';

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
  const { dehydratedState } = await useCalendarPage();

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientCalendarPage />
    </HydrationBoundary>
  );
}

async function useCalendarPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: projectsQuery.key });
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default withPrivatePage(CalendarPage);
