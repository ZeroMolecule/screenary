import { Task } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { EditTaskData } from '../types/task-data';

export const editTaskMutation = {
  fnc: ({ id, projectId, ...data }: EditTaskData) =>
    remoteApi
      .put(`projects/${projectId}/tasks/${id}`, { data })
      .then(getRemoteData<Task>),
};
