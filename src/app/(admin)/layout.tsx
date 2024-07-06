import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/components/Admin/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecom Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}
