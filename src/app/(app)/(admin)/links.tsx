import {
  Home,
  Settings,
  UserRound,
  Package,
  BadgePercent,
  MessageCircle
} from "lucide-react";

export const Links = [
  {
    title: "Dashboard",
    label: "9",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Users",
    icon: UserRound,
    href: "/users",
  },
  {
    title: "Products",
    label: "9",
    collapsible: true,
    isactive: true,
    icon: Package,
    subLinks: [
      { title: "Products", href: "/products" },
      { title: "Add Products", href: "/products/add-product" },
      { title: "category", href: "/products/category" },
      { title: "Stock", href: "/products/stock" },
      { title: "Discounts & Coupons", href: "/products/discounts" },
    ],
  },
  {
    title: "Orders",
    label: "9",
    icon: BadgePercent,
    href: "/orders",
  },
  {
    title: "Reviews",
    label: "9",
    icon: MessageCircle,
    href: "/reviews",
  },
  {
    title: "Settings",
    label: "9",
    icon: Settings,
    href: "/settings",
  },
];
