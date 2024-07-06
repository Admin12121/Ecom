import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Provider";
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
      <Providers>{children}</Providers>
    </>
  );
}
