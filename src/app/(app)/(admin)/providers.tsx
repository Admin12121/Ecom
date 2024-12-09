"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  CommandMenu,
} from "@/components/global/sidebar";
import { Links } from "./links";
import { cn } from "@/lib/utils";
import Header from "./_components/header";
import { siteConfig } from "@/config/site";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Sidebar>
      <SidebarContent container="!bg-transparent" links={Links}>
        <SidebarHeader logo="/logo.png" label={siteConfig.name} />
        {/* <CommandMenu /> */}
      </SidebarContent>
      <main className="h-svh p-2 w-full">
        <div
          className={cn(
            "relative flex h-full flex-1 flex-col bg-white dark:bg-[#18181b]",
            " md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
            "rounded-xl overflow-y-auto"
          )}
        >
          <Header/>
          {children}
        </div>
      </main>
    </Sidebar>
  );
};

export default Providers;
