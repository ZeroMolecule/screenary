import { User } from '@prisma/client';
import { remoteApi } from '../remote';
import { UserEditProfileData } from '../types/user-data';
import { Data, getRemoteData } from '../remote/response/data';

export const editProfileMutation = {
  fnc: (data: UserEditProfileData) =>
    remoteApi.put<Data<User>>('users/me', { data }).then(getRemoteData),
};
