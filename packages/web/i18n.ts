import { getRequestConfig } from 'next-intl/server';
import { getCurrentTimezone } from './utils/datetime';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale}.json`)).default,
  timeZone: getCurrentTimezone(),
}));
