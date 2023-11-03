import type { AuthOptions } from 'next-auth';
import { cookies } from 'next/headers';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { ENV } from '@/env.server';
import { prisma } from '../db/prisma-client';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
    maxAge: 1 * 24 * 60 * 60, // 1 day session storage,
  },
  callbacks: {
    jwt: async ({ token, trigger, session }) => {
      if (trigger === 'update') {
        token = { ...token, ...session };
      }
      return token;
    },
    session: async ({ session, token }) => {
      const cookieToken = cookies().get('next-auth.session-token')?.value;
      if (cookieToken) {
        session.token = cookieToken;
      }
      if (token) {
        const { name, email, picture } = token;
        session.user = { name, email, image: picture };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
