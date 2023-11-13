import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { remoteApi } from '../remote';
import { getAxiosData } from '../remote/response/data';

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: async ({ queryKey }) => {
            const [path, params] = queryKey as [string, unknown];
            return getAxiosData(await remoteApi.get(path, { params }));
          },
        },
      },
    })
);
