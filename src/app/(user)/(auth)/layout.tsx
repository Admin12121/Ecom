import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/(user)/(auth)/components/sidebar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Home",
    href: "/settings",
  },
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "My Orders",
    href: "/orders",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "My Reviews",
    href: "/reviews",
  },
  {
    title: "My Wishlist",
    href: "/wishlist",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
