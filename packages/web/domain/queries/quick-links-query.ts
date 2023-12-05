const QUICK_LINKS_QUERY_KEY = 'quick-links';

export const quickLinksQuery = {
  key: (projectId: string) => [
    `projects/${projectId}/${QUICK_LINKS_QUERY_KEY}`,
  ],
};
