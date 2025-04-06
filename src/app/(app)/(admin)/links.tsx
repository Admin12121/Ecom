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
    title: "Chats",
    icon: MessageCircle,
    href: "/chats",
  },
  {
    title: "Products",
    label: "9",
    collapsible: true,
    isactive: true,
    href: "/products",
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
    title: "Sales",
    label: "9",
    icon: BadgePercent,
    href: "/sales",
  },
  {
    title: "Reviews",
    label: "9",
    icon: MessageCircle,
    href: "/user-reviews",
  },
  {
    title: "Settings",
    label: "9",
    icon: Settings,
    href: "/settings",
  },
];
