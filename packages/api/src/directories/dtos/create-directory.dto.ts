import { z } from 'zod';

export const createDirectorySchema = z.object({
  name: z.string().min(1),
  parentId: z.string().nullish(),
});

export type CreateDirectoryDto = z.infer<typeof createDirectorySchema>;
