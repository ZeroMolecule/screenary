import { TaskStatus } from '@prisma/client';
import { z } from 'zod';
import { createProjectSchema } from './create-project.dto';

export const updateProjectSchema = createProjectSchema.partial().extend({
  projectUser: z
    .object({
      taskStatus: z.nativeEnum(TaskStatus).nullish(),
    })
    .optional(),
});

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
