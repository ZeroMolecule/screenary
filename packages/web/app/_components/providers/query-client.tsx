'use client';

import { remoteApi } from '@/domain/remote';
import { getAxiosData } from '@/domain/remote/response/data';
import { useNotificationError } from '@/hooks/use-notification-error';
import {
  QueryClientProvider as QCProvider,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode, useState } from 'react';

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
  const { showNotification: onError } = useNotificationError();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: async ({ queryKey }) => {
              const [path, params] = queryKey as [string, unknown];
              return getAxiosData(await remoteApi.get(path, { params }));
            },
            retry: false,
            refetchOnWindowFocus: false,
          },
          mutations: {
            onError,
          },
        },
      })
  );

  return { queryClient };
}
