import { z } from 'zod';

export const createEmbeddedPageSchema = z.object({
  url: z.string().url(),
  order: z.number().optional(),
});

export type CreateEmbeddedPageDto = z.infer<typeof createEmbeddedPageSchema>;
