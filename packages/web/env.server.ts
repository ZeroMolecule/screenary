import 'server-only';

import { z } from 'zod';
import { envBaseSchema } from './env';

const envServerSchema = envBaseSchema.extend({
  WEB_URL: z.string().min(1),
  CLARITY_ID: z.string().min(1),
  SENTRY_AUTH_TOKEN: z.string().min(1),
  SENTRY_ORG: z.string().min(1),
  SENTRY_WEB_PROJECT: z.string().min(1),
  SENTRY_API_PROJECT: z.string().min(1),
});

export const ENV = envServerSchema.parse(process.env);
