import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1).max(255),
  emailUrl: z.string().min(1).max(255).url(),
  calendarUrl: z.string().min(1).max(255).url(),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
