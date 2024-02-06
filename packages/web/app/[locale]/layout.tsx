import { authOptions } from '@/domain/auth';
import { ENV } from '@/env.server';
import styles from '@/styles/global.module.scss';
import { LOCALES } from '@/utils/constants';
import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getTranslator } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { MsClarity } from '../_components/ms-clarity';
import { Providers } from '../_components/providers';

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

  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
        <MsClarity />
      </head>
      <body>
        <Providers locale={locale} session={session}>
          <main className={styles['main-layout']}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
