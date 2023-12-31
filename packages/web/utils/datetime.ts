import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { padStart } from 'lodash';

// be sure to update intl.js if new value is added here
type TimeOfTheDay = 'morning' | 'afternoon' | 'evening';

dayjs.extend(advancedFormat);

export const DATE_TIME_FORMAT = {
  dateWithLongDayMonthWithoutYear: 'dddd, MMMM Do',
  dateTimeWithLongDayMonthWithoutYear: 'dddd, MMMM Do, h:mm A',
  timeWith12HourClock: 'h:mm A',
  dateAndTime: 'MM/DD/YYYY h:mm A',
};
export type DateTimeFormat = keyof typeof DATE_TIME_FORMAT;

export const formatDate = (date: Date | string, format: DateTimeFormat) =>
  dayjs(date).format(DATE_TIME_FORMAT[format]);

export const getCurrentTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getTimeOfTheDay = (date: Date): TimeOfTheDay => {
  const hour = date.getHours();
  if (hour > 4 && hour <= 12) {
    return 'morning';
  } else if (hour > 12 && hour <= 18) {
    return 'afternoon';
  }
  return 'evening';
};

export const extractTimeFromDate = (value: Date | string) => {
  if (!value) {
    return;
  }
  const date = typeof value === 'string' ? new Date(value) : value;
  const startWithZero = (value: number) => padStart(value.toString(), 2, '0');
  return [
    startWithZero(date.getHours()),
    startWithZero(date.getMinutes()),
    startWithZero(date.getSeconds()),
  ];
};
