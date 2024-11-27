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
import { Icons } from "@/components/navbar/icons";
import { MainNav } from "@/components/navbar/main-nav";
import { ModeSwitcher } from "@/components/navbar/mood-switcher";

export function SiteHeader({ children }: { children: React.ReactNode }) {
  const { status } = useAuthUser();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
        <div className="flex h-16 items-center px-4 w-full">
          <MainNav />
          <div className="hidden md:flex flex-1 items-center justify-end gap-2 md:justify-end">
            <nav className="flex items-center gap-1 w-full justify-end">
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
            </nav>
          </div>
        </div>
      </header>
      {children}
      <nav className="flex md:hidden h-16 bottom-0 fixed z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
        <div className="flex w-full h-full items-center px-4 gap-2 justify-between">
          <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
            <Link href="/collections" rel="noreferrer">
              <ArchiveRestore className="h-4 w-4" />
              <span className="sr-only">collections</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
            <Link href="/wishlist" rel="noreferrer">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
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
      </nav>
    </>
  );
}
