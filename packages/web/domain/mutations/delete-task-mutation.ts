import { Task } from '../queries/tasks-query';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { DeleteTaskData } from '../types/task-data';

export const deleteTaskMutation = {
  fnc: ({ id, projectId }: DeleteTaskData) =>
    remoteApi
      .delete(`projects/${projectId}/tasks/${id}`)
      .then(getRemoteData<Task>),
};
