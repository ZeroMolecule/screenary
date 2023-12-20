import { createElement } from 'react';
import { useTranslations } from 'next-intl';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { isAxiosError } from 'axios';

export const useNotificationError = () => {
  const t = useTranslations('notification.error');

  const getMessage = (error: Error) => {
    let message;
    if (isAxiosError(error)) {
      message = error.response?.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = t('somethingWentWrong');
    }
    return message;
  };

  const showNotification = (error: Error) => {
    notifications.show({
      message: getMessage(error),
      color: 'red',
      icon: createElement(IconX),
      withBorder: true,
    });
  };

  return { getMessage, showNotification };
};
