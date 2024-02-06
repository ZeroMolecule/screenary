import { z } from 'zod';
import { urlSchema } from '../../shared/zod';

export const createQuickLinkSchema = z.object({
  url: urlSchema,
  directoryId: z.string().nullish(),
  title: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateQuickLinkDto = z.infer<typeof createQuickLinkSchema>;
