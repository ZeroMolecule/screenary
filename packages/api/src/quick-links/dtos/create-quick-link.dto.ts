import { z } from 'zod';
import { urlWithPrefixField } from '../../shared/zod';

export const createQuickLinkSchema = z.object({
  url: urlWithPrefixField,
  directoryId: z.string().nullish(),
  name: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateQuickLinkDto = z.infer<typeof createQuickLinkSchema>;
