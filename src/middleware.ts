
    import authConfig from "@/auth.config";
    import NextAuth from "next-auth";
    import { NextResponse } from 'next/server';
    import { Default_Login_Redirect, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
    const { auth } = NextAuth(authConfig);

    export default auth((req, ctx) => { 
        const { nextUrl } = req;
        const isLoggedIn = req.auth;
        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

        const isPublicRoute = publicRoutes.some(route => {
            const regex = new RegExp(`^${route.replace(/\(.*\)/, ".*")}$`);
            return regex.test(nextUrl.pathname);
        });

        const isAuthRoute = authRoutes.some(route => {
            const regex = new RegExp(`^${route.replace(/\(.*\)/, ".*")}$`);
            return regex.test(nextUrl.pathname);
        });

        if (isApiAuthRoute || isPublicRoute) {
            return NextResponse.next();
        }

        if (isAuthRoute) {
            if (isLoggedIn) {
                return NextResponse.redirect(new URL(Default_Login_Redirect, nextUrl));
            }
            return NextResponse.next();
        }

        if (!isLoggedIn) {
            if(!isAuthRoute){
                return NextResponse.redirect(new URL("/auth/login", nextUrl));
            }
        }
        return NextResponse.next();
    });

    export const config = {
        matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/auth/(.*)"],
    };
