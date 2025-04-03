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
  const matchRoute = (routes: string[]): boolean =>
    routes.some((route) =>
      new RegExp(`^${route.replace(/\(.*\)/g, ".*")}$`).test(nextUrl.pathname)
    );

  if (matchRoute(publicRoutes)) return NextResponse.next();

  if (matchRoute(authRoutes)) {
    return isLoggedIn
      ? NextResponse.redirect(new URL(Default_Login_Redirect, req.url))
      : NextResponse.next();
  }

  if (matchRoute(protectedRoutes)) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/auth/login", req.url));

    if (matchRoute(adminRoutes)) {
      const token = req.auth?.accessToken || "";
      const { role } = decodeJwt(token);
      if (role !== "Admin") {
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