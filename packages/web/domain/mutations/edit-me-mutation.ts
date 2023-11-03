import { User } from '@prisma/client';
import { remoteApi } from '../remote';
import { UserEditMeData } from '../types/user-data';
import { Data, getRemoteData } from '../remote/response/data';

export const editMeMutation = {
  fnc: (data: UserEditMeData) =>
    remoteApi.put<Data<User>>('users/me', { data }).then(getRemoteData),
};
