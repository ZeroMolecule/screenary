import { Task } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { AddTaskData } from '../types/task-data';

export const addTaskMutation = {
  fnc: ({ projectId, ...data }: AddTaskData) =>
    remoteApi
      .post(`projects/${projectId}/tasks`, { data })
      .then(getRemoteData<Task>),
};
