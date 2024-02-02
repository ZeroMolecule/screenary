'use client';

import { useLiveClock } from '@/hooks/use-live-clock';
import { Stack, StackProps } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { Text, TextProps } from './base/text';
import { Title, TitleProps } from './base/title';

// TODO: 🧹 Polishing Phase - optimize and add datetime support based on user location

type Props = {
  stackProps?: StackProps;
  titleProps?: TitleProps;
  textProps?: Omit<TextProps, 'children'>;
};

export const DateTimeBlock: FC<Props> = (props) => {
  const { stackProps, titleProps, textProps, dateTime } =
    useDateTimeBlock(props);

  if (!dateTime) {
    return <></>;
  }

  return (
    <Stack {...stackProps}>
      <Title ff="secondary" {...titleProps}>
        {dateTime.time}
      </Title>
      <Text ff="secondary" {...textProps}>
        {dateTime.date}
      </Text>
    </Stack>
  );
};

function useDateTimeBlock({ stackProps, titleProps, textProps }: Props) {
  const { formatter } = useLiveClock(new Date());

  const [dateTime, setDateTime] = useState<
    { time: string; date: string } | undefined
  >();

  useEffect(() => {
    setDateTime({
      time: formatter('timeWith12HourClock'),
      date: formatter('dateWithLongDayMonthWithoutYear'),
    });
  }, [formatter]);

  return { stackProps, titleProps, textProps, dateTime };
}
