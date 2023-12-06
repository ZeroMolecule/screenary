'use client';

import { FC } from 'react';
import { Group, Stack } from '@mantine/core';
import { ProjectsTabs } from '../projects-tabs';
import { useProjectsTabs } from '@/hooks/use-projects-tabs';
import { Calendar } from './calendar';

export const CalendarPage: FC = () => {
  const { projectId, calendarUrl, tabs, handleChange } = useCalendarPage();

  return (
    <Stack h="100%" gap="sm">
      <Group>
        <ProjectsTabs
          defaultTab={projectId}
          tabs={tabs}
          onChange={handleChange}
        />
      </Group>
      <Calendar url={calendarUrl ?? ''} />
    </Stack>
  );
};

function useCalendarPage() {
  const { selectedProject, tabs, handleChange } = useProjectsTabs();
  const { id: projectId, calendarUrl } = selectedProject ?? {};

  return { projectId, calendarUrl, tabs, handleChange };
}
