import { remoteApi } from '../remote';
import { DeleteTaskData } from '../types/task-data';

export const deleteTaskMutation = {
  fnc: ({ id, projectId }: DeleteTaskData) =>
    remoteApi.delete(`projects/${projectId}/tasks/${id}`),
};
