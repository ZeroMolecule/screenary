import { FC, ReactNode } from 'react';
import type { Session } from 'next-auth';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from './theme';
import { SessionProvider } from './session';

type Props = {
  locale: string;
  session?: Session | undefined | null;
  children: ReactNode;
};

export const Providers: FC<Props> = ({ locale, session, children }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider session={session}>
        <ThemeProvider>{children}</ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};
