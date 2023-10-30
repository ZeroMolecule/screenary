import { z } from 'zod';

export const envBaseSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_API_BASE_URL: z.string().min(1),
  NEXT_PUBLIC_REMOTE_API_BASE_URL: z.string().min(1),
  NEXT_PUBLIC_SENTRY_WEB_DSN: z.string().min(1),
});
