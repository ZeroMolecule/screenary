import { EMBEDDED_PAGES_QUERY_KEY } from './embedded-pages-query';

export const embeddedPageQuery = {
  key: (projectId: string, pageId: string) => [
    `projects/${projectId}/${EMBEDDED_PAGES_QUERY_KEY}/${pageId}`,
  ],
};
