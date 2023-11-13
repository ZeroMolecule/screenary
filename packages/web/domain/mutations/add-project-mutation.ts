import { Project } from '@prisma/client';
import { remoteApi } from '../remote';
import { Data, getRemoteData } from '../remote/response/data';
import { AddProjectData } from '../types/project-data';

export const addProjectMutation = {
  fnc: (data: AddProjectData) =>
    remoteApi.post<Data<Project>>('projects', { data }).then(getRemoteData),
};
