import { QuickLink } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { RefreshQuickLinkData } from '../types/quick-link-data';

export const refreshQuickLinkMutation = {
  fnc: ({ id, projectId, title }: RefreshQuickLinkData) =>
    remoteApi
      .put(`projects/${projectId}/quick-links/${id}`, { data: { title } })
      .then(getRemoteData<QuickLink>),
};
