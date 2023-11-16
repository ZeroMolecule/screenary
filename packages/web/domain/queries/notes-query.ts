import { Note } from '@prisma/client';
import { remoteApi } from '../remote';
import { Data, getAxiosData } from '../remote/response/data';

const NOTES_QUERY_KEY = 'notes';

export const notesQuery = {
  key: (projectId: string) => [`projects/${projectId}/${NOTES_QUERY_KEY}`],
  fnc: (projectId: string) =>
    remoteApi
      .get(`projects/${projectId}/notes`)
      .then(getAxiosData<Data<Note[]>>),
};
