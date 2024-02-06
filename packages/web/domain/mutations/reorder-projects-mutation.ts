import { remoteApi } from '../remote';

export type ReorderData = { id: string; order: number }[];

export const reorderProjectsMutation = {
  fnc: (data: ReorderData) => remoteApi.put('projects', { data }),
};
