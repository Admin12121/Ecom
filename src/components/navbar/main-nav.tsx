"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/navbar/icons";
import { PlaceholdersAndVanishInput } from "./search";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/collections"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/collections" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Shop
        </Link>
        <div className="w-full flex flex-1 md:w-auto md:flex-none flex-row gap-5">
          <PlaceholdersAndVanishInput />
        </div>
      </nav>
    </div>
  );
}
