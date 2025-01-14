import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
import {
  Default_Login_Redirect,
  adminRoutes,
  authRoutes,
  publicRoutes,
  protectedRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req, ctx) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isRouteMatch = (routes: string[]): boolean =>
    routes.some(route => nextUrl.pathname.startsWith(route));

  const routeType = {
    isPublicRoute: isRouteMatch(publicRoutes),
    isAuthRoute: isRouteMatch(authRoutes),
    isProtectedRoute: isRouteMatch(protectedRoutes),
    isAdminRoute: isRouteMatch(adminRoutes),
  };

  if (routeType.isPublicRoute) {
    return NextResponse.next();
  }

  if (routeType.isAuthRoute) {
    return isLoggedIn
      ? NextResponse.redirect(new URL(Default_Login_Redirect, req.url))
      : NextResponse.next();
  }

  if (routeType.isProtectedRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (routeType.isAdminRoute) {
      const token = req.auth?.accessToken || "";
      const decoded = decodeJwt(token);
      if (decoded.role !== "Admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/auth/(.*)"],
};
