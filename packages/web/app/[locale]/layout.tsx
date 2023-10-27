import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslator } from 'next-intl/server';
import { LOCALES } from '@/utils/constants';
import { Providers } from '../_components/providers';
import { ENV } from '@/env';
import { ColorSchemeScript } from '@mantine/core';

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
    metadataBase: new URL(ENV.WEB_URL),
    manifest: 'manifest.json',
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [{ url: 'images/cover-image.png' }],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
      images: [{ url: 'images/cover-image.png' }],
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  if (!LOCALES.includes(locale)) {
    return notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
