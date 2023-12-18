'use client';

import { FC } from 'react';
import { Box, GridCol, Stack } from '@mantine/core';
import { Notes } from './notes/notes';
import { Tasks } from './tasks/tasks';
import { QuickLinks } from './quick-links/quick-links';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/project.module.scss';

type Props = {
  id: string;
};

export const ProjectPage: FC<Props> = ({ id }) => {
  return (
    <>
      <GridCol span={9} h="100%" className={styles.tasksGridCol}>
        <Tasks projectId={id} />
      </GridCol>
      <GridCol span={3} h="100%">
        <Box h="100%" pos="relative">
          <Stack h="100%" gap="xs" className={overflowStyles['overflow-auto']}>
            <Notes projectId={id} />
            <QuickLinks projectId={id} />
          </Stack>
        </Box>
      </GridCol>
    </>
  );
};
