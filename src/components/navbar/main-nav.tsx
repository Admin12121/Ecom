"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlaceholdersAndVanishInput } from "./search";
import Image from "next/image";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="md:mr-4 flex w-full">
      <Link href="/" className="flex items-center space-x-2 mr-2 md:mr-3">
        <span className="w-14 h-14 lg:w-12 lg:h-12 p-1">
          <Image
            src="/logo.png"
            priority
            width={100}
            height={100}
            alt="Nepal Heritage Handicraft Logo"
          />
        </span>
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
