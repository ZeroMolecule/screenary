import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from '@/navigation';
import { TabOption } from '@/app/_components/projects-tabs';
import { Data } from '@/domain/remote/response/data';
import { Project, projectsQuery } from '@/domain/queries/projects-query';

const PROJECT_TAB_PARAMS_KEY = 'tab';
export const PROJECT_TAB_ALL_VALUE = 'all';

export const useProjectsTabs = (includeAll?: boolean) => {
  const t = useTranslations('shared.component.projectTabs');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: projects } = useQuery<Data<Project[]>>({
    queryKey: projectsQuery.key,
  });

  const selectedProject = (() => {
    const paramsId = searchParams.get(PROJECT_TAB_PARAMS_KEY);
    if (paramsId) {
      return projects?.data.find(
        (p) => p.id === searchParams.get(PROJECT_TAB_PARAMS_KEY)
      );
    }
    return includeAll ? undefined : projects?.data[0];
  })();

  const tabs: TabOption[] =
    projects?.data.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? [];
  const modifiedTabs: TabOption[] = includeAll
    ? [{ value: PROJECT_TAB_ALL_VALUE, label: t('all') }, ...tabs]
    : tabs;

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(PROJECT_TAB_PARAMS_KEY, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return {
    projects,
    selectedProject,
    tabs: modifiedTabs,
    handleChange,
  };
};
