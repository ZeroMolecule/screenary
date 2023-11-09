import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { getRemoteData } from '../remote/response/data';
import { remoteApi } from '../remote';

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: async ({ queryKey }) => {
            const [path, params] = queryKey as [string, unknown];
            return getRemoteData(await remoteApi.get(path, { params }));
          },
        },
      },
    })
);
