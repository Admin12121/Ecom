// Public routes accessible without authentication
export const publicRoutes = [
    "/collections",
    "/collections/(.*)",
    "/wishlist",
];

// Routes that require user authentication
export const protectedRoutes = [
    "/dashboard",
    "/users",
    "/users/(.*)",
    "/products",
    "/products/(.*)",
    "/orders",
    "/orders/(.*)",
    "/profile",
    "/shipping",
    "/checkout/(.*)",
    "/reviews",
    "/notification",
];

export const adminRoutes = [
    "/dashboard",
    "/users",
    "/users/(.*)",
    "/products",
    "/products/(.*)",
    // "/orders",
    // "/orders/(.*)",
];

// Routes related to authentication processes
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/(.*)",
];


// Prefix for API authentication routes
export const apiAuthPrefix = "/api/auth";

// Default redirect path after login
export const Default_Login_Redirect = "/";