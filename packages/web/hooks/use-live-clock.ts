import { useEffect, useState } from 'react';
import { DateTimeFormat, formatDate } from '@/utils/datetime';

export const useLiveClock = () => {
  const [date, setDate] = useState(new Date());

  const formatter = (format: DateTimeFormat) => formatDate(date, format);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { date, formatter };
};
