import type { Metadata } from 'next';
import { ENV } from '../env';

export const metadata: Metadata = {
  title: {
    template: '%s | Screenary',
    default: 'Screenary',
  },
  description: 'All your screens and apps in one place.',
  metadataBase: new URL(ENV.WEB_URL),
  manifest: 'manifest.json',
  openGraph: {
    title: 'Screenary',
    description: 'All your screens and apps in one place.',
    images: [{ url: 'cover-image.png' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Screenary',
    description: 'All your screens and apps in one place.',
    images: [{ url: 'cover-image.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
