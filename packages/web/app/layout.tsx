import type { Metadata } from 'next';

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
