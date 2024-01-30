import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { getAxiosData } from '../remote/response/data';

export const getQueryClient = cache(async () => {
  const token =
    cookies().get('next-auth.session-token')?.value ??
    cookies().get('__Secure-next-auth.session-token')?.value;

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL,
    headers: { Authorization: token ? `Bearer ${token}` : undefined },
  });

  return new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: async ({ queryKey }) => {
          const [path, params] = queryKey as [string, unknown];
          return getAxiosData(await api.get(path, { params }));
        },
      },
    },
  });
});
