export const EMBEDDED_PAGES_QUERY_KEY = 'embedded-pages';

export const embeddedPagesQuery = {
  key: (projectId: string) => [
    `projects/${projectId}/${EMBEDDED_PAGES_QUERY_KEY}`,
  ],
};
