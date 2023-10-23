import { FC, ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from './theme';

type Props = {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
};

export const Providers: FC<Props> = ({ locale, messages, children }) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
};
