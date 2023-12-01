import { Project } from '@prisma/client';
import { remoteApi } from '../remote';
import { Data } from '../remote/response/data';
import { EditProjectData } from '../types/project-data';

export const editProjectMutation = {
  fnc: ({ id, ...data }: EditProjectData) =>
    remoteApi.put<Data<Project>>(`projects/${id}`, { data }),
};
