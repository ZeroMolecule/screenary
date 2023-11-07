'use client';

import { FC, ReactNode, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTranslations } from 'next-intl';
import { isAxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useNotificationSuccess } from '@/hooks/use-notification-success';

type Props = {
  children: ReactNode;
};

export const QueryClientProvider: FC<Props> = ({ children }) => {
  const { queryClient } = useQueryClientProvider();

  return (
    <QCProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QCProvider>
  );
};

function useQueryClientProvider() {
  const t = useTranslations('notification');
  const onSuccess = useNotificationSuccess('saved');

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onSuccess,
            onError: (error) => {
              let message;
              if (isAxiosError(error)) {
                message = error.response?.data.message;
              } else if (error instanceof Error) {
                message = error.message;
              } else {
                message = t('error.somethingWentWrong');
              }
              notifications.show({
                message,
                color: 'red',
                icon: <IconX />,
                withBorder: true,
              });
            },
          },
        },
      })
  );

  return { queryClient };
}