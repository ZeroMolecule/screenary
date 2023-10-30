'use client';

import { FC } from 'react';
import {
  SessionProvider as AuthSessionProvider,
  SessionProviderProps as AuthSessionProviderProps,
} from 'next-auth/react';

type Props = AuthSessionProviderProps;

export const SessionProvider: FC<Props> = ({ children, ...restProps }) => {
  return <AuthSessionProvider {...restProps}>{children}</AuthSessionProvider>;
};
