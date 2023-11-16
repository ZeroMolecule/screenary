import { Note } from '@prisma/client';
import { remoteApi } from '../remote';
import { getRemoteData } from '../remote/response/data';
import { EditNoteData } from '../types/note-data';

export const editNoteMutation = {
  fnc: ({ id, ...data }: EditNoteData) =>
    remoteApi
      .put(`projects/${data.projectId}/notes/${id}`, { data })
      .then(getRemoteData<Note>),
};
