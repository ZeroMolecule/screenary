import { FOLDERS_QUERY_KEY } from './folders-query';

export const folderQuery = {
  key: (id: string, projectId: string) => [
    `projects/${projectId}/${FOLDERS_QUERY_KEY}/${id}`,
  ],
};
