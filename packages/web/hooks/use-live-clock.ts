import { useEffect, useState } from 'react';
import { DateTimeFormat, formatDate } from '@/utils/datetime';

export const useLiveClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const formatter = (format: DateTimeFormat) =>
    formatDate(currentDateTime, format);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { currentDateTime, formatter };
};
