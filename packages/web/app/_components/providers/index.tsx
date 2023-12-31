import { FC, ReactNode } from 'react';
import type { Session } from 'next-auth';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from './theme';
import { SessionProvider } from './session';
import { getCurrentTimezone } from '@/utils/datetime';
import { QueryClientProvider } from './query-client';

type Props = {
  locale: string;
  session: Session | null;
  children: ReactNode;
};

export const Providers: FC<Props> = ({ locale, session, children }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={getCurrentTimezone()}
    >
      <SessionProvider session={session}>
        <ThemeProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};
