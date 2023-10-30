import * as Sentry from '@sentry/nextjs';
import { ENV } from './env.client';
import packageJSON from '../../package.json';

Sentry.init({
  dsn: ENV.NEXT_PUBLIC_SENTRY_WEB_DSN,
  environment: 'production',
  enabled: ENV.NODE_ENV === 'production',
  integrations: [new Sentry.Replay()],
  tracesSampleRate: 0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  release: packageJSON.version,
});
