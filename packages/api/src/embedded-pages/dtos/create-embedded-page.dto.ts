import { z } from 'zod';

export const createEmbeddedPageSchema = z.object({
  url: z.string().url(),
  order: z.number().optional(),
  name: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateEmbeddedPageDto = z.infer<typeof createEmbeddedPageSchema>;
