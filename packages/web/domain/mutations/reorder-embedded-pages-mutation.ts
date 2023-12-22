import { EmbeddedPage } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { ReorderData } from '../types/reorder-data';

export const reorderEmbeddedPagesMutation = {
  fnc: ({ projectId, ...data }: ReorderData) =>
    remoteApi
      .put(`projects/${projectId}/embedded-pages`, data)
      .then(getRemoteData<EmbeddedPage[]>),
};
