import { Directory } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { EditFolderData } from '../types/folder-data';

export const editFolderMutation = {
  fnc: ({ id, projectId, ...data }: EditFolderData) =>
    remoteApi
      .put(`projects/${projectId}/directories/${id}`, { data })
      .then(getRemoteData<Directory>),
};
