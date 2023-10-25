import { z } from 'zod';

export const envBaseSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_SENTRY_DSN: z.string().min(1),
});
