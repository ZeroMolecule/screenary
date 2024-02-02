import { DateTimeFormat, formatDate } from '@/utils/datetime';
import { useCallback, useEffect, useState } from 'react';

export const useLiveClock = (initialDate: Date | string = new Date()) => {
  const [date, setDate] = useState(initialDate);

  const formatter = useCallback(
    (format: DateTimeFormat) => formatDate(date, format),
    [date]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { date, formatter };
};
