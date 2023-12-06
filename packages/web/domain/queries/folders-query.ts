const FOLDERS_QUERY_KEY = 'directories';

export const foldersQuery = {
  key: (projectId: string) => [`projects/${projectId}/${FOLDERS_QUERY_KEY}`],
};
