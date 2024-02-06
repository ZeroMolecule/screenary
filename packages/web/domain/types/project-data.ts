import { ProjectFormValues } from '@/app/_components/modals/project-modal';
import { TaskStatus } from '@prisma/client';

export type AddProjectData = ProjectFormValues;

export type EditProjectData = Partial<ProjectFormValues> & {
  id: string;
  projectUser?: ProjectUser;
};

type ProjectUser = {
  taskStatus?: TaskStatus | null;
};
