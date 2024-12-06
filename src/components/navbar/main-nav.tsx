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
    <div className="md:mr-4 flex w-full">
      <Link href="/" className="flex mr-4 items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden md:inline-block font-bold ">
          {siteConfig.name}
        </span>
      </Link>
      <div className="flex items-center gap-4 text-sm xl:gap-6 w-full">
        <Link
          href="/collections"
          className={cn(
            "hidden md:flex transition-colors hover:text-foreground/80",
            pathname === "/collections" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Shop
        </Link>
        <div className="w-full md:flex flex-1 md:w-auto md:flex-none flex-row gap-5">
          <PlaceholdersAndVanishInput />
        </div>
      </div>
    </div>
  );
}
