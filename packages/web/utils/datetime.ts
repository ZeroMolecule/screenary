export const getCurrentTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
