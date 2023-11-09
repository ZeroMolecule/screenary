'use client';

import { FC } from 'react';
import { Stack, StackProps } from '@mantine/core';
import { TitleAlt, TitleAltProps } from './base/title-alt';
import { TextAlt, TextAltProps } from './base/text-alt';
import { useLiveClock } from '@/hooks/use-live-clock';

// TODO: 🧹 Polishing Phase - optimize and add datetime support based on user location

type Props = {
  stackProps?: StackProps;
  titleProps?: TitleAltProps;
  textProps?: Omit<TextAltProps, 'children'>;
};

export const DateTimeBlock: FC<Props> = ({
  stackProps,
  titleProps,
  textProps,
}) => {
  const { currentTime, currentDate } = useDateTimeBlock();

  return (
    <Stack {...stackProps}>
      <TitleAlt {...titleProps}>{currentTime}</TitleAlt>
      <TextAlt {...textProps}>{currentDate}</TextAlt>
    </Stack>
  );
};

function useDateTimeBlock() {
  const { formatter } = useLiveClock();
  const currentTime = formatter('timeWith12HourClock');
  const currentDate = formatter('dateWithLongDayMonthWithoutYear');

  return { currentTime, currentDate };
}
