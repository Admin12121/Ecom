import Providers from "./providers";
import { cookies } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const layout = cookieStore.get('react-resizable-panels:layout:mail')
  const collapsed = cookieStore.get('react-resizable-panels:collapsed')

  return <Providers layout={layout?.value} collapsed={collapsed?.value}>{children}</Providers>;
}
