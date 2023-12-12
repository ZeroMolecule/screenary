import { EmbeddedPage } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { AddEmbeddedPageData } from '../types/embedded-page-data';

export const addEmbeddedPageMutation = {
  fnc: ({ projectId, ...data }: AddEmbeddedPageData) =>
    remoteApi
      .post(`projects/${projectId}/embedded-pages`, { data })
      .then(getRemoteData<EmbeddedPage>),
};
