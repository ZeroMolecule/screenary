import { FC } from 'react';
import { Card } from '@mantine/core';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/calendar.module.scss';

type Props = {
  url?: string;
};

export const Calendar: FC<Props> = () => {
  return (
    <Card h="100%" radius={24} className={overflowStyles['overflow-auto']}>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_02a1eff8d02f6476c8e69a307c4b20c173a76b56b737f2c1b9d1054470719093%40group.calendar.google.com&ctz=Europe%2FBelgrade"
        className={styles.iframe}
      />
    </Card>
  );
};
