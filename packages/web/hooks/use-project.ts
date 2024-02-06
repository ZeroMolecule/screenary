import { editProjectMutation } from '@/domain/mutations/edit-project-mutation';
import { projectQuery } from '@/domain/queries/project-query';
import { projectsQuery } from '@/domain/queries/projects-query';
import { Data } from '@/domain/remote/response/data';
import { Prisma, Project, ProjectUser, TaskStatus } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ProjectUserUpdateDto = {
  taskStatus?: TaskStatus | null;
};

type UpdateDto = {
  projectUser?: ProjectUserUpdateDto;
};

export function useProject(id: string) {
  const qc = useQueryClient();
  const { data } = useQuery<
    Data<Prisma.ProjectGetPayload<{ include: { projectUsers: true } }>>,
    unknown,
    Project & { projectUser?: ProjectUser }
  >({
    queryKey: projectQuery.key(id),
    select: ({ data: { projectUsers, ...data } }) => {
      return { ...data, projectUser: projectUsers.at(0) };
    },
    initialData: () => {
      const project = qc
        .getQueryData<
          Data<Prisma.ProjectGetPayload<{ include: { projectUsers: true } }>[]>
        >(projectsQuery.key)
        ?.data.find((project) => project.id === id);
      if (!project) {
        return undefined;
      }
      return { data: project, meta: {} };
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: editProjectMutation.fnc,
    onSuccess({ data }) {
      qc.setQueryData(projectQuery.key(id), () => {
        return data;
      });
      qc.setQueryData<
        Data<Prisma.ProjectGetPayload<{ include: { projectUsers: true } }>[]>
      >(projectsQuery.key, (prev) => {
        if (!prev) {
          return;
        }
        return {
          ...prev,
          data: prev.data.map((item) =>
            item.id === data.data.id ? { ...item, ...data.data } : item
          ),
        };
      });
    },
  });

  const update = (data: UpdateDto) =>
    mutateAsync({ id, ...data }).catch(() => null);

  return { data, update };
}
