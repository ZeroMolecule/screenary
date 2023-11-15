import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@prisma/client';
import { TabOption } from '@/app/_components/projects-tabs';
import { projectsQuery } from '@/domain/queries/projects-query';
import { Data } from '@/domain/remote/response/data';

export const useProjectsTabs = () => {
  const { data: projects } = useQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });

  const [selectedProject, setSelectedProject] = useState(projects?.data[0]);

  const tabs: TabOption[] =
    projects?.data.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? [];

  const handleChange = (value: string | null) => {
    setSelectedProject(projects?.data.find((p) => p.id === value));
  };

  return { selectedProject, tabs, handleChange };
};
