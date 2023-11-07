import axios from 'axios';
import { getSession } from 'next-auth/react';

let token: string | undefined;

export const nextApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const remoteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL,
});
remoteApi.interceptors.request.use(async (config) => {
  if (!token) {
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      token = cookies().get('next-auth.session-token')?.value;
    } else {
      const session = await getSession();
      token = session?.token;
    }
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
