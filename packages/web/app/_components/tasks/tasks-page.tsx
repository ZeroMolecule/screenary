'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { ActionIcon, Box, Card, Group, Stack } from '@mantine/core';
import { ProjectsTabs } from '../projects-tabs';
import { Title } from '../base/title';
import { useQuery } from '@tanstack/react-query';
import { tasksQuery } from '@/domain/queries/todos-query';
import { Data } from '@/domain/remote/response/data';
import { Task } from '@prisma/client';
import { IconPlus } from '@tabler/icons-react';
import { EmptyPlaceholder } from '../empty-placeholder';
import { useTranslations } from 'next-intl';
import emptyIcon from '@/public/images/check-icon.svg';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/tasks.module.scss';

export const TasksPage: FC = () => {
  const { t, tasks, projectId, projectName, tabs, handleChange } =
    useTasksPage();

  return (
    <Stack h="100%" gap={8}>
      <ProjectsTabs
        defaultTab={projectId}
        tabs={tabs}
        onChange={handleChange}
      />
      <Card h="100%" radius={24} className={styles.tasks}>
        <Group justify="space-between">
          <Title order={3} fw={600}>
            {projectName}
          </Title>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
          >
            <IconPlus />
          </ActionIcon>
        </Group>
        <Box className={overflowStyles['overflow-auto']}>
          {!tasks.length ? (
            // TODO: fix aligning
            <EmptyPlaceholder
              title={t('empty.title')}
              description={t('empty.description')}
              image={<Image src={emptyIcon} width={140} height={140} alt="" />}
            />
          ) : (
            <Title>{projectId}</Title>
          )}
        </Box>
      </Card>
    </Stack>
  );
};

function useTasksPage() {
  const t = useTranslations('tasks');
  const { selectedProject, tabs, handleChange } = useProjectsTabs();
  const { id: projectId, name: projectName } = selectedProject ?? {};

  const { data } = useQuery<Data<Task[]>>({
    queryKey: tasksQuery.key(projectId!),
    enabled: !!projectId,
  });
  const tasks = data?.data ?? [];

  return { t, tasks, projectId, projectName, tabs, handleChange };
}
