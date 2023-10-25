import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  WEB_URL: z.string().min(1),
  CLARITY_ID: z.string().min(1),
  SENTRY_DSN: z.string().min(1),
  NEXT_PUBLIC_SENTRY_DSN: z.string().min(1),
  SENTRY_AUTH_TOKEN: z.string().min(1),
  SENTRY_ORG: z.string().min(1),
  SENTRY_WEB_PROJECT: z.string().min(1),
  SENTRY_API_PROJECT: z.string().min(1),
});

export const ENV = envSchema.parse(process.env);
