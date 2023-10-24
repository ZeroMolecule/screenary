import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslator } from 'next-intl/server';
import { LOCALES } from '@/utils/constants';
import { Providers } from '../_components/providers';
import { ENV } from '@/env';

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
      images: [{ url: 'cover-image.png' }],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
      images: [{ url: 'cover-image.png' }],
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
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
