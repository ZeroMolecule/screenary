import { FC, ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

type Props = {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
};

export const Providers: FC<Props> = ({ locale, messages, children }) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
