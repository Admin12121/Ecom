import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/settings'];
  
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const access_token = cookies.access || null;
  const refresh_token = cookies.refresh || null;


  if (request.nextUrl.pathname === '/login' && (access_token || refresh_token)) {
    return NextResponse.redirect(new URL('/', request.url));
  }


  if (protectedPaths.includes(request.nextUrl.pathname) && (!access_token || !refresh_token)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  unstable_runtimeJS: false,
};
