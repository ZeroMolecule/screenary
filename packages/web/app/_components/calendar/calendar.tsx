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
        src="https://calendar.google.com/calendar/embed?ctz=Europe%2FBelgrade&showTitle=1&showNav=1&showDate=1&showTabs=1&showCalendars=1&showTz=0&src=bHVrYS5kdXNha0B6ZXJvbW9sZWN1bGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y18wMmExZWZmOGQwMmY2NDc2YzhlNjlhMzA3YzRiMjBjMTczYTc2YjU2YjczN2YyYzFiOWQxMDU0NDcwNzE5MDkzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uY3JvYXRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%233F51B5&color=%230B8043"
        className={styles.iframe}
      />
    </Card>
  );
};
