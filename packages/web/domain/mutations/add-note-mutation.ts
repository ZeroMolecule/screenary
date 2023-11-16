import { Note } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { AddNoteData } from '../types/note-data';

export const addNoteMutation = {
  fnc: (data: AddNoteData) =>
    remoteApi
      .post(`projects/${data.projectId}/notes`, { data })
      .then(getRemoteData<Note>),
};
