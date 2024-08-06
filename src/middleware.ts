import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { jwtVerify, decodeJwt  } from 'jose'; 

interface MyJwtPayload {
  roles?: string[];
  is_admin: boolean;
}

export async function middleware(request: NextRequest) {
  const protectedPaths = ['/settings', '/admin'];
  const adminPaths = ['/admin'];

  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const access_token = cookies.access_token || null;
  const refresh_token = cookies.refresh_token || null;
  const jwtSecret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string);
  if (request.nextUrl.pathname === '/login' && (access_token || refresh_token)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (protectedPaths.includes(request.nextUrl.pathname) && (!access_token || !refresh_token)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (refresh_token) {
    const decodedRefreshToken = decodeJwt(refresh_token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedRefreshToken.exp && decodedRefreshToken.exp < currentTime) {
      return NextResponse.redirect(new URL('/login?sessionExpired=true', request.url));
    }
  }

  // Check is_admin for admin paths
  if (adminPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    if (!access_token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(access_token, jwtSecret) as { payload: MyJwtPayload };
      if (!payload.is_admin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/settings', '/admin/:path*'],
};
