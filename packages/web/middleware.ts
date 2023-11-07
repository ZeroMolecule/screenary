import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, LOCALES } from './utils/constants';

export default async function middleware(request: NextRequest) {
  return createIntlMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: 'as-needed',
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
