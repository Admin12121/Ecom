import { SiteHeader } from "@/components/navbar/nav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteHeader>{children}</SiteHeader>;
}
