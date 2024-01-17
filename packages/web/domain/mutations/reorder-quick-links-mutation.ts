import { QuickLink } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { ReorderData } from '../types/reorder-data';

export const reorderQuickLinksMutation = {
  fnc: ({ projectId, ...data }: ReorderData) =>
    remoteApi
      .put(`projects/${projectId}/quick-links`, data)
      .then(getRemoteData<QuickLink[]>),
};
