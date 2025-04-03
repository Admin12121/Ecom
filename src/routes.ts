export const publicRoutes = ["/collections", "/collections/(.*)", "/wishlist"];

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
  "/sales",
  "/sales/(.*)",
  "/user-reviews",
  "/settings",
];

export const adminRoutes = [
  "/dashboard",
  "/users",
  "/users/(.*)",
  "/products",
  "/products/(.*)",
  "/sales",
  "/sales/(.*)",
  "/user-reviews",
  "/settings",
];

export const authRoutes = ["/auth/login", "/auth/register", "/auth/(.*)/(.*)"];

export const apiAuthPrefix = "/api/auth";

export const Default_Login_Redirect = "/";
