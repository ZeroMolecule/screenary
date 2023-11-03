import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, LOCALES } from './utils/constants';
import { paths } from './navigation/paths';

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage =
    pathname === paths.login() || pathname === paths.register();
  const token = request.cookies.get('next-auth.session-token')?.value;
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(paths.login(), request.url));
  }
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(paths.home(), request.url));
  }

  return createIntlMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: 'as-needed',
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
