import { z } from 'zod';
import { TaskStatus } from '@prisma/client';

export const createTaskSchema = z.object({
  title: z.string(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO),
  dueDate: z.coerce.date().nullish(),
  content: z.string().nullish(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
