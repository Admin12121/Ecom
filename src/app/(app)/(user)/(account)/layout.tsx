import { Metadata } from "next"
import { SidebarNav } from "./_components"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "My Orders",
    href: "/orders",
  },
  {
    title: "Profile Info",
    href: "/profile",
  },
  {
    title: "Shipping Address",
    href: "/shipping",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "My Reviews",
    href: "/reviews",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-2 md:p-10 pb-16 md:block">
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
