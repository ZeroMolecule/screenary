import { useEffect, useState } from 'react';
import { DateTimeFormat, formatDate } from '@/utils/datetime';

export const useLiveClock = (initialDate: Date | string = new Date()) => {
  const [date, setDate] = useState(initialDate);

  const formatter = (format: DateTimeFormat) => formatDate(date, format);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { date, formatter };
};
