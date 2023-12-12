import { Directory } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { AddFolderData } from '../types/folder-data';

export const addFolderMutation = {
  fnc: ({ projectId, ...data }: AddFolderData) =>
    remoteApi
      .post(`projects/${projectId}/directories`, { data })
      .then(getRemoteData<Directory>),
};
