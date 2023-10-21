import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES } from '@/utils/constants';
import { Providers } from '../_components/providers';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: {
    template: '%s | Screenary',
    default: 'Screenary',
  },
  description: 'All your screens and apps in one place.',
  metadataBase: new URL(process.env.WEB_URL as string),
  openGraph: {
    title: 'Screenary',
    description: 'All your screens and apps in one place.',
    images: [{ url: 'opengraph-image.png' }],
    locale: 'en_US',
    type: 'website',
  },
  manifest: 'manifest.json',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const isValidLocale = LOCALES.some((curr) => curr === locale);
  if (!isValidLocale) {
    return notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
