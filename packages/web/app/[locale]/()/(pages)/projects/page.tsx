import type { Metadata } from 'next';
import { Box } from '@mantine/core';
import { getTranslator } from 'next-intl/server';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { ProjectsWrapper } from '@/app/_components/projects/projects-wrapper';

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'projects');
  return {
    title: t('title'),
  };
}

function ProjectsPage() {
  return (
    <Box h="100%">
      <ProjectsWrapper />
    </Box>
  );
}

export default withPrivatePage(ProjectsPage);
