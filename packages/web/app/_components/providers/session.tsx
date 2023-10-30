'use client';

import { FC } from 'react';
import {
  SessionProvider as AuthSessionProvider,
  SessionProviderProps as AuthSessionProviderProps,
} from 'next-auth/react';
import { redirect, usePathname } from '@/navigation';
import { paths } from '@/navigation/paths';

type Props = AuthSessionProviderProps;

export const SessionProvider: FC<Props> = ({
  children,
  session,
  ...restProps
}) => {
  const pathname = usePathname();
  const authPage = pathname === paths.login() || pathname === paths.register();

  if (!session && !authPage) {
    redirect(paths.login());
  }
  if (session && authPage) {
    redirect(paths.home());
  }

  return (
    <AuthSessionProvider session={session} {...restProps}>
      {children}
    </AuthSessionProvider>
  );
};
