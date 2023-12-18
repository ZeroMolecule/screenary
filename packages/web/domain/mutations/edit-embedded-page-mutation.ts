import { EmbeddedPage } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { EditEmbeddedPageData } from '../types/embedded-page-data';

export const editEmbeddedPageMutation = {
  fnc: ({ id, projectId, ...data }: EditEmbeddedPageData) =>
    remoteApi
      .put(`projects/${projectId}/embedded-pages/${id}`, { data })
      .then(getRemoteData<EmbeddedPage>),
};
