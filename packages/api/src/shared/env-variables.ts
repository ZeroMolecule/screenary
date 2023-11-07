import z from 'zod';

export type EnvVariables = z.infer<typeof envVariablesSchema>;

export const envVariablesSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  WEB_URL: z.string().min(1),
  SENTRY_ORG: z.string().min(1),
  SENTRY_AUTH_TOKEN: z.string().min(1),
  SENTRY_API_DSN: z.string().min(1),
  SENTRY_API_PROJECT: z.string().min(1),
  SENTRY_RELEASE: z.string().nullish(),
  DATABASE_URL: z.string().min(1),
  SHADOW_DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
});
