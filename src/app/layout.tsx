import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/footer";
import ApiViewTransition  from "./apiview";


const inter = Inter({ subsets: ["latin"] });

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
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </body>
    </ApiViewTransition>
  );
}
