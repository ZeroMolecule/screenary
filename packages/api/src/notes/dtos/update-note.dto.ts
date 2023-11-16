import { z } from 'zod';
import { createNoteSchema } from './create-note.dto';

export const updateNoteSchema = createNoteSchema.partial();

export type UpdateNoteDto = z.infer<typeof updateNoteSchema>;
