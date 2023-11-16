import { remoteApi } from '../remote';
import { DeleteNoteData } from '../types/note-data';

export const deleteNoteMutation = {
  fnc: ({ id, projectId }: DeleteNoteData) =>
    remoteApi.delete(`projects/${projectId}/notes/${id}`),
};
