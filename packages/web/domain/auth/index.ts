import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import { ENV } from '@/env.server';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: ENV.FACEBOOK_CLIENT_ID,
      clientSecret: ENV.FACEBOOK_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: ENV.APPLE_CLIENT_ID,
      clientSecret: ENV.APPLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day session storage
  },
  secret: process.env.NEXTAUTH_SECRET,
};
