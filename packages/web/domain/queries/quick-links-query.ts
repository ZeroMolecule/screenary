const QUICK_LINKS_QUERY_KEY = 'quick-links';

type QuickLinksParams = {
  directoryId?: string;
};

export const quickLinksQuery = {
  key: (
    projectId: string,
    params: QuickLinksParams = { directoryId: 'null' }
  ) => [
    `projects/${projectId}/${QUICK_LINKS_QUERY_KEY}`,
    {
      where: {
        ...params,
      },
    },
  ],
};
