'use client';

import { Text } from '@/app/_components/base/text';
import { generateFirstName } from '@/domain/util/user';
import { getTimeOfTheDay } from '@/utils/datetime';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export const Greeting = () => {
  const t = useTranslations('shared');
  const session = useSession();
  const [message, setMessage] = useState<string | undefined>();

  const username = session.data?.user?.name;

  useEffect(() => {
    setMessage(
      username
        ? t('welcomeMessage.base', {
            time: t(`welcomeMessage.time.${getTimeOfTheDay(new Date())}`),
            username: generateFirstName(username),
          })
        : t('welcomeMessage.fallback')
    );
  }, [t, username]);

  if (!message) {
    return <></>;
  }

  return (
    <Text fz={44} c="primary.1" fw={700}>
      {message}
    </Text>
  );
};
