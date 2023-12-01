import { ProjectFormValues } from '@/app/_components/modals/project-modal';

export type AddProjectData = ProjectFormValues;

export type EditProjectData = ProjectFormValues & { id: string };
