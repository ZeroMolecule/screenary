const NOTES_QUERY_KEY = 'notes';

export const notesQuery = {
  key: (projectId: string) => [`projects/${projectId}/${NOTES_QUERY_KEY}`],
};
