import { Task } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { ReorderData } from '../types/reorder-data';

export const reorderTasksMutation = {
  fnc: ({ projectId, ...data }: ReorderData) =>
    remoteApi
      .put(`projects/${projectId}/tasks`, data)
      .then(getRemoteData<Task[]>),
};
