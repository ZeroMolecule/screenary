import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const DATE_TIME_FORMAT = {
  dateWithLongDayMonthWithoutYear: 'dddd, MMMM Do',
  timeWith12HourClock: 'h:mm A',
};
export type DateTimeFormat = keyof typeof DATE_TIME_FORMAT;

export const formatDate = (date: Date | string, format: DateTimeFormat) =>
  dayjs(date).format(DATE_TIME_FORMAT[format]);

export const getCurrentTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
