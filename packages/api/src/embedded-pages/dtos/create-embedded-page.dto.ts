import { z } from 'zod';
import { urlSchema } from '../../shared/zod';

export const createEmbeddedPageSchema = z.object({
  url: urlSchema,
  order: z.number().optional(),
  name: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateEmbeddedPageDto = z.infer<typeof createEmbeddedPageSchema>;
