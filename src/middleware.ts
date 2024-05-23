// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(request: NextRequest) {
  const protectedPath = '/data';

  if (request.nextUrl.pathname === protectedPath) {
    const cookieHeader = request.headers.get('cookie');
    const cookies = cookieHeader ? parse(cookieHeader) : {};
    const access_token = cookies.access_token || "";
    const refresh_token = cookies.refresh_token || "";

    if (!access_token || !refresh_token) {
      return NextResponse.redirect(new URL('/signup', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/catalog',
};
