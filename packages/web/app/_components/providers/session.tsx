'use client';

import { FC } from 'react';
import {
  SessionProvider as AuthSessionProvider,
  SessionProviderProps as AuthSessionProviderProps,
} from 'next-auth/react';

type Props = AuthSessionProviderProps;

export const SessionProvider: FC<Props> = ({
  children,
  session,
  ...restProps
}) => {
  return (
    <AuthSessionProvider session={session} {...restProps}>
      {children}
    </AuthSessionProvider>
  );
};
