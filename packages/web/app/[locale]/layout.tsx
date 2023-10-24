import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslator } from 'next-intl/server';
import { LOCALES } from '@/utils/constants';
import { Providers } from '../_components/providers';
import { ColorSchemeScript } from '@mantine/core';
import { MsClarity } from '../_components/ms-clarity';

type Params = { locale: string };
type Props = { children: ReactNode; params: Params };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'metadata');
  return {
    title: {
      template: t('template'),
      default: t('title'),
    },
    description: t('description'),
    metadataBase: new URL(process.env.WEB_URL as string),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [{ url: 'opengraph-image.png' }],
      locale,
      type: 'website',
    },
  };
}

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
      <head>
        <ColorSchemeScript />
        <MsClarity />
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
