import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const DATE_TIME_FORMAT = {
  default: '',
  dateWithLongDayMonthWithoutYear: 'dddd, MMMM Do',
  timeWith12HourClock: 'h:mm A',
};

export const formatDate = (
  date: Date | string,
  format: keyof typeof DATE_TIME_FORMAT
) => dayjs(date).format(DATE_TIME_FORMAT[format]);

export const getCurrentTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
