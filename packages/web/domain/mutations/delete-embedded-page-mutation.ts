import { EmbeddedPage } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { DeleteEmbeddedPageData } from '../types/embedded-page-data';

export const deleteEmbeddedPageMutation = {
  fnc: ({ id, projectId }: DeleteEmbeddedPageData) =>
    remoteApi
      .delete(`projects/${projectId}/embedded-pages/${id}`)
      .then(getRemoteData<EmbeddedPage>),
};
