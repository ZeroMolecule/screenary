import { remoteApi } from '../remote';
import { DeleteFolderData } from '../types/folder-data';

export const deleteFolderMutation = {
  fnc: ({ id, projectId }: DeleteFolderData) =>
    remoteApi.delete(`projects/${projectId}/directories/${id}`),
};
