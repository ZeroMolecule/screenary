import { Box } from '@mantine/core';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { ProjectsWrapper } from '@/app/_components/projects/projects-wrapper';

function ProjectsPage() {
  return (
    <Box h="100%">
      <ProjectsWrapper />
    </Box>
  );
}

export default withPrivatePage(ProjectsPage);
