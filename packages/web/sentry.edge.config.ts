import * as Sentry from '@sentry/nextjs';
import { ENV } from './env.server';
import packageJSON from '../../package.json';

Sentry.init({
  dsn: ENV.NEXT_PUBLIC_SENTRY_WEB_DSN,
  environment: 'production',
  enabled: ENV.NODE_ENV === 'production',
  tracesSampleRate: 0,
  release: packageJSON.version,
});
