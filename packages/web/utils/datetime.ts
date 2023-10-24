import { DEFAULT_TIME_ZONE } from './constants';

export const getCurrentTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone ?? DEFAULT_TIME_ZONE;
