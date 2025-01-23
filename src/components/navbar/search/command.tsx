"use client";

import {
  ArrowDown as RiArrowDownLine,
  ArrowUp as RiArrowUpLine,
  Space as RiCornerDownLeftLine,
} from "lucide-react";

import * as React from "react";
import { useTrendingProductsViewQuery } from "@/lib/store/Service/api";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/tag";
import { CommandCard } from "./command-card";
import { useRouter } from "nextjs-toploader/app";

export default function Component() {
  const route = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useTrendingProductsViewQuery({ skip: !open });
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const handleRoute = ({ productslug }: { productslug: string }) => {
    setOpen(false);
    route.push(`/collections/${productslug}`);
  };
  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="h-[600px] max-w-[600px] w-[600px] rounded-2xl !ring-0 border-0 focus:outline-none focus:ring-0"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Searching For">
          <div className="flex flex-wrap gap-2 mb-2 px-3">
            <Tag>Pages</Tag>
            <Tag>Transactions</Tag>
            <Tag>Accounts</Tag>
            <Tag>Cards</Tag>
            <Tag>Recipients</Tag>
          </div>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recently viewed">
          <div className="flex gap-2">
            {data?.map((product: any, index: any) => (
              <CommandCard
                key={index}
                data={product}
                handleRoute={handleRoute}
              />
            ))}
          </div>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Smart Prompt Examples">
          <CommandItem>
            <Spark />
            <span className="ml-2 font-normal">Go to dashboard</span>
          </CommandItem>
          <CommandItem>
            <Spark />
            <span className="ml-2 font-normal">Go to apps</span>
          </CommandItem>
          <CommandItem>
            <Spark />
            <span className="ml-2 font-normal">Go to connections</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <span className="flex justify-between items-center">
            <div className="flex gap-3 font-normal text-sm">
              <div className="flex items-center gap-2">
                <CommandShortcut>
                  <RiArrowUpLine className="size-3" />
                </CommandShortcut>
                <CommandShortcut>
                  <RiArrowDownLine className="size-3" />
                </CommandShortcut>
                <span className="text-xs ">Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <CommandShortcut className="w-5">
                  <RiCornerDownLeftLine className="size-3" />
                </CommandShortcut>
                <span className="text-xs">Select</span>
              </div>
            </div>
            <div className="text-xs font-normal text-right">
              Not what you’re looking for? Try the{" "}
              <Button variant="link" className="text-xs px-0 font-normal">
                Help Center
              </Button>
            </div>
          </span>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

const Spark = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="remixicon size-5 shrink-0 text-neutral-500 dark:text-neutral-200"
    >
      <path d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM4.87601 12C6.18717 12.7276 7.27243 13.8128 8 15.124 8.72757 13.8128 9.81283 12.7276 11.124 12 9.81283 11.2724 8.72757 10.1872 8 8.87601 7.27243 10.1872 6.18717 11.2724 4.87601 12ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"></path>
    </svg>
  );
};
