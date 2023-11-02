import { User } from '@prisma/client';
import { remoteApi } from '../remote';
import { UserEditProfileData } from '../types/user-data';

export const editProfileMutation = {
  fnc: (data: UserEditProfileData) => remoteApi.put<User>('users/me', { data }),
};
