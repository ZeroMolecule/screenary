import { ChangeEvent, FC, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Group, Stack } from '@mantine/core';
import { DateInput, DateValue, TimeInput } from '@mantine/dates';
import { IconCalendar, IconClock } from '@tabler/icons-react';
import { useController } from 'react-hook-form';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Text } from '../text';
import { extractTimeFromDate } from '@/utils/datetime';
import styles from '@/styles/components/date-time-input.module.scss';
import inputStyles from '@/styles/components/input.module.scss';

type Props = {
  name: string;
  label: string;
};

export const FormDateTimeInput: FC<Props> = (props) => {
  const { t, label, field, time, handleDate, handleTime } =
    useFormDateTimeInput(props);

  return (
    <Stack gap={0}>
      <Text size="sm" c="white" fw={500}>
        {label}
      </Text>
      <Group gap="xs" grow>
        <DateInput
          {...field}
          placeholder={t('datePlaceholder')}
          leftSection={
            <IconCalendar size={20} color="var(--mantine-color-primary-3)" />
          }
          classNames={{
            input: classNames(
              inputStyles.inputTransparent,
              styles.inputDateTime
            ),
            section: styles.sectionDateTime,
          }}
          onChange={handleDate}
          popoverProps={{ withinPortal: false }}
        />
        <TimeInput
          leftSection={
            <IconClock size={20} color="var(--mantine-color-primary-3)" />
          }
          classNames={{
            input: classNames(
              inputStyles.inputTransparent,
              styles.inputDateTime
            ),
            section: styles.sectionDateTime,
          }}
          value={time}
          onChange={handleTime}
        />
      </Group>
    </Stack>
  );
};

function useFormDateTimeInput({ name, label }: Props) {
  const t = useTranslations('shared.component.dateTime');

  const controller = useController({ name });
  const {
    field: { onChange, ...restField },
  } = controller;
  const date = controller.field.value;
  const timeRef = useRef(
    extractTimeFromDate(date)?.slice(0, 2).join(':') ?? ''
  );
  timeRef.current = extractTimeFromDate(date)?.slice(0, 2).join(':') ?? '';

  const formatDateTime = useCallback(
    (dateValue?: DateValue, timeValue?: string) => {
      const dateData = dateValue ?? date;
      const timeData = timeValue ?? timeRef.current;

      const [hour, minute] = timeData?.split(':') ?? [];
      return dayjs(dateData)
        .hour(Number(hour ?? 0))
        .minute(Number(minute ?? 0))
        .toDate();
    },
    [date]
  );

  const handleDate = (value: DateValue) => {
    onChange(formatDateTime(value, timeRef.current));
  };

  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value || '';
    timeRef.current = timeValue;
    onChange(formatDateTime(date, timeValue));
  };

  return {
    t,
    label,
    field: restField,
    time: timeRef.current,
    handleDate,
    handleTime,
  };
}
