export const publicRoutes = [
    "/",
    "/auth/(.*)",
    "/collections",
    "/collections/(.*)",
    "/explore/(.*)",
]

export const protectedRoutes = [
    "/dashboard"
]


export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/(.*)"
]


export const apiAuthPrefix = "/api/auth";
export const Default_Login_Redirect = "/dashboard";