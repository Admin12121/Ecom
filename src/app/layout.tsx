import type { Viewport } from "next";
import { Metadata } from "next";
import { absoluteUrl, constructMetadata } from "@/config/site";
import localFont from "next/font/local";
import { Provider } from "@/components/provider";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { auth } from "@/auth";

import "@/styles/globals.css";

const geistSansLight = localFont({
  src: "./fonts/AtAero-Light.woff2",
  variable: "--font-geist-sans-light",
  weight: "300",
});

const geistSansRegular = localFont({
  src: "./fonts/AtAero-Regular.woff2",
  variable: "--font-geist-sans-regular",
  weight: "400",
});

const geistSansMedium = localFont({
  src: "./fonts/AtAero-Medium.woff2",
  variable: "--font-geist-sans-medium",
  weight: "500",
});

const geistSansSemibold = localFont({
  src: "./fonts/AtAero-Semibold.woff2",
  variable: "--font-geist-sans-semibold",
  weight: "600",
});

const geistSansBold = localFont({
  src: "./fonts/AtAero-Bold.woff2",
  variable: "--font-geist-sans-bold",
  weight: "700",
});

export const metadata: Metadata = constructMetadata({
  title: "Nepal Heritage Handicraft",
  description:
    "Authentic Nepalese art, sculptures, and handicrafts for cultural enthusiasts.",
  image: absoluteUrl("/og"),
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${geistSansLight.variable} ${geistSansRegular.variable} ${geistSansMedium.variable} ${geistSansSemibold.variable} ${geistSansBold.variable} antialiased flex flex-col items-center`}
        >
          <NextTopLoader
            color="linear-gradient(to right, #9353d3, #F38CB8, #FDCC92)"
            initialPosition={0.08}
            crawlSpeed={100}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={100}
          />
          <Provider>{children}</Provider>
        </body>
      </html>
    </SessionProvider>
  );
}
