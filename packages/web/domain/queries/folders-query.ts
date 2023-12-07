const FOLDERS_QUERY_KEY = 'directories';

type FolderParams = {
  parentId?: string;
};

export const foldersQuery = {
  key: (projectId: string, params: FolderParams = { parentId: 'null' }) => [
    `projects/${projectId}/${FOLDERS_QUERY_KEY}`,
    {
      where: {
        ...params,
      },
    },
  ],
};
