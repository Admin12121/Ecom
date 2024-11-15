import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { Default_Login_Redirect, apiAuthPrefix, authRoutes, publicRoutes, protectedRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req, ctx) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isRouteMatch = (routes: string[]) =>
        routes.some((route) => {
            const regex = new RegExp(`^${route.replace(/\(.*\)/, ".*")}$`);
            return regex.test(nextUrl.pathname);
        });

    const routeType = {
        isPublicRoute: isRouteMatch(publicRoutes),
        isAuthRoute: isRouteMatch(authRoutes),
        isProtectedRoute: isRouteMatch(protectedRoutes),
    };

    // Allow public routes for all users
    if (routeType.isPublicRoute) {
        return NextResponse.next();
    }

    // If accessing auth routes
    if (routeType.isAuthRoute) {
        // Prevent access to auth routes if authenticated
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(Default_Login_Redirect, req.url));
        }
        return NextResponse.next();
    }

    // If accessing protected routes
    if (routeType.isProtectedRoute) {
        // Redirect to login if not authenticated
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
        return NextResponse.next();
    }

    // Default to allow other requests
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/auth/(.*)"],
};
