import { Task } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { ReorderTaskData } from '../types/task-data';

export const reorderTasksMutation = {
  fnc: ({ projectId, ...data }: ReorderTaskData) =>
    remoteApi
      .put(`projects/${projectId}/tasks`, data)
      .then(getRemoteData<Task[]>),
};
