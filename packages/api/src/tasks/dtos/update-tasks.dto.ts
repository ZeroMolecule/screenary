import { z } from 'zod';

const updateTaskSchema = z.object({
  id: z.string(),
  order: z.number(),
});

export const updateTasksSchema = z.array(updateTaskSchema);

export type UpdateTasksDto = z.infer<typeof updateTasksSchema>;
