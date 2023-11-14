import { remoteApi } from '../remote';

export const deleteProjectMutation = {
  fnc: (id: string) => remoteApi.delete(`projects/${id}`),
};
