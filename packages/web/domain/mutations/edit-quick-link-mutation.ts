import { QuickLink } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { EditQuickLinkData } from '../types/quick-link-data';

export const editQuickLinkMutation = {
  fnc: ({ id, projectId, ...data }: EditQuickLinkData) =>
    remoteApi
      .put(`projects/${projectId}/quick-links/${id}`, { data })
      .then(getRemoteData<QuickLink>),
};
