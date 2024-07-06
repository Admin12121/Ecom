import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import ApiViewTransition  from "./apiview";


const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "Ecom",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  return (
    <ApiViewTransition>
        <body className={inter.className}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark", children }}>
            {children}
          </Providers>
        </body>
    </ApiViewTransition>
  );
}
