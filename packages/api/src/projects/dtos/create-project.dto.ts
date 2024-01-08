import { z } from 'zod';
import { urlSchema } from '../../shared/zod';

export const createProjectSchema = z.object({
  name: z.string().min(1).max(255),
  emailUrl: urlSchema,
  calendarUrl: urlSchema,
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
