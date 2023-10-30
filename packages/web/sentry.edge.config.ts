import * as Sentry from '@sentry/nextjs';
import { ENV } from './env.server';

Sentry.init({
  dsn: ENV.NEXT_PUBLIC_SENTRY_WEB_DSN,
  environment: 'production',
  enabled: ENV.NODE_ENV === 'production',
  tracesSampleRate: 1.0,
});
