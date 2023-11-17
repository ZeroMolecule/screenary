import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@prisma/client';
import { TabOption } from '@/app/_components/projects-tabs';
import { projectsQuery } from '@/domain/queries/projects-query';
import { Data } from '@/domain/remote/response/data';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/navigation';

const PROJECT_TAB_PARAMS_KEY = 'tab';

export const useProjectsTabs = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: projects } = useQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });

  const [selectedProject, setSelectedProject] = useState(() => {
    const id = searchParams.get(PROJECT_TAB_PARAMS_KEY);
    return id ? projects?.data.find((p) => p.id === id) : projects?.data[0];
  });

  const tabs: TabOption[] =
    projects?.data.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? [];

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(PROJECT_TAB_PARAMS_KEY, value);
    }
    replace(`${pathname}?${params.toString()}`);
    setSelectedProject(projects?.data.find((p) => p.id === value));
  };

  return { selectedProject, tabs, handleChange };
};
