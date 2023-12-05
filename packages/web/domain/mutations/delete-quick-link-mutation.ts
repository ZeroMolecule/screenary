import { remoteApi } from '../remote';
import { DeleteQuickLinkData } from '../types/quick-link-data';

export const deleteQuickLinkMutation = {
  fnc: ({ id, projectId }: DeleteQuickLinkData) =>
    remoteApi.delete(`projects/${projectId}/quick-links/${id}`),
};
