import Link from "next/link";

import { MainNav } from "@/components/navbar/main-nav";
import { Button } from "@/components/ui/button";
import { ModeSwitcher } from "@/components/navbar/mood-switcher";
import { Heart } from "lucide-react";
import { CurrencySelector } from "./currency";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center px-4">
        <MainNav />
        <div className="flex flex-1 items-center justify-end gap-2 md:justify-end">
          <nav className="flex items-center gap-1 w-full justify-end">
            <CurrencySelector/>
            <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
              <Link href="/collections/wishlist" rel="noreferrer">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <ModeSwitcher />
            <Button variant="ghost" size="icon" className="h-8 w-20 px-1">
              <Link href="/login">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
