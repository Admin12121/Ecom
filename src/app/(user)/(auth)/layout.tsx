import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserSidebar from "@/components/UserSidebar/usersidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="p-5 flex min-h-[100vh]">
        <UserSidebar />
        {children}
      </section>
    </>
  );
}
