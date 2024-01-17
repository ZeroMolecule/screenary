import { z } from 'zod';

const reorderItemSchema = z.object({
  id: z.string(),
  order: z.number(),
});

export const reorderItemsSchema = z.array(reorderItemSchema);

export type ReorderItemsDto = z.infer<typeof reorderItemsSchema>;
