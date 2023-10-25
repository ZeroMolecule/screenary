import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: 'production',
  enabled: process.env.NODE_ENV === 'production',
  tracesSampleRate: 1.0,
});
