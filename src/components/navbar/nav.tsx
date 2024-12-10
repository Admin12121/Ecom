"use client";
import React from "react";
import Cart from "./cart";
import Link from "next/link";
import { UserNav } from "./usernav";
import { siteConfig } from "@/config/site";
import { ArchiveRestore, Heart, Search } from "lucide-react";
import { CurrencySelector } from "./currency";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/use-auth-user";
import { MainNav } from "@/components/navbar/main-nav";
import { ModeSwitcher } from "@/components/navbar/mood-switcher";

export function SiteHeader({ children }: { children: React.ReactNode }) {
  const { status } = useAuthUser();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
        <nav className="flex h-16 items-center px-2 md:px-4 w-full">
          <MainNav />
          <div className="hidden md:flex flex-1 items-center justify-end gap-2 md:justify-end">
            <div className="flex items-center gap-1 w-full justify-end">
              <CurrencySelector className="hidden md:flex" />
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
      <footer className="flex md:hidden h-16 bottom-0 fixed z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
        <div className="flex w-full h-full items-center px-4 gap-2 justify-between">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Link href="/collections" rel="noreferrer" className="w-full h-full flex items-center justify-center">
              <ArchiveRestore className="h-4 w-4" />
              <span className="sr-only">collections</span>
            </Link>
          </Button>
          <CurrencySelector className="flex" />
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
      </footer>
    </>
  );
}
