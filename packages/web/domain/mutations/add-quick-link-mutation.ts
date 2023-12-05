import { QuickLink } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { AddQuickLinkData } from '../types/quick-link-data';

export const addQuickLinkMutation = {
  fnc: ({ projectId, ...data }: AddQuickLinkData) =>
    remoteApi
      .post(`projects/${projectId}/quick-links`, { data })
      .then(getRemoteData<QuickLink>),
};
