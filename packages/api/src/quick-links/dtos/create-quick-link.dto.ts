import { z } from 'zod';

export const createQuickLinkSchema = z.object({
  url: z.string().url(),
  directoryId: z.string().nullish(),
  name: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateQuickLinkDto = z.infer<typeof createQuickLinkSchema>;
