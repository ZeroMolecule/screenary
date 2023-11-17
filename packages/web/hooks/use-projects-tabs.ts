import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@prisma/client';
import { usePathname, useRouter } from '@/navigation';
import { TabOption } from '@/app/_components/projects-tabs';
import { Data } from '@/domain/remote/response/data';
import { projectsQuery } from '@/domain/queries/projects-query';

const PROJECT_TAB_PARAMS_KEY = 'tab';

export const useProjectsTabs = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: projects } = useQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });

  const selectedProject = searchParams.get(PROJECT_TAB_PARAMS_KEY)
    ? projects?.data.find(
        (p) => p.id === searchParams.get(PROJECT_TAB_PARAMS_KEY)
      )
    : projects?.data[0];

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
  };

  return { selectedProject, tabs, handleChange };
};
