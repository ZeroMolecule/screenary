import { FC, ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from './theme';
import { SessionProvider } from './session';

type Props = {
  locale: string;
  children: ReactNode;
};

export const Providers: FC<Props> = ({ locale, children }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};
