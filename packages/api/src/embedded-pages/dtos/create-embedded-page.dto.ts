import { z } from 'zod';
import { urlWithPrefixField } from '../../shared/zod';

export const createEmbeddedPageSchema = z.object({
  url: urlWithPrefixField,
  order: z.number().optional(),
  name: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateEmbeddedPageDto = z.infer<typeof createEmbeddedPageSchema>;
