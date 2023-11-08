'use client';

import { FC, useEffect, useState } from 'react';
import { Stack } from '@mantine/core';
import { TitleAlt } from '../base/title-alt';
import { TextAlt } from '../base/text-alt';
import { formatDate } from '@/utils/datetime';

// TODO: 🧹 Polishing Phase - add datetime support based on user location

export const DateTimeBlock: FC = () => {
  const { currentTime, currentDate } = useDateTimeBlock();

  return (
    <Stack gap={0}>
      <TitleAlt c="neutral.1">{currentTime}</TitleAlt>
      <TextAlt c="neutral.3">{currentDate}</TextAlt>
    </Stack>
  );
};

function useDateTimeBlock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const currentTime = formatDate(currentDateTime, 'timeWith12HourClock');
  const currentDate = formatDate(
    currentDateTime,
    'dateWithLongDayMonthWithoutYear'
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { currentTime, currentDate };
}
