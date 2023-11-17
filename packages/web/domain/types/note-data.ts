import { Note } from '@prisma/client';

export type AddNoteData = Pick<Note, 'projectId'>;

export type EditNoteData = Pick<Note, 'id' | 'content' | 'projectId'>;

export type DeleteNoteData = {
  id: string;
  projectId: string;
};
