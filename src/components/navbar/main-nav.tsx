"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/navbar/icons";
import { PlaceholdersAndVanishInput } from "./search";
import Image from "next/image";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="md:mr-4 flex w-full">
      <Link href="/" className="flex items-center space-x-2 lg:mr-6">
        <span className="w-10 h-10 p-1">
          <Image
            src="/logo.png"
            className="dark:invert"
            priority
            width={100}
            height={100}
            alt="Nepal Heritage Handicraft Logo"
          />
        </span>
        {/* <p className="!m-0 hidden md:inline-block font-bold text-nowrap">
          {siteConfig.name}
        </p>
        <p className="!m-0 inline-block md:hidden font-bold text-nowrap">
          {siteConfig.shortName}
        </p> */}
      </Link>
      <div className="flex items-center gap-4 text-sm xl:gap-6 w-full">
        <Link
          href="/collections"
          className={cn(
            "hidden md:flex transition-colors hover:text-foreground/80",
            pathname === "/collections"
              ? "text-foreground"
              : "text-foreground/60"
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
