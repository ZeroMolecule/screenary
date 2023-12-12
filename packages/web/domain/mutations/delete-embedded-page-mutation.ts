import { remoteApi } from '../remote';
import { DeleteEmbeddedPageData } from '../types/embedded-page-data';

export const deleteEmbeddedPageMutation = {
  fnc: ({ id, projectId }: DeleteEmbeddedPageData) =>
    remoteApi.delete(`projects/${projectId}/embedded-pages/${id}`),
};
