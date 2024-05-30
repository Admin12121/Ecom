import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/catalogd', '/login'];

  if (protectedPaths.includes(request.nextUrl.pathname)) {
    const cookieHeader = request.headers.get('cookie');
    const cookies = cookieHeader ? parse(cookieHeader) : {};
    const access_token = cookies.access_token || "";
    const refresh_token = cookies.refresh_token || "";

    if (request.nextUrl.pathname === '/catalog' && (!access_token || !refresh_token)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname === '/login' && (access_token || refresh_token)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  unstable_runtimeJS: false,
};
