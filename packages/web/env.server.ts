import { z } from 'zod';
import { envBaseSchema } from './env';

const envServerSchema = envBaseSchema.extend({
  WEB_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  SHADOW_DATABASE_URL: z.string().min(1),
  CLARITY_ID: z.string().min(1),
  SENTRY_AUTH_TOKEN: z.string().min(1),
  SENTRY_ORG: z.string().min(1),
  SENTRY_WEB_PROJECT: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  FACEBOOK_CLIENT_ID: z.string().min(1),
  FACEBOOK_CLIENT_SECRET: z.string().min(1),
  APPLE_CLIENT_ID: z.string().min(1),
  APPLE_CLIENT_SECRET: z.string().min(1),
  APPLE_TEAM_ID: z.string().min(1),
  APPLE_PRIVATE_KEY: z.string().min(1),
  APPLE_KEY_ID: z.string().min(1),
});

export const ENV = envServerSchema.parse(process.env);
