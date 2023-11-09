import { Box } from '@mantine/core';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { ProjectsWrapper } from '@/app/_components/projects/projects-wrapper';

function HomePage() {
  return (
    <Box h="100%">
      <ProjectsWrapper />
    </Box>
  );
}

export default withPrivatePage(HomePage);
