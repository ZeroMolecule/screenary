import { Directory } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { ReorderData } from '../types/reorder-data';

export const reorderFoldersMutation = {
  fnc: ({ projectId, ...data }: ReorderData) =>
    remoteApi
      .put(`projects/${projectId}/directories`, data)
      .then(getRemoteData<Directory[]>),
};
