"use client";
import React from "react";
import Link from "next/link";
import { UserNav } from "./usernav";
import { ArchiveRestore, Heart } from "lucide-react";
import { CurrencySelector } from "./currency";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/use-auth-user";
import { MainNav } from "@/components/navbar/main-nav";
import { ModeSwitcher } from "@/components/navbar/mood-switcher";
import Icons from "./cart/icons";
import dynamic from "next/dynamic";

import Cart from "./cart";

const Footer = dynamic(() => import("./footer"), { ssr: false });
const SiteBanner = dynamic(() => import("../site-banner"), { ssr: false });

export function SiteHeader({ children }: { children: React.ReactNode }) {
  const { status } = useAuthUser();

  return (
    <>
      <SiteBanner />
      <header className="sticky flex justify-center top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
        <nav className="max-w-[95rem] flex h-16 items-center px-2 md:px-4 w-full">
          <MainNav />
          <div className="hidden md:flex flex-1 items-center justify-end gap-2 md:justify-end">
            <div className="flex items-center gap-1 w-full justify-end">
              <CurrencySelector className="hidden lg:flex !border-0 !ring-0 !ring-offset-0 !shadow-none" />
              <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Link href="/wishlist" rel="noreferrer">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
              <Cart />
              <ModeSwitcher />
              {status ? (
                <UserNav />
              ) : (
                <Button variant="ghost" size="icon" className="h-8 w-20 px-1">
                  <Link href="/auth/login">Sign Up</Link>
                </Button>
              )}
            </div>
          </div>
        </nav>
      </header>
      {children}
      <footer className="w-full">
        <Footer />
        <div className="hidden lg:flex h-10 bottom-0 z-50 w-full border-t-1  dark:!border-neutral-900 justify-center items-center">
          <div className="max-w-[95rem] w-full h-full flex justify-between items-center px-5">
            <span className="flex gap-2">
              <CurrencySelector className="flex !border-0 !ring-0 !ring-offset-0 !shadow-none" />
              <Icons
                className="justify-start"
                icons={["esewa", "visa", "mastercard", "amex", "paypal"]}
              />
            </span>
            <p className="dark:text-neutral-400 text-sm text-neutral-600">
              Design and development by{" "}
              <a
                href="https://vickytajpuriya.com"
                target="_blank"
                className="text-neutral-700 hover:text-neutral-800  dark:text-neutral-300 hover:dark:text-white transition duration-500"
              >
                Vicky Tajpuriya
              </a>
            </p>
            <span className="dark:text-neutral-300 text-xs font- flex gap-2 ">
              <Link
                className="hover:dark:text-white transition duration-500"
                href="/terms-of-service"
              >
                Terms of Service
              </Link>
              <p>.</p>
              <Link
                className="hover:dark:text-white transition duration-500"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </span>
          </div>
        </div>
        <div className="max-w-[95rem] flex md:hidden h-16 bottom-0 fixed z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
          <div className="flex w-full h-full items-center px-4 gap-2 justify-between">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Link
                href="/collections"
                rel="noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                <ArchiveRestore className="h-4 w-4" />
                <span className="sr-only">collections</span>
              </Link>
            </Button>
            <CurrencySelector className="flex !border-0 !ring-0 !ring-offset-0 !shadow-none" />
            {status ? (
              <UserNav align="center" />
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-20 px-1">
                <Link href="/auth/login">Sign Up</Link>
              </Button>
            )}
            <Cart />
            <ModeSwitcher />
          </div>
        </div>
      </footer>
    </>
  );
}
