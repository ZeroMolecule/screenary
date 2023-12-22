import { z } from 'zod';
import { urlWithPrefixField } from '../../shared/zod';

export const createProjectSchema = z.object({
  name: z.string().min(1).max(255),
  emailUrl: urlWithPrefixField,
  calendarUrl: urlWithPrefixField,
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
