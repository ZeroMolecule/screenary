import { Note } from '@prisma/client';

export type AddNoteData = Pick<Note, 'projectId'>;

export type EditNoteData = Omit<Note, 'userId'>;

export type DeleteNoteData = {
  id: string;
  projectId: string;
};
