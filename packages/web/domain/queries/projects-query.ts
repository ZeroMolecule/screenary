import { Project } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';

const PROJECTS_QUERY_KEY = 'projects';

export const projectsQuery = {
  key: [PROJECTS_QUERY_KEY],
  fnc: () => remoteApi.get('projects').then(getRemoteData<Project[]>),
};
