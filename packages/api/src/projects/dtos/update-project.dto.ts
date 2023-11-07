import { z } from 'zod';
import { createProjectSchema } from './create-project.dto';

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
