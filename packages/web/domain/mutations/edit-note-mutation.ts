import { Note } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { EditNoteData } from '../types/note-data';

export const editNoteMutation = {
  fnc: ({ id, projectId, ...data }: EditNoteData) =>
    remoteApi
      .put(`projects/${projectId}/notes/${id}`, { data })
      .then(getRemoteData<Note>),
};
