import { envBaseSchema } from './env';

const envClientSchema = envBaseSchema.extend({});

export const ENV = envClientSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
