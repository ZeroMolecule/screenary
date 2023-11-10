'use client';

import { FC } from 'react';
import { Stack, StackProps } from '@mantine/core';
import { Title, TitleProps } from './base/title';
import { Text, TextProps } from './base/text';
import { useLiveClock } from '@/hooks/use-live-clock';

// TODO: 🧹 Polishing Phase - optimize and add datetime support based on user location

type Props = {
  stackProps?: StackProps;
  titleProps?: TitleProps;
  textProps?: Omit<TextProps, 'children'>;
  initialDate?: Date | string;
};

export const DateTimeBlock: FC<Props> = (props) => {
  const { stackProps, titleProps, textProps, currentTime, currentDate } =
    useDateTimeBlock(props);

  return (
    <Stack {...stackProps}>
      <Title ff="secondary" {...titleProps}>
        {currentTime}
      </Title>
      <Text ff="secondary" {...textProps}>
        {currentDate}
      </Text>
    </Stack>
  );
};

function useDateTimeBlock({
  stackProps,
  titleProps,
  textProps,
  initialDate,
}: Props) {
  const { formatter } = useLiveClock(initialDate);
  const currentTime = formatter('timeWith12HourClock');
  const currentDate = formatter('dateWithLongDayMonthWithoutYear');

  return { stackProps, titleProps, textProps, currentTime, currentDate };
}
