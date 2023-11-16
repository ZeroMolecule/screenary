import { z } from 'zod';

export const createNoteSchema = z.object({
  content: z.string().default(''),
});

export type CreateNoteDto = z.infer<typeof createNoteSchema>;
