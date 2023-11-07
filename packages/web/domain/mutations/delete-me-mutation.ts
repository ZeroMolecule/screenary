import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';

export const deleteMeMutation = {
  fnc: () => remoteApi.delete('users/me').then(getRemoteData),
};
